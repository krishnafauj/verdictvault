import connectDB from "../models/mongoconnect.js";

export const verifyPoliceUser = async (req, res) => {
  const { email, password, blockchainNo } = req.body;
  const db = await connectDB();

  try {
    console.log('Received data:', { email, blockchainNo, password });
    const policeCollection = db.collection('police');
    const userCollection = db.collection('user');
    const user = await policeCollection.findOne({ email });

    if (!user) {

      return res.status(404).json({ message: `Police user not found with email: ${email}` });
    }

    if (password !== user.password) {
  
      return res.status(401).json({ message: 'Invalid password for police user' });
    }
    const user1 = await userCollection.findOne({ 'blockchainDetails.transactionHash': blockchainNo });
  

    if (!user1) {
   
      return res.status(404).json({ message: 'Blockchain details not found for the given blockchainNo' });
    }

    res.status(200).json({
      message: 'Police user verified successfully',
      email: user.email,           
      blockchainNo: user1.blockchainDetails.transactionHash  // Sending blockchainNo from blockchainDetails
    });

  } catch (error) {
    console.error('Error verifying police user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
