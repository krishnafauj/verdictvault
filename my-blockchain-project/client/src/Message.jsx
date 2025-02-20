import React, { useEffect } from "react";
import emailjs from "@emailjs/browser";

const EmailSender = ({ caseDetails, victim, culprit, policeStationInfo, ipcSections, blockchainNo }) => {
  useEffect(() => {
    sendEmail();
  }, []);

  const sendEmail = () => {
    const templateParams = {
      case_name: caseDetails.caseName,
      victim_name: victim.name,
      victim_father: victim.fatherName,
      victim_aadhar: victim.aadharCardNo,
      victim_mobile: victim.mobileNo,
      culprit_name: culprit.name,
      culprit_father: culprit.fatherName,
      culprit_aadhar: culprit.aadharCardNo,
      culprit_mobile: culprit.mobileNo,
      station_number: policeStationInfo.stationNumber,
      case_filer: policeStationInfo.caseFilingPerson,
      case_number: policeStationInfo.caseNumber,
      filing_date: policeStationInfo.filingDate,
      ipc_sections: ipcSections.map(sec => `Section ${sec.sectionNumber}: ${sec.description}`).join("\n"),
      blockchain_no: blockchainNo,
    };

    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams, "YOUR_USER_ID")
      .then((response) => {
        console.log("Email successfully sent!", response.status, response.text);
      })
      .catch((err) => {
        console.error("Email sending failed:", err);
      });
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-xl font-bold text-green-600">Email Sent Successfully!</h2>
    </div>
  );
};

export default EmailSender;