const  { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const _candidateNames = ['Mark', 'James', 'Sammy', 'Peter', 'Guzbyte'];
const _durationInMinutes = 86400;

const VotingModule = buildModule("VotingModule", (m) => {

  const voting = m.contract("Voting", [_candidateNames, _durationInMinutes]);

  return { voting };
});

module.exports =  VotingModule;