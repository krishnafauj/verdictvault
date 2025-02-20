import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

// IPFS client setup using Pinata or Infura
const client = create('https://ipfs.infura.io:5001/api/v0'); // Replace with your API URL

function Fileipfs() {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      const added = await client.add(file);
      setIpfsHash(added.path);  // IPFS Hash of the uploaded file
      console.log('File uploaded to IPFS with hash:', added.path);
    } catch (err) {
      console.error('Error uploading file to IPFS:', err);
    }
  };

  return (
    <div className="file-upload">
      <h2>Upload File to IPFS</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {ipfsHash && (
        <div>
          <h3>File uploaded successfully!</h3>
          <p>IPFS Hash: {ipfsHash}</p>
          <a href={`https://ipfs.infura.io/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </div>
      )}
    </div>
  );
}

export default Fileipfs;