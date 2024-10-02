# Proposal Contract

## Overview
This project implements a Solidity smart contract called `ProposalContract` that allows users to create and vote on funding proposals. Once a proposal reaches the minimum required votes, the contract can execute the transfer of funds to the specified recipient. This contract was deployed on the **Lisk Sepolia Testnet** at the address provided below.

### Key Features:
- Users can create proposals specifying a description, recipient, amount, and voting duration.
- Other users can vote on the proposals.
- Proposals that reach the minimum votes required can be executed to transfer funds to the recipient.
- The contract allows Ether deposits and manages the funding based on the voting outcomes.

## Deployed Contract

- **ProposalContract**: `0x2ba99D52F891A9Ae74742745099f7A9194eBA112`

## Contract Details

### 1. Proposal Struct
Each proposal consists of the following details:
- **description**: A brief description of the proposal.
- **recipient**: The address to receive funds if the proposal is approved.
- **amount**: The amount of Ether to transfer if the proposal passes.
- **voteCount**: The current number of votes in favor of the proposal.
- **votingDeadline**: The timestamp after which voting ends.
- **minVotesToPass**: The minimum number of votes required for the proposal to pass.
- **executed**: A flag indicating if the proposal has already been executed.

### Key Functions

- `createProposal(string _description, address payable _recipient, uint256 _amount, uint256 _votingPeriod, uint256 _minVotesToPass)`:  
  Allows any user to create a new proposal, specifying the proposal description, recipient address, amount, voting period, and the minimum number of votes required to pass the proposal.

- `vote(uint256 _proposalId)`:  
  Enables users to vote on an active proposal by providing the proposal ID. Users can only vote once per proposal.

- `executeProposal(uint256 _proposalId)`:  
  After the voting period ends and if the minimum votes are reached, the contract owner can execute the proposal, transferring the requested amount of Ether to the recipient.

- `receive() external payable`:  
  This function allows the contract to receive Ether, ensuring it has the funds to execute successful proposals.

### Events

- **ProposalCreated**: Emitted when a new proposal is created, providing details like the proposal ID, recipient, amount, voting deadline, and required votes.
- **Voted**: Emitted each time a user casts a vote on a proposal.
- **ProposalExecuted**: Emitted when a proposal has been successfully executed and funds are transferred to the recipient.
