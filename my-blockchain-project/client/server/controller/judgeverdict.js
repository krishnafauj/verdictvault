import connectDB from "../models/mongoconnect.js";

const judgeverdict = async (req, res) => {
  const data = req.body;
  const { blockchain, caseStatus, ...dataWithoutBlockchain } = req.body;  // This will exclude the blockchain fiel
  // Validate incoming data
  if (!data.blockchain || !data.verdict) {
    return res.status(400).json({ message: 'Invalid request. Blockchain and verdict are required.' });
  }

  let db;
  try {
    // Connect to the database
    db = await connectDB();
    if (!db) {
      return res.status(500).json({ message: 'Failed to connect to database.' });
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
    return res.status(500).json({ message: 'Internal server error while connecting to the database.' });
  }

  let user1;
  try {
    const caseCollection = db.collection('cases');
    // Find the case by blockchain number
    user1 = await caseCollection.findOne({ blockchainNo: data.blockchain });
    if (!user1) {
      return res.status(404).json({ message: 'Case not found with the provided blockchain.' });
    }
  } catch (error) {
    console.error('Error fetching case from database:', error);
    return res.status(500).json({ message: 'Internal server error while fetching the case.' });
  }

  try {
    const caseCollection = db.collection('cases');
    // Insert data into the specific user1 document
    const result = await caseCollection.updateOne(
      { blockchainNo: data.blockchain }, // Filter for the document
      {
        $push: { data: { $each: [dataWithoutBlockchain] } }, 
        $set: {
          caseStatus: caseStatus, // Set the caseStatus
        },
      } // Push data without blockchain
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({ message: 'Verdict added successfully.' });
    } else {
      return res.status(500).json({ message: 'Failed to add verdict.' });
    }
  } catch (error) {
    console.error('Error updating case in database:', error);
    return res.status(500).json({ message: 'Internal server error while updating the case.' });
  }
};

export default judgeverdict;
