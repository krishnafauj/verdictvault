import express from 'express';
import multer from 'multer';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Express Setup
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Set up Multer for file upload handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Pinata API credentials from environment variables
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;
const JWT = process.env.JWT;  // For JWT, you can use it if needed

// Route to upload a file and return CID from Pinata
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const file = req.file.buffer;

    // Convert the buffer to a Blob (for browser compatibility)
    const blob = new Blob([file], { type: 'application/octet-stream' });

    // Use Pinata API to upload file
    const formData = new FormData();
    formData.append('file', blob, 'file');

    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      }
    });

    const cid = response.data.IpfsHash;

    // Return CID in the response
    res.json({ cid });
  } catch (error) {
    console.error('Error uploading file to Pinata:', error);
    res.status(500).send('Error uploading file to IPFS');
  }
});

// Route to retrieve a file from IPFS by CID (using Pinata gateway)
app.get('/retrieve/:cid', (req, res) => {
  const { cid } = req.params;
  const fileUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;

  axios.get(fileUrl)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.error('Error retrieving file from Pinata:', error);
      res.status(500).send('Error retrieving file');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
