module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",      // Localhost for Ganache
      port: 7545,             // Standard Ganache port
      network_id: "5777"         // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "0.8.0",       // Ensure this matches your Solidity version
    }
  }
};
