import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Police = () => {
  const location = useLocation();
  const { email, blockchainNo } = location.state || {};

  // Simplified state with only the required fields
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
    caseFilingPerson: email,
    caseNumber: '',
    filingDate: '',
  });

  const handleInputChange = (e, section, setSection) => {
    const { name, value } = e.target;
    setSection(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newCase = {
      caseDetails,
      victim,
      culprit,
      policeStationInfo,
      blockchainNo,  // Include blockchainNo in the request
    };

    // Send the case data to the server using Axios
    axios
      .post('http://localhost:5000/api/cases', newCase)
      .then((response) => {
        console.log('Case registered successfully:', response);

        // Reset the form after successful submission
        setVictim({
          name: '',
          fatherName: '',
          aadharCardNo: '',
          mobileNo: '',
        });
        setCulprit({
          name: '',
          fatherName: '',
          aadharCardNo: '',
          mobileNo: '',
        });
        setCaseDetails({
          caseName: '',
        });
        setPoliceStationInfo({
          stationNumber: '',
          caseFilingPerson: email,
          caseNumber: '',
          filingDate: '',
        });
      })
      .catch((error) => {
        console.error('Error registering case:', error);
      });
  };

  return (
    <div className="bg-gray-800 py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">POLICE Dashboard</h1>
        <p className="text-gray-60 font-bold text-white">ADD CASES, MORE SECURITY, MORE BELIEVE IN PEOPLE</p>
      </header>
      <h1 className="text-3xl font-bold text-white text-center mb-8">Case Filing Form</h1>
      
      {/* Display email and blockchainNo from location.state */}
      <div className="mb-6 text-center text-white">
        <p><strong>CASE FILER ID:</strong> {blockchainNo}</p>
      </div>

      {/* Police Station Info Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl mx-auto mb-6">
        <h2 className="text-2xl font-bold mb-4">Police Station Information</h2>
        <div className="mb-4">
          <label className="block font-semibold">Station Number</label>
          <input
            type="text"
            name="stationNumber"
            value={policeStationInfo.stationNumber}
            onChange={(e) => handleInputChange(e, policeStationInfo, setPoliceStationInfo)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Case Filing Person</label>
          <input
            type="text"
            name="caseFilingPerson"
            value={policeStationInfo.caseFilingPerson}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Case Number</label>
          <input
            type="text"
            name="caseNumber"
            value={policeStationInfo.caseNumber}
            onChange={(e) => handleInputChange(e, policeStationInfo, setPoliceStationInfo)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Filing Date</label>
          <input
            type="date"
            name="filingDate"
            value={policeStationInfo.filingDate}
            onChange={(e) => handleInputChange(e, policeStationInfo, setPoliceStationInfo)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Victim Details Section */}
      <div className="flex">
        <form className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Victim Details</h2>
          {['name', 'fatherName', 'aadharCardNo', 'mobileNo'].map((field, index) => (
            <div className="mb-4" key={index}>
              <label className="block font-semibold">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                name={field}
                value={victim[field]}
                onChange={(e) => handleInputChange(e, victim, setVictim)}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
        </form>

        {/* Culprit Details Section */}
        <form className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-red-800">Culprit Details</h2>
          {['name', 'fatherName', 'aadharCardNo', 'mobileNo'].map((field, index) => (
            <div className="mb-4" key={index}>
              <label className="block font-semibold">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                name={field}
                value={culprit[field]}
                onChange={(e) => handleInputChange(e, culprit, setCulprit)}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
        </form>
      </div>

      {/* Case Details Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Case Details</h2>
        <div className="mb-4">
          <label className="block font-semibold">Case Name</label>
          <input
            type="text"
            name="caseName"
            value={caseDetails.caseName}
            onChange={(e) => handleInputChange(e, caseDetails, setCaseDetails)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4 w-full"
        >
          Register Case
        </button>
      </div>
    </div>
  );
};

export default Police;
