# Voting Smart Contract

This is a Solidity smart contract for a simple voting system, allowing users to vote for candidates within a specified time frame. It was deployed on the Lisk testnet at the following address:

**Deployed Address on Lisk Sepolia Testnet: `0xa0419295d8A52FEA0D32eA70b84733dfBC85aa08`**

## Overview

The contract allows the owner to:
- Initialize a list of candidates for voting.
- Add additional candidates during the voting period.
- Track the voting status and remaining time.

Participants can:
- Vote for their preferred candidate.
- View the list of all candidates and their vote counts.

## Features

1. **Owner Privileges:**
   - Add candidates to the election.
   - Set the voting duration.

2. **Voting:**
   - Each participant can only vote once.
   - Voting is restricted to the active voting period.

3. **Voting Status:**
   - Participants can check if the voting is still open and view the remaining time.

## Key Functions

- `addCandidate(string _name)`: Allows the owner to add new candidates during the voting period.
- `vote(uint256 _candidateIndex)`: Lets users vote for their preferred candidate by specifying their index.
- `getAllVotesOfCandiates()`: Returns the current vote counts for all candidates.
- `getVotingStatus()`: Checks if voting is currently open.
- `getRemainingTime()`: Returns the time left until voting closes.
