
let contractAddress = '0x40e3f85c5a6c6ee3b63091359b7edc1e5f99d2e1';
let abi = '[
	{
		"constant": true,
		"inputs": [],
		"name": "getTotalToken",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTokenPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalToken",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "votesReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "tokenPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "candidate",
				"type": "bytes32"
			}
		],
		"name": "getCandidateIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidateNames",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "candidateName",
				"type": "bytes32"
			},
			{
				"name": "tokenCountForVote",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"name": "voterAddress",
				"type": "address"
			},
			{
				"name": "tokenBought",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCandidatesInfo",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "buy",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTokenBought",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "balanceTokens",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getVotesReceivedFor",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalanceTokens",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_totalToken",
				"type": "uint256"
			},
			{
				"name": "_tokenPrice",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]';

var procName = ['iphone7', 'iphone8', 'iphoneX', 'galaxyS9', 'galaxyNote9', 'LGG7'];\

window.addEventListener('load', function() {
	
	if(typeof web3 !== 'undefined') {
		window.web3 = new Web3(web3.currentProvider);
	} else {
		console.log('No web3? You should consider trying MetaMask!');
		window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545");
	}
	
	startApp();
});

function startApp() {

	DCCAuctionContract = web3.eth.contract(abi);
	DCCAution = DCCAuctionContract.at(contractAddress);
	document.getElementById('contractAddr').innerHTML = getLink(contractAddress);
	
	web3.eth.getAccounts(function(e,r) {
		document.getElementById('accountAddr').innerHTML = getLink(r[0]);
		accountAddress = r[0];
		getValue();
	});
}

function getLink(addr) {
	return '<a target="_blank" href=https://testnet.etherscan.io/address/' + addr + '>' + addr + '</a>';
}

function getValue() {
	getEther();
	getToken();
	getTokenInfo();
	getCandidateInfo();
}

function getEther() {
	web3.ethh.getBalance(accountAddress, function(e,r) {
		document.getElementById('ethValue').innerHTML = web3.fromWei(r.toString()) + "ETH";
	});
}

function getToken() {
	DCCAution.getTokenBought(function(e,r) {
		document.getElementById('tokenValue').innerHTML = r.toString();
	});
}

function getTokenInfo() {
	DCCAution.getTotalToken(function(e,r) {
		tokenPrice = parseFloat(web3.fromWei(r.toString()));
		document.getElementById('token-cost').innerHTML = tokenPrice + "ETH";
	});
	
	DCCAution.getTotalToken(function(e,r) {
		document.getElementById('contract-balance').innerHTML = web3.fromWei(v.toString()) + "ETH";
	});
}

function getCandidateInfo() {
	DCCAution.getHighestVotes(function(e,r) {
		for(let i=0 ; i<r.length ; i++)
		{
			document.getElementById(procName[i]).innerHTML = r[i].toStirng();
		}
	});
}

function voteForProduct(int procNum) {

	if(procNum == 0)
	{
		let voteTokens = $("#tb_iphone7").val();
		$("#tb_iphone7").val("");
	}
	else if(procNum == 1)
	{
		let voteTokens = $("#tb_iphone8").val();
		$("#tb_iphone8").val("");
	}
	else if(procNum == 2)
	{
		let voteTokens = $("#tb_iphoneX").val();
		$("#tb_iphoneX").val("");
	}
	else if(procNum == 3)
	{
		let voteTokens = $("#tb_galaxy9").val();
		$("#tb_galaxy9").val("");
	}
	else if(procNum == 4)
	{
		let voteTokens = $("#tb_galaxyNote9").val();
		$("#tb_galaxyNote9").val("");
	}
	else if(procNum == 5)
	{
		let voteTokens = $("#tb_LGG7").val();
		$("#tb_LGG7").val("");
	}
	
	let candidateName = procName[procNum];
	DCCAution.vote(candidateName, voteTokens, function(e,r) {
		getCandidateInfo();
	});
}

function buyTokens() {
	let tokensToBuy = $("#buy").val();
	let price = tokensToBuy * tokenPrice;
	$("#buy-msg").html("Purchase order has been submitted. Please wait.");
	
	DCCAution.buy({value:web3.toWei(price, 'ether'), from: web3.eth.accounts[0]}, function(v) {
		web3.eth.getBalance(DCCAution.address, function(e,r) {
			$("#contract-balance").html(web3.fromWei(r.toString()) + "ETH");
		});
	});
}























