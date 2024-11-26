import mongoose from 'mongoose';

const policeCaseSchema = new mongoose.Schema({
  blockchainNo: { type: String, required: true },
  caseFilingPerson: { type: String, required: true },
  stationNumber: { type: String, required: true },
  caseNumber: { type: String, required: true },
  filingDate: { type: Date, required: true },
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
  caseDetails: {
    caseName: String,
    caseDescription: String,
  },
});

const PoliceCase = mongoose.model('PoliceCase', policeCaseSchema);
export default PoliceCase;  // Use default export
