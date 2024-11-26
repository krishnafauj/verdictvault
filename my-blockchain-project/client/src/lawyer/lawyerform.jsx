import React, { useState } from 'react';
import axios from 'axios';

function LawyerForm() {
  const [lawyer, setLawyer] = useState({
    email: '',  // Only store email now
    documents: [{ name: '', file: null }],
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
      console.log("Starting file upload..."); // Log when file upload starts
  
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log("Response from upload server:", response.data); // Log the response from the upload server
  
      // Check if response contains the CID, log it
      if (!response.data || !response.data.cid) {
        console.error("CID missing in response from upload server:", response.data);
        return;
      }
  
      const { cid } = response.data;  // Only CID is returned here
      console.log("CID received from upload server:", cid); // Log the CID received
  
      // Log the file name and index for debugging
      console.log("File name being processed:", file.name);
      console.log("File index:", index);
  
      handleDocumentChange(index, 'file', { fileName: file.name, cid });
  
      // Update uploaded data with CID and email
      console.log("Preparing to update uploaded data with email and CID...");
      console.log("Email from form data:", lawyer.email);
      console.log("CID to be stored:", cid);
  
      setUploadedData({
        email: lawyer.email,  // Store the email from the form
        cid: cid,             // Store the CID received from the server
      });
  
      setUploadStatus({
        success: true,
        message: 'Document successfully uploaded!',
      });
  
      console.log("Data ready to send to second server:", {
        email: lawyer.email,
        cid: cid,
      }); // Log the data to be sent to the second server
  
      // Send the CID and email to the server on port 5000
      console.log("Sending CID and email to second server...");
      const serverResponse = await axios.post('http://localhost:5000/cid', {
        email: lawyer.email,
        cid: cid,
      });
  
      console.log("Response from second server:", serverResponse.data); // Log the response from the second server
  
    } catch (error) {
      console.error('Error uploading file or submitting CID:', error);
  
      // Log more detailed error information for troubleshooting
      if (error.response) {
        console.error('Error response from server:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error with the request:', error.request);
      } else {
        console.error('Unexpected error:', error.message);
      }
  
      setUploadStatus({
        success: false,
        message: 'Error uploading file or submitting CID.',
      });
    }
  };
  

  const handleAddDocument = () => {
    setLawyer({
      ...lawyer,
      documents: [...lawyer.documents, { name: '', file: null }],
    });
  };

  const handleRemoveDocument = (index) => {
    const newDocuments = lawyer.documents.filter((_, docIndex) => docIndex !== index);
    setLawyer({ ...lawyer, documents: newDocuments });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Print the lawyer data on submit
    console.log("Lawyer Data:", lawyer);
  };

  return (
    <div className='bg-zinc-800 min-vh-100'>
      <div className="max-w-lg mx-auto p-4 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Lawyer Document Form</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={lawyer.email}
              onChange={(e) => setLawyer({ ...lawyer, email: e.target.value })}
              placeholder="Enter Email"
              className="w-full p-2 mt-1 border rounded-md bg-gray-100 text-gray-700"
              required
            />
          </div>

          {/* Documents Section */}
          <h3 className="text-xl font-semibold mb-2">Documents</h3>

          {lawyer.documents.map((document, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
              <label className="block text-sm font-medium text-gray-700">Document Name:</label>
              <input
                type="text"
                value={document.name}
                onChange={(e) => handleDocumentChange(index, 'name', e.target.value)}
                placeholder="Document Name"
                className="w-full p-2 mt-1 mb-2 border rounded-md"
                required
              />

              <label className="block text-sm font-medium text-gray-700">File (PDF only):</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
                className="w-full p-2 mt-1 mb-2 border rounded-md"
                required
              />
              {document.file && (
                <p className="text-sm text-green-500">File uploaded: {document.file.fileName}</p>
              )}

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
            type="button"
            onClick={handleAddDocument}
            className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Document
          </button>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit
          </button>
        </form>

        {/* Display CID and Email after successful upload */}
        {uploadStatus.success && uploadedData.cid && uploadedData.email && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
            <p>Upload Successful!</p>
            <p>Email: {uploadedData.email}</p>
            <p>CID: {uploadedData.cid}</p>
          </div>
        )}

        {/* Show error message if upload fails */}
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
