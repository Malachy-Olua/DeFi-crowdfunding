
const main = async () => {

  const crowdFunding = await hre.ethers.getContractFactory('CrowdFunding'); //this is like a function factory or a class that is going to generate instances of that specific contract;
  const crowdFundingTransaction = await crowdFunding.deploy();

  await crowdFundingTransaction.deployed();



  console.log("crowdFunding deployed to:", crowdFundingTransaction.address);
  //crowdFunding deployed to: 0xf5149Fd6F8A1a4715dCF9d6428A819173c57edfB

}

// this pattern is recommended to be able to use async/await everywhere
// and properly handle errors.
const runMain = async () =>{
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();