import { warp, configureWallet } from "./configureWarpServer.js";
import { transactionId } from "../transactionid.js";

async function addUser() {
  let wallet = await configureWallet();
  const contract = warp.contract(transactionId).connect(wallet);
  const result = await contract.writeInteraction({
    function: "addUser",
    user: {
      address: "address1",
      email: "bcd@mnp.xyz",
      status: "active",
    },
    tags: [{ name: "Indexed-By", value: `temp-sub` }],
  });
  console.log("result:", result);
}

addUser();
