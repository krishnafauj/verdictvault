import { create } from 'ipfs-http-client';

// Replace '793d6eba7eb04405b864a03b13d58a6f' with your actual Infura Project ID
const ipfs = create({
  url: 'https://ipfs.infura.io:5001/api/v0',
  headers: {
    Authorization: 'Basic ' + Buffer.from('793d6eba7eb04405b864a03b13d58a6f' + ':').toString('base64'),
  },
});

const getDocument = async (cid) => {
  try {
    // Fetch the content of the file from IPFS using the CID
    for await (const file of ipfs.cat(cid)) {
      // Output the content of the file (binary or text)
      console.log(file.toString());
    }
  } catch (error) {
    console.error('Error fetching the document:', error);
  }
};

// Replace with your CID (make sure to wrap it in quotes)
getDocument('QmPKh7drWWNL9UC6JMX7foQ3S843Doj1WdFNyzPJpVGz6N');
