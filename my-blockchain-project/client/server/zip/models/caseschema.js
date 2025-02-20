import mongoose from "mongoose";
const CaseSchema = new mongoose.Schema({
  caseDetails: {
    caseName: { type: String, required: true },
  },
  victim: {
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    aadharCardNo: { type: String, required: true },
    mobileNo: { type: String, required: true },
  },
  culprit: {
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    aadharCardNo: { type: String, required: true },
    mobileNo: { type: String, required: true },
  },
  policeStationInfo: {
    stationNumber: { type: String, required: true },
    caseFilingPerson: { type: String, required: true },
    caseNumber: { type: String, required: true },
    filingDate: { type: Date, required: true },
  },
  blockchainNo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Case = mongoose.model('Case', CaseSchema);
export default Case;