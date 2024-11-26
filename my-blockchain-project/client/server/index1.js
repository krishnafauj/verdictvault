import express from 'express';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import Web3 from 'web3';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'; // Add fs to read files

// Setup Web3 connection
const web3 = new Web3('http://127.0.0.1:7545'); // Connect to your Ganache local blockchain

// Get the current file's directory URL
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Now, dynamically create the absolute path to your contract file
const contractPath = path.join(__dirname, 'build/contracts/Auth.json');

// Use fs to read the contract ABI from the file system
let contractABI;
try {
  const rawABI = fs.readFileSync(contractPath, 'utf-8'); // Read the ABI file
  contractABI = JSON.parse(rawABI); // Parse the JSON string
} catch (err) {
  console.error("Error reading the ABI file:", err);
  process.exit(1); // Exit the process if the contract ABI can't be loaded
}

const contractAddress = '0xYourContractAddressHere'; // Replace with your deployed contract address

// Create a contract instance
const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

// Express setup
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB setup
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
async function connectDB() {
  await client.connect();
  return client.db('panel');
}

// User Registration Endpoint with Blockchain Interaction
app.post('/register/user', async (req, res) => {
  const { email, password } = req.body;
  const db = await connectDB();

  try {
    const usersCollection = db.collection('user');
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving to MongoDB
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword };

    // Store user in MongoDB
    await usersCollection.insertOne(newUser);

    // Interact with smart contract to store user on the blockchain
    const accounts = await web3.eth.getAccounts();
    await contract.methods.registerUser(email, hashedPassword).send({
      from: accounts[0], // The first Ganache account
      gas: 3000000, // Adjust gas limit based on your contract
    });

    res.status(201).json({ message: 'User registered successfully on MongoDB and Blockchain' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Route to handle adding a case
app.post('/api/cases', async (req, res) => {
  const caseData = req.body;

  try {
    const newCase = new PoliceCase(caseData);
    await newCase.save();  // Save to the database
    res.status(201).json({ message: 'Case added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding case', error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});