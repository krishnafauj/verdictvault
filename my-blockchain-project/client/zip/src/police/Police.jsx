import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Police = () => {
  const location = useLocation();
  const { email, blockchainNo } = location.state || {};
  const [victim, setVictim] = useState({
    name: '',
    fatherName: '',
    aadharCardNo: '',
    mobileNo: '',
  });

  const [culprit, setCulprit] = useState({
    name: '',
    fatherName: '',
    aadharCardNo: '',
    mobileNo: '',
  });

  const [caseDetails, setCaseDetails] = useState({
    caseName: '',
  });

  const [policeStationInfo, setPoliceStationInfo] = useState({
    stationNumber: '',
    caseFilingPerson: email || '',
    caseNumber: '',
    filingDate: '',
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

  const handleSubmit = () => {
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
        // Show a success message
        console.log('Case registered successfully');
        alert("Case successfully registered!");
       
          window.location.href = 'http://localhost:5173/policelogin';
       // Wait for the page to reload before redirecting
      })
      .catch((error) => {
        console.error('Error registering case:', error)
      })
  };

  return (
    <div className="bg-gray-800 py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">POLICE Dashboard</h1>
        <p className="text-gray-60 font-bold text-white">ADD CASES, MORE SECURITY, MORE BELIEVE IN PEOPLE</p>
      </header>
      <h1 className="text-3xl font-bold text-white text-center mb-8">Case Filing Form</h1>

      <div className="mb-6 text-center text-white">
        <p><strong>CASE FILER ID:</strong> {blockchainNo}</p>
      </div>

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
      </div>

      <div className="flex flex-wrap gap-6">
        {['Victim', 'Culprit'].map((role, idx) => (
          <form
            key={idx}
            className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto ${role === 'Victim' ? 'text-blue-800' : 'text-red-800'}`}
          >
            <h2 className="text-2xl font-bold mb-4">{role} Details</h2>
            {['name', 'fatherName', 'aadharCardNo', 'mobileNo'].map((field, index) => (
              <div className="mb-4" key={index}>
                <label className="block font-semibold">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="text"
                  name={field}
                  value={role === 'Victim' ? victim[field] : culprit[field]}
                  onChange={(e) =>
                    role === 'Victim'
                      ? handleInputChange(e, victim, setVictim)
                      : handleInputChange(e, culprit, setCulprit)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </form>
        ))}
      </div>

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
          <div key={index} className="mb-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="sectionNumber"
                placeholder="Section Number"
                value={section.sectionNumber}
                onChange={(e) => handleIpcChange(index, e)}
                className="w-1/3 p-2 border rounded"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={section.description}
                onChange={(e) => handleIpcChange(index, e)}
                className="w-2/3 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeIpcSection(index)}
                className="bg-red-600 text-white font-bold py-1 px-3 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addIpcSection}
          className="bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add IPC Section
        </button>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4 w-full"
      >
        Register Case
      </button>
    </div>
  );
};

export default Police;
