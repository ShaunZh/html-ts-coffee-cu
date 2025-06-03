import { createWalletClient, custom, createPublicClient } from 'https://esm.sh/viem'

const connectButton = document.getElementById('connectButton');
const fundButton = document.getElementById('fundButton');
const ethAmountInput = document.getElementById('ethAmount');

let walletClient;
let publicClient;

async function connect() {
    if (typeof window.ethereum !== 'undefined') {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
        await walletClient.requestAddresses()
        console.log('hi')
        connectButton.innerHTML = "Connected";
    } else {
        connectButton.innerHTML = 'Please install MetaMask!'
    }
}

async function fund() {
    const ethAmount = ethAmountInput.value;
    if (typeof window.ethereum !== 'undefined') {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
        await walletClient.requestAddresses()

        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })

        await publicClient.simulateContract({
            // address: ???
        })


        console.log('hi')
        connectButton.innerHTML = "Connected";
    } else {
        connectButton.innerHTML = 'Please install MetaMask!'
    }

    console.log(`Funding with ${ethAmount} ETH...`);
}

connectButton.onclick = connect;
fundButton.onclick = fund;