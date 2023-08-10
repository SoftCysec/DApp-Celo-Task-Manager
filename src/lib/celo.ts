import Web3 from "web3";
import { ExtendedWindow } from "@/types/Index";
import { newKitFromWeb3 } from "@celo/contractkit";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = newKitFromWeb3(web3);

// Connect to a Celo wallet (for demonstration purposes, this is a simple setup)
async function connectCeloWallet() {
    if ((window as unknown as ExtendedWindow).celo) {
        try {
            await (window as unknown as ExtendedWindow).celo.enable();
            kit.defaultAccount = (window as unknown as ExtendedWindow).celo.eth.defaultAccount;
        } catch (error) {
            console.error("Error connecting to Celo Wallet:", error);
        }
    } else {
        console.log("Celo extension not available");
    }
}

export { kit, connectCeloWallet };
