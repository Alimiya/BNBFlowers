// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FlowerShop {
    struct Transaction {
        uint256 id;
        address transactionCaller;
        uint256 transactionValue;
        uint256 transactionCost;
        string[] flowerSlugs;
    }

    mapping (address => Transaction[]) transactions;
    mapping (string => string) flowerName;
    mapping (string => uint256) flowerCost;

    address public owner;
    uint256 public transactionCounter;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        transactionCounter = 0;
    }

    function purchase(string[] memory _slugs, string[] memory _names, uint256[] memory _costs) public payable {
        // Parameter Validation
        require(_slugs.length == _names.length && _names.length == _costs.length, "Array lengths must be the same");
        require(_slugs.length > 0, "Arrays cannot be empty");

        uint256 totalCost = 0;

        for (uint256 i = 0; i < _slugs.length; i++) {
            string memory _slug = _slugs[i];
            string memory _name = _names[i];
            uint256 _cost = _costs[i];

            // Parameter Validation
            require(bytes(_slug).length > 0, "Flower slug cannot be empty");
            require(_cost > 0, "Flower cost must be greater than 0");

            totalCost += _cost;
            flowerName[_slug] = _name;
            flowerCost[_slug] = _cost;
        }

        // Error Cases
        require(totalCost > 0, "Total cost must be greater than 0");
        require(msg.value >= totalCost, "Insufficient funds");

        Transaction memory newTransaction = Transaction({
            id: transactionCounter,
            transactionCaller: msg.sender,
            transactionValue: msg.value,
            transactionCost: totalCost,
            flowerSlugs: _slugs
        });

        transactions[msg.sender].push(newTransaction);
        transactionCounter++;
    }

    // Getter function to retrieve flower name by slug
    function getFlowerName(string memory _slug) public view returns (string memory) {
        // Parameter Validation
        require(bytes(_slug).length > 0, "Flower slug cannot be empty");

        // Response Type
        return flowerName[_slug];
    }

    // Getter function to retrieve flower cost by slug
    function getFlowerCost(string memory _slug) public view returns (uint256) {
        // Parameter Validation
        require(bytes(_slug).length > 0, "Flower slug cannot be empty");

        // Response Type
        return flowerCost[_slug];
    } 

    // Getter function to retrieve all transactions by caller
    function getTransactionsByCaller(address _caller) public view returns (Transaction[] memory) {
        // Parameter Validation
        require(_caller != address(0), "Caller address cannot be zero");

        // Response Type
        return transactions[_caller];
    }
}
