const  { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const GreeterModule = buildModule("GreeterModule", (m) => {

  const greeter = m.contract("Greeter", ["Hello, World!"]);
  return { greeter };
});

module.exports =  GreeterModule;