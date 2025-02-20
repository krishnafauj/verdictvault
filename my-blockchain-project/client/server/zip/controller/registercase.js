import connectDB from "../models/mongoconnect.js";
import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
const contractAddress = '0xf1b345310D6d60E7BdbC87f9fb39f8f368bd064A'; // Replace with your deployed contract address
const web3 = new Web3('http://127.0.0.1:7545'); // Connect to your Ganache local blockchain
const contractPath = path.join(
    'C:/Users/krish/Desktop/blockchain/my-blockchain-project/build/contracts/Auth.json'
  );
  let contractABI;
  try {
    const rawABI = fs.readFileSync(contractPath, 'utf-8'); // Read the ABI file
    contractABI = JSON.parse(rawABI); // Parse the JSON string
  } catch (err) {
    console.error("Error reading the ABI file:", err);
    process.exit(1); // Exit the process if the contract ABI can't be loaded
  }
const contract = new web3.eth.Contract(contractABI.abi, contractAddress);


const register_case= async (req, res) => {
    const { email, password } = req.body;
    const db = await connectDB();
  
    try {
      const usersCollection = db.collection('user');
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Store user in MongoDB (without password hashing)
      const newUser = { email, password };
  
      // Store user in MongoDB
      await usersCollection.insertOne(newUser);
  
      // Blockchain interaction
      const accounts = await web3.eth.getAccounts();
      const transaction = await contract.methods.registerUser(email, password).send({
        from: accounts[0], // The first Ganache account
        gas: 60000, // Adjust gas limit based on your contract
      });
  
      // Serialize the blockchain details (e.g., convert BigInt to string)
      const blockchainDetails = {
        transactionHash: transaction.transactionHash,
        blockNumber: transaction.blockNumber.toString(), // Convert BigInt to string
      };
  
      // Update the user in MongoDB with the blockchain details
      await usersCollection.updateOne(
        { email },
        { $set: { blockchainDetails } }
      );
  
      res.status(201).json({
        message: 'User registered successfully on MongoDB and Blockchain',
        transactionHash: blockchainDetails.transactionHash, // Only the transactionHash is returned
      });
      
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({  });
    }
  };
export default register_case;