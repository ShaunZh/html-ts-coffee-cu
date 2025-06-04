import { createWalletClient, custom, createPublicClient, parseEther, defineChain } from 'https://esm.sh/viem';

import { contractAddress, coffeeAbi } from './constants.js';

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
        const [connectedAddress] = await walletClient.requestAddresses()
        const currentChain = await getCurrentChain(walletClient)

        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })

        await publicClient.simulateContract({
            address: contractAddress,
            abi: coffeeAbi,
            function: 'fund',
            account: connectedAddress,
            chain: currentChain,
            value: parseEther(ethAmount)
        })


        console.log('hi')
        connectButton.innerHTML = "Connected";
    } else {
        connectButton.innerHTML = 'Please install MetaMask!'
    }

    console.log(`Funding with ${ethAmount} ETH...`);
}


async function getCurrentChain(client) {
    const chainId = await client.getChainId()
    const currentChain = defineChain({
        id: chainId,
        name: "Custom Chain",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: {
            default: {
                http: ["http://localhost:8545"],
            },
        },
    })
    return currentChain
}



connectButton.onclick = connect;
fundButton.onclick = fund;