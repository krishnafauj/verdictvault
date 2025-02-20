import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
const Police = () => {
  const location = useLocation();
  const { email, blockchainNo } = location.state || {};
  const getIndianDate = () => {
    const istOffset = 5.5 * 60 * 60 * 1000; // IST Offset in milliseconds
    const indianDate = new Date(Date.now() + istOffset)
      .toISOString()
      .split("T")[0]; // Format: YYYY-MM-DD
    return indianDate;
  };
  const [victim, setVictim] = useState({
    name: '',
    fatherName: '',
    aadharCardNo: '',
    mobileNo: '',
    email: ''
  });

  const [culprit, setCulprit] = useState({
    name: '',
    fatherName: '',
    aadharCardNo: '',
    mobileNo: '',
    email: '',
  });

  const [caseDetails, setCaseDetails] = useState({
    caseName: '',
  });

  const [policeStationInfo, setPoliceStationInfo] = useState({
    stationNumber: '',
    caseFilingPerson: email || '',
    caseNumber: '',
    filingDate: getIndianDate(),
  });

  const [ipcSections, setIpcSections] = useState([
    { sectionNumber: '', description: '' },
  ]);

  const handleInputChange = (e, section, setSection) => {
    const { name, value } = e.target;
    setSection(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleIpcChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIpcSections = [...ipcSections];
    updatedIpcSections[index][name] = value;
    setIpcSections(updatedIpcSections);
  };

  const addIpcSection = () => {
    setIpcSections([...ipcSections, { sectionNumber: '', description: '' }]);
  };

  const removeIpcSection = (index) => {
    const updatedIpcSections = ipcSections.filter((_, i) => i !== index);
    setIpcSections(updatedIpcSections);
  };

  const validateFields = () => {
    const nameRegex = /^[A-Za-z\s]+$/; // Only alphabets and spaces
    const aadharRegex = /^\d{12}$/; // Exactly 12 digits
    const mobileRegex = /^\d{10}$/; // Exactly 10 digits

    if (!nameRegex.test(victim.name)) {
      alert("Victim's name must contain only alphabets.");
      return false;
    }
    if (!nameRegex.test(victim.fatherName)) {
      alert("Victim's father's name must contain only alphabets.");
      return false;
    }
    if (!aadharRegex.test(victim.aadharCardNo)) {
      alert("Victim's Aadhar card number must contain exactly 12 digits.");
      return false;
    }
    if (!mobileRegex.test(victim.mobileNo)) {
      alert("Victim's mobile number must contain exactly 10 digits.");
      return false;
    }

    if (!nameRegex.test(culprit.name)) {
      alert("Culprit's name must contain only alphabets.");
      return false;
    }
    if (!nameRegex.test(culprit.fatherName)) {
      alert("Culprit's father's name must contain only alphabets.");
      return false;
    }
    if (!aadharRegex.test(culprit.aadharCardNo)) {
      alert("Culprit's Aadhar card number must contain exactly 12 digits.");
      return false;
    }
    if (!mobileRegex.test(culprit.mobileNo)) {
      alert("Culprit's mobile number must contain exactly 10 digits.");
      return false;
    }

    if (!caseDetails.caseName) {
      alert("Case name cannot be empty.");
      return false;
    }

    if (!policeStationInfo.stationNumber || !policeStationInfo.caseNumber || !policeStationInfo.filingDate) {
      alert("All police station fields must be filled.");
      return false;
    }

    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!validateFields()) {
      return; // Stop submission if validation fails
    }

    const newCase = {
      caseDetails,
      victim,
      culprit,
      policeStationInfo,
      ipcSections,
      blockchainNo,
    };

    console.log('New Case:', newCase);

    axios
      .post('http://localhost:5000/api/cases', newCase)
      .then(() => {
        alert("Case successfully registered!");

        // Define email template parameters
        const templateParams = {
          case_name: caseDetails.caseName || "N/A",
          victim_info: `Name: ${victim.name || "N/A"}\nFather: ${victim.fatherName || "N/A"}\nAadhar: ${victim.aadharCardNo || "N/A"}\nMobile: ${victim.mobileNo || "N/A"}`,
          culprit_info: `Name: ${culprit.name || "N/A"}\nFather: ${culprit.fatherName || "N/A"}\nAadhar: ${culprit.aadharCardNo || "N/A"}\nMobile: ${culprit.mobileNo || "N/A"}`,
          station_info: `Station No: ${policeStationInfo.stationNumber || "N/A"}\nCase Filer: ${policeStationInfo.caseFilingPerson || "N/A"}\nCase No: ${policeStationInfo.caseNumber || "N/A"}\nFiling Date: ${policeStationInfo.filingDate || "N/A"}`,
          ipc_sections: ipcSections.length
            ? ipcSections.map((sec) => `Section ${sec.sectionNumber}: ${sec.description}`).join("\n")
            : "N/A",
          blockchain_no: blockchainNo || "N/A",
        };

        // Get victim and culprit emails
        const recipientEmail = `${victim.email || ""},${culprit.email || ""}`.trim();
        const sendEmail = (recipientEmail) => {
          return emailjs.send(

            "service_rsfetjw", // Replace with actual EmailJS Service ID
            "template_uw9ss8i", // Replace with actual EmailJS Template ID
            {
              to_email: recipientEmail,  // Send email to a single recipient
              case_name: caseDetails.caseName || "N/A",
              victim_info: `Name: ${victim.name || "N/A"}\nFather: ${victim.fatherName || "N/A"}\nAadhar: ${victim.aadharCardNo || "N/A"}\nMobile: ${victim.mobileNo || "N/A"}`,
              culprit_info: `Name: ${culprit.name || "N/A"}\nFather: ${culprit.fatherName || "N/A"}\nAadhar: ${culprit.aadharCardNo || "N/A"}\nMobile: ${culprit.mobileNo || "N/A"}`,
              station_info: `Station No: ${policeStationInfo.stationNumber || "N/A"}\nCase Filer: ${policeStationInfo.caseFilingPerson || "N/A"}\nCase No: ${policeStationInfo.caseNumber || "N/A"}\nFiling Date: ${policeStationInfo.filingDate || "N/A"}`,
              ipc_sections: ipcSections.length
                ? ipcSections.map((sec) => `Section ${sec.sectionNumber}: ${sec.description}`).join("\n")
                : "N/A",
              blockchain_no: blockchainNo || "N/A",
            },
            "P_9-wGeALQcRyuBRX" // Replace with actual EmailJS Public Key
          );
        };

        return Promise.all([sendEmail(recipientEmail)]);
      })
      .then(() => {
        console.log("✅ Emails successfully sent to both victim & culprit!");
        window.location.href = "http://localhost:5173/policelogin"; // Redirect only once
      })
      .catch((error) => {
        console.error("❌ Error:", error.response ? error.response.data : error.message);
      });
  };


  return (
    <div className="bg-gray-800 py-8 px-4">
      <div>
        <Link to="/policelogin">
          <img className='w-10 h10'
            src="https://cdn-icons-png.flaticon.com/256/189/189252.png"
            alt="Go to Police Login"
            title="Go back to Police login page"
          />
        </Link>

      </div>
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">POLICE Dashboard</h1>
        <p className="text-gray-60 font-bold text-white">ADD CASES, MORE SECURITY, MORE BELIEVE IN PEOPLE</p>
      </header>
      <h1 className="text-3xl font-bold text-white text-center mb-8">Case Filing Form</h1>

      <div className="mb-6 text-center text-white">
        <p><strong>CASE FILER ID:</strong> {blockchainNo}</p>
      </div>

      <div className="flex flex-wrap  ">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl mx-auto mb-6">
          <h2 className="text-2xl font-bold mb-4">Police Station Information</h2>
          {['stationNumber', 'caseNumber', 'filingDate'].map((field, index) => (
            <div className="mb-4" key={index}>
              <label className="block font-semibold">
                {field.replace(/([A-Z])/g, ' $1').replace('Number', ' Number')}
              </label>
              <input
                type={field === 'filingDate' ? 'date' : 'text'}
                name={field}
                value={policeStationInfo[field]}
                onChange={(e) => handleInputChange(e, policeStationInfo, setPoliceStationInfo)}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Case Details</h2>
            <div className="mb-4">
              <label className="block font-semibold">Case Details</label>
              <input
                type="text"
                name="caseName"
                value={caseDetails.caseName}
                onChange={(e) => handleInputChange(e, caseDetails, setCaseDetails)}
                className="w-full p-2 border rounded"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">IPC Sections</h2>
            {ipcSections.map((section, index) => (
              <div key={index} className="mb-4 flex gap-4">
                <input type="text" name="sectionNumber" placeholder="Section Number" value={section.sectionNumber} onChange={(e) => handleIpcChange(index, e)} className="w-1/3 p-2 border rounded" />
                <input type="text" name="description" placeholder="Description" value={section.description} onChange={(e) => handleIpcChange(index, e)} className="w-2/3 p-2 border rounded" />
                <button type="button" onClick={() => removeIpcSection(index)} className="bg-red-600 text-white font-bold py-1 px-3 rounded">Remove</button>
              </div>
            ))}
            <button type="button" onClick={addIpcSection} className="bg-green-600 text-white font-bold py- 2 px-4 rounded mt-4">Add IPC Section</button>
          </div>

        </div>
      </div>

      <div className="flex flex-wrap  ">
        {['Victim', 'Culprit'].map((role, idx) => (
          <form key={idx} className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto ${role === 'Victim' ? 'text-blue-800' : 'text-red-800'}`}>
            <h2 className="text-2xl font-bold mb-4">{role} Details</h2>
            {['name', 'fatherName', 'aadharCardNo', 'mobileNo', 'email'].map((field, index) => (
              <div className="mb-4" key={index}>
                <label className="block font-semibold">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="text"
                  name={field}
                  value={role === 'Victim' ? victim[field] : culprit[field]}
                  onChange={(e) => role === 'Victim' ? handleInputChange(e, victim, setVictim) : handleInputChange(e, culprit, setCulprit)}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </form>
        ))}
      </div>


      <button type="button" onClick={handleSubmit} className="bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4 w-full">Register Case</button>
    </div>
  );
};

export default Police;