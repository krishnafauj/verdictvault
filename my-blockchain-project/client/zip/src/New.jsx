import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IPFSUpload() {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:3001/upload', formData);
      if (response.status === 200) {
        setCid(response.data.cid);
        fetchFiles();  // Refresh the file list after upload
      } else {
        alert(`Error: ${response.data.error || 'File upload failed.'}`);
      }
    } catch (error) {
      console.error('Upload Error:', error);
      alert('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };
  // Fetch list of uploaded files
  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/files');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  // Fetch files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <h1>Upload a File to IPFS</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {cid && (
        <div>
          <h2>Uploaded File CID</h2>
          <p><strong>CID:</strong> {cid}</p>
          <a href={`https://ipfs.io/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">
            View on IPFS
          </a>
        </div>
      )}

      <h2>All Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <strong>{file.fileName}</strong>: 
            <a href={`http://127.0.0.1:8080/ipfs/${file.cid}`} target="_blank" rel="noopener noreferrer">
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IPFSUpload;
