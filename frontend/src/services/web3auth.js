import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { ethers } from "ethers";

const clientId = import.meta.env.VITE_WEB3AUTH_CLIENT_ID;

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x13881", // Mumbai testnet
  rpcTarget: "https://rpc-mumbai.maticvigil.com",
  displayName: "Polygon Mumbai",
  blockExplorer: "https://mumbai.polygonscan.com",
  ticker: "MATIC",
  tickerName: "Matic"
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig }
});

export const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: "testnet",
  chainConfig,
  privateKeyProvider
});

export async function initWeb3Auth() {
  await web3auth.initModal();
}

export async function login() {
  const provider = await web3auth.connect();
  return provider;
}

export async function logout() {
  await web3auth.logout();
}

export async function getUserInfo() {
  const user = await web3auth.getUserInfo();
  return user;
}

export async function getAccounts(provider) {
  const ethersProvider = new ethers.BrowserProvider(provider);
  const signer = await ethersProvider.getSigner();
  const address = await signer.getAddress();
  return address;
}
