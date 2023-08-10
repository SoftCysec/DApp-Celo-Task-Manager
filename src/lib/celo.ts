import { ContractKit } from '@celo/contractkit';

// Initialize Celo ContractKit
const kit = ContractKit.newKit('https://alfajores-forno.celo-testnet.org');

// Connect to a Celo wallet (for demonstration purposes, this is a simple setup)
async function connectCeloWallet() {
    if (window.celo) {
        try {
            await window.celo.enable();
            kit.defaultAccount = window.celo.eth.defaultAccount;
        } catch (error) {
            console.error("Error connecting to Celo Wallet:", error);
        }
    } else {
        console.log("Celo extension not available");
    }
}

export { kit, connectCeloWallet };
