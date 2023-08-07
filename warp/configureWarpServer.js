import { WarpFactory } from "warp-contracts";
import Arweave from "arweave";
import fs from "fs";

/*
 *  environment can be 'local' | 'testnet' | 'mainnet' | 'custom';
 */
const arweave = Arweave.init({});

const environment = "testnet";
let warp;

if (environment === "testnet") {
  warp = WarpFactory.forTestnet();
} else if (environment === "mainnet") {
  warp = WarpFactory.forMainnet();
} else {
  throw Error("environment not set properly...");
}

async function configureWallet() {
  try {
    if (environment === "testnet") {
      try {

        const jwk = await arweave.wallets.generate();
        fs.writeFileSync("../testwallet.json", JSON.stringify(jwk));
        return JSON.parse(fs.readFileSync("../testwallet.json", "utf-8"));
      } catch (err) {
        const jwk = await arweave.wallets.generate();
        fs.writeFileSync("../testwallet.json", JSON.stringify(jwk));
        return jwk;
      }
    } else {
      throw Error("Wallet not configured properly...");
    }
  } catch (err) {
    throw Error("Wallet not configured properly...", err);
  }
}

export { configureWallet, warp };
