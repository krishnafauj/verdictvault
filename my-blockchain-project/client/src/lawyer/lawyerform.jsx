import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
function LawyerForm() {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { email, blockchain } = location.state || {};

  const [lawyer, setLawyer] = useState({
    email: email || '',
    documents: [{ name: '', cidNumber: '', lawyer_email: email }],
  });

  const [uploadedData, setUploadedData] = useState({
    email: '',
    cid: '',
  });

  const [uploadStatus, setUploadStatus] = useState({
    success: false,
    message: '',
  });

  const handleDocumentChange = (index, field, value) => {
    const newDocuments = lawyer.documents.map((doc, docIndex) =>
      docIndex === index ? { ...doc, [field]: value } : doc
    );
    setLawyer({ ...lawyer, documents: newDocuments });
  };

  const handleFileChange = async (index, file) => {
    if (file && file.type !== 'application/pdf') {
      alert('Only PDF files are allowed.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log("Starting file upload...");

      const response = await axios.post('http://localhost:3002/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Response from upload server:", response.data);

      if (!response.data || !response.data.cid) {
        console.error("CID missing in response from upload server:", response.data);
        return;
      }

      const { cid } = response.data;
      console.log("CID received from upload server:", cid);

      handleDocumentChange(index, 'cidNumber', cid);

      setUploadedData({
        email: lawyer.email,
        cid: cid,
      });

      setUploadStatus({
        success: true,
        message: 'Document successfully uploaded!',
      });

      alert(`Document uploaded successfully! CID: ${cid}`);
      
    } catch (error) {
      console.error('Error uploading file or submitting CID:', error);

      setUploadStatus({
        success: false,
        message: 'Error uploading file.',
      });
    }
  };

  const handleAddDocument = () => {
    setLawyer({
      ...lawyer,
      documents: [...lawyer.documents, { name: '', cidNumber: '', lawyer_email: email }],
    });
  };

  const handleRemoveDocument = (index) => {
    const newDocuments = lawyer.documents.filter((_, docIndex) => docIndex !== index);
    setLawyer({ ...lawyer, documents: newDocuments });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", {
      email: email,
      blockchain,
      documents: lawyer.documents,
    });

    try {
      const response = await axios.post('http://localhost:5000/cid', {
        blockchain,
        documents: lawyer.documents,
      });

    } 
    catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className='bg-zinc-800 min-vh-100'>
     
      <div className="max-w-lg mx-auto p-4 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4"> Document IPFS Form</h2>

        <form onSubmit={handleSubmit}>
         
          <h3 className="text-xl font-semibold mb-2">Documents</h3>
          {lawyer.documents.map((document, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
              <label className="block text-sm font-medium text-gray-700">File (PDF only):</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
                className="w-full p-2 mt-1 mb-2 border rounded-md"
                required
              />

              <label className="block text-sm font-medium text-gray-700">Document Name:</label>
              <input
                type="text"
                value={document.name}
                onChange={(e) => handleDocumentChange(index, 'name', e.target.value)}
                placeholder="Document Name"
                className="w-full p-2 mt-1 mb-2 border rounded-md"
                required
              />

              <label className="block text-sm font-medium text-gray-700">CID Number:</label>
              <input
                type="text"
                value={document.cidNumber}
                onChange={(e) => handleDocumentChange(index, 'cidNumber', e.target.value)}
                placeholder="CID Number"
                className="w-full p-2 mt-1 mb-2 border rounded-md"
                required
              />

              <button
                type="button"
                onClick={() => handleRemoveDocument(index)}
                className="text-red-500 hover:text-red-700 mt-2"
              >
                Remove Document
              </button>
            </div>
          ))}

          

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit
          </button>
        </form>

        {uploadStatus.success && uploadedData.cid && uploadedData.email && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
            <p>Upload Successful!</p>
            <p>Email: {uploadedData.email}</p>
            <p>CID: {uploadedData.cid}</p>
          </div>
        )}

        {!uploadStatus.success && uploadStatus.message && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            <p>{uploadStatus.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LawyerForm;
