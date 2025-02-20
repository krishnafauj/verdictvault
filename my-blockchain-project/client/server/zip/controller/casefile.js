import connectDB from "../models/mongoconnect.js";
const casefile = async (req, res) => {
  try {
    const { caseDetails, victim, culprit, policeStationInfo, ipcSections, blockchainNo } = req.body;
  
    const caseData = {
      caseDetails,
      victim,
      culprit,
      policeStationInfo,
      ipcSections,
      blockchainNo,
      createdAt: new Date(), // Optional: Add a createdAt timestamp
    };

    // Connect to the database
    const db = await connectDB();

    // Insert the case data into the 'cases' collection
    const result = await db.collection('cases').insertOne(caseData);

    // Send success response
    res.status(200).json({
      message: "Case registered successfully",
      caseId: result.insertedId, // Optional: Return the inserted case ID
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Error processing request" });
  }
};

export default casefile;
