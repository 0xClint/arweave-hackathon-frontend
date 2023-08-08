import "./App.css";
import { useState } from "react";
import { ArweaveWebWallet } from "arweave-wallet-connector";
import { WarpFactory } from "warp-contracts";
import { InjectedArweaveSigner } from "warp-contracts-plugin-deploy";

function App() {
  const [wallet, setWallet] = useState("");
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    let wallet = new ArweaveWebWallet({
      // optionally provide information about your app that will be displayed in the wallet provider interface
      name: "temp-app",
      logo: "LOGO url",
    });
    setWallet(wallet);
    await wallet.setUrl("arweave.app");
    await wallet.connect();
    setAddress(await wallet.address);
  };

  const subscribe = async () => {
    const userSigner = await new InjectedArweaveSigner(wallet);
    await userSigner.setPublicKey();

    const warp = WarpFactory.forTestnet();
    const contract = await warp
      .contract("SVOhbM5bumtUrIz09Rc54qdwOY3NtS0lvti-xfdz7gA")
      .connect(userSigner);
    try {
      const result = await contract.writeInteraction({
        function: "addUser",
        user: {
          address,
          email: "omkarbdarde@gmail.com",
          status: "active",
          name: "ClintOP2",
        },
      });
      console.log("result:", result);
    } catch (err) {
      console.log("error:", err);
    }
  };
  return (
    <div className="App">
      <button onClick={() => connectWallet()}>connect</button>
      <button onClick={() => subscribe()}>subscribe</button>
    </div>
  );
}

export default App;
