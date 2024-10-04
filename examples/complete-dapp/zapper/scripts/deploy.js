const hre =  require("hardhat")

async function main() {
 
    const Coffee = await hre.ethers.getContractFactory("CoffeeShop") // fetching bytecode and ABI
    const coffeeShop = await Coffee.deploy(); // creating an instance of our smart contract

    await coffeeShop.deploy(); // deploying our smart contract
  
  
  }
  
  main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
   