"use client";
import { ArweaveWebWallet } from "arweave-wallet-connector";
import { WarpFactory } from "warp-contracts";
import { transactionId } from "../../transactionid";
import { InjectedArweaveSigner } from "warp-contracts-plugin-deploy";
import { useState } from "react";



export default function Home() {

  const [wallet, setWallet] = useState("");

  // const { connect } = useConnection();
  // const address = useActiveAddress();
  // const publicKey = usePublicKey()


  const connectWallet = async () => {

    let wallet = new ArweaveWebWallet({
      // optionally provide information about your app that will be displayed in the wallet provider interface
      name: "temp-app",
      logo: "LOGO url",
    });
    setWallet(wallet);
    await wallet.setUrl("arweave.app");
    await wallet.connect();
  };

  const interact = async () => {

    const userSigner = await new InjectedArweaveSigner(wallet)
    await userSigner.setPublicKey();

    const warp = WarpFactory.forTestnet();
    const contract = await warp.contract(transactionId).connect(userSigner);
    try {
      const result = await contract.writeInteraction({
        function: "addUser",
        user: {
          address: "address3",
          email: "bcd@mnp.xyz",
          status: "active",
        },
      });
      console.log("result:", result);
    } catch (err) {
      console.log("error:", err);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => connectWallet()}>Connect</button>
      <button onClick={() => interact()}>Interact</button>
    </main>
  )
}
