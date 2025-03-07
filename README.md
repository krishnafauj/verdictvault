Verdict Vault

Verdict Vault is a blockchain-based system designed to streamline the entire legal filing process, from police case filing to advocate file submissions, 
which are then securely stored in IPFS before being reviewed by the jurisdiction panel. It leverages Ganache for local blockchain deployment, Truffle for smart contract management, 
IPFS for decentralized file storage, and MongoDB for storing additional metadata.

🚀 Features

End-to-End Legal Case Management: Covers police filing, advocate file submissions, and jurisdiction panel review.

Blockchain-based Storage: Uses a local Ganache blockchain for storing immutable case details.

Smart Contracts: Developed with Truffle to handle case transactions and ensure transparency.

Decentralized File Storage: Uses IPFS to securely store case-related documents.

Database Support: Stores additional metadata and non-critical information in MongoDB.

🛠️ Tech Stack

Blockchain: Ganache, Solidity, Truffle

Storage: IPFS, MongoDB

Backend: Node.js, Express

Frontend: React

📦 Installation

Prerequisites

Ensure you have the following installed:

Node.js & npm

Ganache

Truffle

MongoDB

IPFS daemon
![image](https://github.com/user-attachments/assets/3910daa3-24fd-4055-920a-c159d610a11e)
![image](https://github.com/user-attachments/assets/f96f3d4e-8b14-4908-a337-73acbfef42e6)

Steps

Clone the repository:

git clone https://github.com/krishnafauj/verdictvault.git
cd my-blockchain-project

Install dependencies:

npm install

Start Ganache and deploy smart contracts:

truffle migrate --reset

Start IPFS daemon:

ipfs daemon

Run the backend server:

node index1.js

Run the frontend:

npm start

📜 Smart Contracts

Located in the contracts/ directory

Can be tested using:

truffle test

📂 IPFS Storage

Documents are stored in IPFS with a unique CID.

The CID is linked to case details stored on the blockchain.

📊 Database (MongoDB)

Stores metadata and additional case details not stored on-chain.

📌 Future Enhancements

Deploying to a public Ethereum testnet.

Enhancing security with encryption.

Implementing a user-friendly dashboard.



