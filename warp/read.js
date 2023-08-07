
import { readContractState } from 'arweavekit/contract';
import { transactionId } from '../transactionid.js';


async function read() {
    const { readContract } = await readContractState({ environment: "testnet", contractTxId: transactionId });
    console.log(readContract.cachedValue.state)
}
read();
