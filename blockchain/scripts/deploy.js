const hre = require("hardhat");

async function main() {
  console.log("Deploying AthleteCredentialNFT to Polygon Mumbai...");

  const AthleteCredentialNFT = await hre.ethers.getContractFactory("AthleteCredentialNFT");
  const nftContract = await AthleteCredentialNFT.deploy();

  await nftContract.waitForDeployment();

  const address = await nftContract.getAddress();
  console.log("✅ AthleteCredentialNFT deployed to:", address);

  // Wait for block confirmations
  console.log("Waiting for block confirmations...");
  await nftContract.deploymentTransaction().wait(6);

  console.log("Verifying contract on PolygonScan...");
  try {
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: [],
    });
    console.log("✅ Contract verified!");
  } catch (error) {
    console.log("Verification failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
