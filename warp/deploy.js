import { warp, configureWallet } from "./configureWarpServer.js";
import { readContractState } from 'arweavekit/contract';
import { ArweaveSigner, DeployPlugin } from "warp-contracts-plugin-deploy";
import fs from "fs";

async function deploy() {
  const wallet = await configureWallet();
  const state = fs.readFileSync("state.json", "utf-8");
  const contractsource = fs.readFileSync("contract.js", "utf-8");

  warp.use(new DeployPlugin())
  const { contractTxId } = await warp.createContract.deploy({
    wallet: new ArweaveSigner(wallet),
    initState: state,
    src: contractsource,
  })

  fs.writeFileSync(
    "../transactionid.js",
    `export const transactionId = "${contractTxId}"`
  );

  const { readContract } = await readContractState({ environment: "testnet", contractTxId });
  console.log(readContract.cachedValue)
}

deploy();
