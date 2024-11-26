// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auth {
    struct User {
        string username;
        string email;
    }
    
    mapping(address => User) public users;
    
    event UserRegistered(address indexed userAddress, string username, string email);

    function registerUser(string memory _username, string memory _email) public {
        users[msg.sender] = User(_username, _email);
        emit UserRegistered(msg.sender, _username, _email);
    }
}

