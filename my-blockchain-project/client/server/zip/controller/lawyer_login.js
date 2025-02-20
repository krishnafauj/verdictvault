import connectDB from "../models/mongoconnect.js";

const lawyerlogin = async (req, res) => {
  const { email, password, blockchain } = req.body; // Use consistent variable name 'blockchain'
  const db = await connectDB();

  try {
    const lawyerCollection = db.collection('lawyer');
    const userCollection = db.collection('user');

    const user1 = await userCollection.findOne({ 'blockchainDetails.transactionHash': blockchain });
    if (!user1 || !user1.blockchainDetails) {
      return res.status(404).json({ message: 'Blockchain details not found for the given blockchain' });
    }

    const user = await lawyerCollection.findOne({ email });
    if (!user) {
      
      return res.status(401).json({ message: 'Lawyer user not found' });
    }

    // Validate password
    if (password !== user.password) {

      return res.status(401).json({ message: 'Invalid password for lawyer user' });
    }
    res.status(200).json({
      message: 'Lawyer user verified successfully', 
      email: user.email, 
      blockchainId: user1.blockchainDetails.transactionHash 
    });
  } catch (error) {
    console.error('Error verifying lawyer user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default lawyerlogin;
