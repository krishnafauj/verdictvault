import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Judge() {
    const location = useLocation();
    const data = location.state || {}; // Retrieve data passed via state
    console.log(data);
    const blockchain = data.caseData?.blockchainNo;

    const [verdicts, setVerdicts] = useState([]);
    const [newVerdict, setNewVerdict] = useState({
        verdict: '',
        date: new Date().toISOString().split('T')[0], 
        nextHearing: '',
        caseStatus: 'Pending', // Default case status is 'Pending'
        blockchain: blockchain,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVerdict({ ...newVerdict, [name]: value });
    };

    const handleCaseStatusChange = (status) => {
        setNewVerdict({ ...newVerdict, caseStatus: status });
    };

    const addVerdict = async () => {
        try {
            // Add new verdict to the list
            setVerdicts([...verdicts, newVerdict]);

            // Send the new verdict to the server
            await axios.post('http://localhost:5000/verdict', newVerdict);

            // Reset form fields
            setNewVerdict({
                verdict: '',
                date: '',
                nextHearing: '',
                caseStatus: 'Pending',
                blockchain: blockchain,
            });

            alert('Verdict sent successfully!');
        } catch (error) {
            console.error('Error sending verdict:', error);
            alert('Failed to send verdict. Please try again.');
        }
    };

    return (
        <div className="min-h-screen p-8 bg-gray-800 text-white">
            {/* Header */}
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold">Jurisdiction Dashboard</h1>
                <p className="text-gray-400">Manage case details, involved persons, and legal documents</p>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Victim Info */}
                <div className="p-6 bg-white text-gray-900 rounded-lg shadow-md">
                    <h2 className="mb-4 text-xl font-bold">Dalit Person Information</h2>
                    <p><strong>Name:</strong> {data.caseData?.victim?.name || 'N/A'}</p>
                    <p><strong>Father's Name:</strong> {data.caseData?.victim?.fatherName || 'N/A'}</p>
                    <p><strong>Aadhar Card No:</strong> {data.caseData?.victim?.aadharCardNo || 'N/A'}</p>
                    <p><strong>Mobile No:</strong> {data.caseData?.victim?.mobileNo || 'N/A'}</p>
                    <p><strong>Blockchain No:</strong> {data.caseData?.blockchainNo || 'N/A'}</p>
                </div>

                {/* Culprit Info */}
                <div className="p-6 bg-white text-gray-900 rounded-lg shadow-md">
                    <h2 className="mb-4 text-xl font-bold">Culprit Information</h2>
                    <p><strong>Name:</strong> {data.caseData?.culprit?.name || 'N/A'}</p>
                    <p><strong>Father's Name:</strong> {data.caseData?.culprit?.fatherName || 'N/A'}</p>
                    <p><strong>Aadhar Card No:</strong> {data.caseData?.culprit?.aadharCardNo || 'N/A'}</p>
                    <p><strong>Mobile No:</strong> {data.caseData?.culprit?.mobileNo || 'N/A'}</p>
                </div>

                {/* Case Info */}
                <div className="p-6 bg-white text-gray-900 rounded-lg shadow-md">
                    <h2 className="mb-4 text-xl font-bold">Case Information</h2>
                    <p><strong>Station Number:</strong> {data.caseData?.policeStationInfo?.stationNumber || 'N/A'}</p>
                    <p><strong>Case Number:</strong> {data.caseData?.policeStationInfo?.caseNumber || 'N/A'}</p>
                    <p><strong>Filing Date:</strong> {data.caseData?.policeStationInfo?.filingDate || 'N/A'}</p>
                    <p><strong>Filed By:</strong> {data.caseData?.policeStationInfo?.caseFilingPerson || 'N/A'}</p>
                </div>
            </div>
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-bold text-gray-700">IPC SECTIONS</h2>
                <ul className="space-y-2">
                    {(data.caseData?.ipcSections || []).map((doc, index) => (
                        <li key={index} className="p-2 text-blue-500 underline cursor-pointer hover:text-blue-700">
                            <p><strong>Section No:</strong> {doc.sectionNumber}</p>
                            <p><strong>Desccription </strong> {doc.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Documents Section */}
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-bold text-gray-700">Documents</h2>
                <ul className="space-y-2">
                    {(data.caseData?.documents || []).map((doc, index) => (
                        <li key={index} className="p-2 text-blue-500 underline cursor-pointer hover:text-blue-700">
                            <p><strong>Name:</strong> {doc.name}</p>
                            <p>
                                <strong>CID Number:</strong>
                                <a href={`https://ipfs.io/ipfs/${doc.cidNumber}`} target="_blank" rel="noopener noreferrer">
                                    {doc.cidNumber}
                                </a>
                            </p>

                            <p><strong>Lawyer Email:</strong> {doc.lawyer_email}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-8 p-6 bg-gray-900 text-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-bold">All Verdicts</h2>
                {(data.caseData?.data || []).map((doc, index) => (

                    <li key={index} className="p-2 text-white underline ">
                        <p><strong>Name:</strong> {doc.verdict}</p>
                        <p><strong>dATE:</strong> {doc.date}</p>
                        <p><strong>Next Hearing Date:</strong> {doc.nextHearing}</p>

                    </li>
                ))}
            </div>

            {/* Case Status */}
            

            {data.caseData?.caseStatus !== 'Case Closed' ? (
    <div>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-bold text-gray-700">Case Status</h2>
            <div className="flex items-center space-x-4">
                <button
                    className={`px-4 py-2 rounded-md ${newVerdict.caseStatus === 'Pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => handleCaseStatusChange('Pending')}
                >
                    Pending
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${newVerdict.caseStatus === 'Case Closed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => handleCaseStatusChange('Case Closed')}
                >
                    Case Closed
                </button>
            </div>
        </div>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-bold text-gray-700">Add Verdict</h2>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="verdict">
                Verdict
            </label>
            <input
                type="text"
                name="verdict"
                value={newVerdict.verdict}
                onChange={handleInputChange}
                placeholder="Verdict"
                className="w-full text-black p-2 mb-2 border border-gray-300 rounded-md"
            />
            <label className="block text-gray-700 font-bold mb-2" htmlFor="nextHearing">
                Next Hearing Date
            </label>
            <input
                type="date"
                name="nextHearing"
                value={newVerdict.nextHearing}
                onChange={handleInputChange}
                className="w-full p-2 mb-2 text-black border border-gray-300 rounded-md"
            />
            <button
                onClick={addVerdict}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
                Add Verdict
            </button>
        </div>
    </div>
) : (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-gray-700">Case Closed</h2>
        <p className="mt-4 text-lg text-gray-700">This case has been closed. No further actions can be taken.</p>
    </div>
)}


        </div>
    );
}

export default Judge;
