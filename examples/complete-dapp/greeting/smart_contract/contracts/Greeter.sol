// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {

    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greetins: ", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s' ", greeting, _greeting);
        greeting = _greeting;
    }

    function deposit() payable public{}
}