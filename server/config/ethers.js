const flowerContractAddress = "0x8abc7e200e2fb7cac7c2358813b77543ebd22365";

const flowerContractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_selectedSlug",
				"type": "string"
			}
		],
		"name": "clientCostForPurchase",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCallerAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_slug",
				"type": "string"
			}
		],
		"name": "getFlowerCost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPurchaseCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserFlowers",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_selectedSlug",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			}
		],
		"name": "ownerEarningsForPurchase",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_selectedSlug",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			}
		],
		"name": "purchase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


let flowerContract = undefined;
let signer = undefined;
let acc = undefined;


const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
provider.send("eth_requestAccounts", []).then(() => {
	provider.listAccounts().then((accounts) => {
		acc = accounts[0];
		signer = provider.getSigner(accounts[0]);
		flowerContract = new ethers.Contract(
		flowerContractAddress,
		flowerContractABI,
		signer
		);
  	});
});

async function purchase() {
    try {
        const slug = document.getElementById("flowerSlug").value;
        const cost = document.getElementById("flowerCost").value;
        await flowerContract.purchase(slug, cost);
	} catch (error) {
		console.error("An error occurred:", error);
		const trimmedString = error.toString().replace(/\([^()]*\)/g, '');
		document.getElementById("purchase-error").textContent = trimmedString;
		document.getElementById("purchase-error").style.display = "block";
    }
}



async function showData() {
    try {
        const userFlowers = await flowerContract.getUserFlowers();
        const purchaseCount = await flowerContract.getPurchaseCount();
        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        userFlowers.forEach(async (flowerSlug, index) => {
            const flowerCost = await flowerContract.getFlowerCost(flowerSlug);
            const row = document.createElement("tr");

            const numberCell = document.createElement("th");
            numberCell.scope = "row";
            numberCell.textContent = index + 1;

            const slugCell = document.createElement("td");
            slugCell.textContent = flowerSlug;

            const costCell = document.createElement("td");
            costCell.textContent = flowerCost;

            row.appendChild(numberCell);
            row.appendChild(slugCell);
            row.appendChild(costCell);

            tableBody.appendChild(row);
        });

        const purchaseCountElement = document.getElementById("purchaseCount");
        purchaseCountElement.textContent = `Total Purchases: ${purchaseCount}`;
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


async function getCallerAddress() {
  const address = await flowerContract.getCallerAddress()
  document.getElementById("getCallerAddress-output").innerText = `Your address: ${address}`;
}

async function getMood() {
  const mood = await flowerContract.getCallerAddress();
  document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
  console.log(mood);
}

async function setMood() {
  const mood = document.getElementById("mood").value;
  await flowerContract.purchase(mood);
}
