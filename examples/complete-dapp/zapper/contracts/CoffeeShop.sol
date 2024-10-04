// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract CoffeeShop {
    struct Memo {
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memos;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string calldata name, string calldata message) external payable {
        require(msg.sender != address(0), 'Zero Address detected');
        require(msg.value > 0, 'Zero amount not accepted');
        owner.transfer(msg.value);
        memos.push(Memo(name, message, block.timestamp, msg.sender));
    }

    function getMemo() public view returns(Memo[] memory) {
        return memos;
    }
}