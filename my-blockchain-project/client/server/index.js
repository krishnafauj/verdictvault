import express from 'express';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import Web3 from 'web3';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'; // Add fs to read files
import mongoose from 'mongoose';
// MongoDB connection URI
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

// Setup Web3 connection
const web3 = new Web3('http://127.0.0.1:7545'); // Connect to your Ganache local blockchain

// Get the current file's directory URL
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Correct path to the Auth.json file
const contractPath = path.join(
  'C:/Users/krish/Desktop/blockchain/my-blockchain-project/build/contracts/Auth.json'
);

// Use fs to read the contract ABI from the file system
let contractABI;
try {
  const rawABI = fs.readFileSync(contractPath, 'utf-8'); // Read the ABI file
  contractABI = JSON.parse(rawABI); // Parse the JSON string
} catch (err) {
  console.error("Error reading the ABI file:", err);
  process.exit(1); // Exit the process if the contract ABI can't be loaded
}

const contractAddress = '0xf1b345310D6d60E7BdbC87f9fb39f8f368bd064A'; // Replace with your deployed contract address

// Create a contract instance
const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

// Express setup
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB connection
async function connectDB() {
  await client.connect();
  return client.db('panel');
}



// CID Submission Endpoint
app.post('/cid', async (req, res) => {
  const { email, cid } = req.body;
  
  // Input Validation
  if (!email || !cid) {
    return res.status(400).json({ message: 'Email and CID are required' });
  }

  try {
    // Connect to MongoDB
    const db = await connectDB();
    const usersCollection = db.collection('user'); // Assuming 'user' collection for storing user info
    const existingUser = await usersCollection.findOne({ email });

    // Check if the user already exists
    if (existingUser) {
      // If user exists, update the CID
      await usersCollection.updateOne({ email }, { $set: { cid } });
      return res.status(200).json({ message: 'CID updated successfully', user: existingUser });
    } else {
      // If user does not exist, create a new user with CID
      const newUser = { email, cid };

      // Store new user in MongoDB
      await usersCollection.insertOne(newUser);
      
      return res.status(201).json({ message: 'User created and CID stored successfully', user: newUser });
    }
  } catch (error) {
    console.error('Error processing CID request:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});





// POST request to verify judge user
// POST request to verify judge user
app.post('/verify/judge', async (req, res) => {
  const { email, password, id } = req.body;
  const db = await connectDB();

  try {
    const judgeCollection = db.collection('judge');
    const user = await judgeCollection.findOne({ email });
    const idCollection = db.collection('user');
    const user1 = await idCollection.findOne({ email: id });

    // Check if the judge or the id doesn't exist
    if (!user || !user1) {
      return res.status(404).json({ message: 'Judge user not found' });
    }

    // Correct way to check password
    const isPasswordCorrect = user.password === password; // If plain text password is used, use this. Otherwise, use bcrypt.compare()
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid password for judge user' });
    }

    res.status(200).json({ message: 'Judge user verified successfully' });
  } catch (error) {
    console.error('Error verifying judge user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// CID Submission Endpoint
app.post('/cid', async (req, res) => {
  const { email, cid } = req.body;
  
  // Input Validation
  if (!email || !cid) {
    return res.status(400).json({ message: 'Email and CID are required' });
  }

  try {
    // Connect to MongoDB
    const db = await connectDB();
    const usersCollection = db.collection('user'); // Assuming 'user' collection

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      // Ensure cid is an array in existing user data
      const updatedCIDs = Array.isArray(existingUser.cid) ? existingUser.cid : [existingUser.cid];

      // Add new CID to the array only if it doesn't already exist
      if (!updatedCIDs.includes(cid)) {
        updatedCIDs.push(cid);
        await usersCollection.updateOne(
          { email },
          { $set: { cid: updatedCIDs } }  // Update CID array
        );
        return res.status(200).json({ message: 'CID added successfully', user: { email, cid: updatedCIDs } });
      } else {
        return res.status(200).json({ message: 'CID already exists', user: { email, cid: updatedCIDs } });
      }
    } else {
      // Create a new user and initialize cid as an array
      const newUser = { email, cid: [cid] };  // CID stored as an array
      await usersCollection.insertOne(newUser);
      
      return res.status(201).json({ message: 'User created and CID stored successfully', user: newUser });
    }
  } catch (error) {
    console.error('Error processing CID request:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

const caseSchema = new mongoose.Schema({
  caseDetails: {
    caseName: String,
    caseDescription: String,
    caseDate: Date,
  },
  victim: {
    name: String,
    fatherName: String,
    aadharCardNo: String,
    mobileNo: String,
    address: String,
    pincode: String,
  },
  culprit: {
    name: String,
    fatherName: String,
    aadharCardNo: String,
    mobileNo: String,
    address: String,
    pincode: String,
  },
  policeStationInfo: {
    stationNumber: String,
    caseFilingPerson: String,
    caseNumber: String,
    filingDate: Date,
  },
  blockchainNo: {  // Field to store blockchainNo
    type: String,
    required: true,  // Ensure this field is always provided
  }
});

// Case Model
const Case = mongoose.model('Case', caseSchema);

// POST route to save a new case
app.post('/api/cases', async (req, res) => {
  console.log('Received POST request on /api/cases');

  const { caseDetails, victim, culprit, policeStationInfo, blockchainNo } = req.body;

  console.log('Request Data:', req.body);

  // Input validation: Check if all required fields are provided
  if (!caseDetails || !victim || !culprit || !policeStationInfo || !blockchainNo) {
    console.log('Validation Error: Missing required fields');
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Connect to the MongoDB database (assuming the connectDB function exists)
    const db = await connectDB();

    // Find the user that matches the blockchainNo (email)
    const user = await db.collection('user').findOne({ email: blockchainNo });

    if (!user) {
      console.log('User not found with blockchainNo (email):', blockchainNo);
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new case instance, including blockchainNo
    const newCase = new Case({
      caseDetails,
      victim,
      culprit,
      policeStationInfo,
      blockchainNo,  // Ensure blockchainNo is included
    });

    // Save the case to MongoDB
    const savedCase = await newCase.save();
    console.log('Case saved successfully:', savedCase);

    // Respond with the success message and the saved case data
    res.status(201).json({ message: 'Case added successfully', case: savedCase });
  } catch (error) {
    console.error('Error saving case:', error);

    // Handle MongoDB connection or insertion errors
    if (error instanceof mongoose.Error) {
      return res.status(500).json({ message: 'Database error occurred', error: error.message });
    }

    // Handle unexpected errors
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.get('/getdetails', async (req, res) => {
  try {
    const { email } = req.query;  // Retrieve the email from the query string
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const db = await connectDB();  // Connect to the database
    const usersCollection = db.collection('user');
    
    // Find the user by email in the collection
    const user = await usersCollection.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If user found, return the user details including the block information
    res.json({
      user: user,
      block: user.block || 'No block information available',  // Example of handling the block
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});  