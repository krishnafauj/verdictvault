import connectDB from "../models/mongoconnect.js";

const lawyerdoc = async (req, res) => {
  const { blockchain, documents } = req.body;
  if (!blockchain || !documents) {
    return res
      .status(400)
      .json({ message: 'Blockchain and Documents are required.' });
  }

  try {
    const db = await connectDB();
    if (!db) {
      return res.status(500).json({ message: 'Failed to connect to database.' });
    }
    const casesCollection = db.collection('cases');

    // Check if a case with the provided blockchain exists
    const caseDocument = await casesCollection.findOne({ blockchainNo: blockchain });
    if (!caseDocument) {
      return res.status(404).json({ message: 'Case not found with the provided blockchain.' });
    } 

    const updatedCase = await casesCollection.updateOne(
      { blockchainNo: blockchain }, 
      { $push: { documents: { $each: documents } } } // Push documents into the "documents" array
    );
    

    if (updatedCase.matchedCount === 0) {
      return res.status(404).json({ message: 'Failed to update the documents.' });
    }

    return res.status(200).json({
      message: 'Lawyer documents updated successfully.',
      updatedCase,
    });

  } catch (error) {
    console.error('Error processing CID request:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export default lawyerdoc;
