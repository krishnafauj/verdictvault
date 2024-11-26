import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { create } from 'ipfs-http-client';
import cors from 'cors';
import bodyParser from 'body-parser';

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/ipfsfiles", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Create a Schema for File
const fileSchema = new mongoose.Schema({
  fileName: String,
  cid: String,
  uploadedAt: { type: Date, default: Date.now }
});
const File = mongoose.model('File', fileSchema);

// Initialize IPFS Client
const ipfs = create({ url: 'http://127.0.0.1:5001/api/v0' });

// Express Setup
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Set up Multer for file upload handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload a file and save CID to MongoDB
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const file = req.file.buffer;
    const addedFile = await ipfs.add(file);
    const cid = addedFile.path;
    const fileName = req.file.originalname;

    // Save file details to MongoDB
    const fileDoc = new File({ fileName, cid });
    await fileDoc.save();

    res.json({ cid });
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    res.status(500).send('Error uploading file to IPFS');
  }
});

// Route to fetch all files from MongoDB
app.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).send('Error retrieving files');
  }
});

// Route to retrieve a file from IPFS by CID
app.get('/retrieve/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const stream = ipfs.cat(cid);
    let content = Buffer.alloc(0);

    for await (const chunk of stream) {
      content = Buffer.concat([content, chunk]);
    }
    res.send(content); // Return file content
  } catch (error) {
    console.error('Error retrieving file from IPFS:', error);
    res.status(500).send('Error retrieving file');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
