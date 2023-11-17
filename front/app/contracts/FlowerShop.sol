// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FlowerShop {

    mapping(address => string[]) userFlowers;
    mapping(string => uint256) flowerCost;
    mapping(address => uint256) purchaseCount;
    mapping(address => uint256) transactionCost;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function purchase(string[] memory _selectedSlugs, uint256[] memory _costs) public payable  {
        uint256 totalCost = 0;
        for (uint256 i = 0; i < _selectedSlugs.length; i++) {
            string memory _selectedSlug = _selectedSlugs[i];
            uint256 _cost = _costs[i];

            userFlowers[msg.sender].push(_selectedSlug);
            totalCost += _cost;
            flowerCost[_selectedSlug] = _cost;
        }
        transactionCost[msg.sender] = totalCost;
        purchaseCount[msg.sender]++;    
    }

    // Function to check the contract's balance
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Function to withdraw funds (only owner)
    function withdraw() public onlyOwner {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    // Function to get the cost of a specific flower slug
    function getFlowerCost(string memory _slug) public view returns (uint256) {
        return flowerCost[_slug];
    }

    // Function to get the user's selected flowers
    function getUserFlowers() public view returns (string[] memory) {
        return userFlowers[msg.sender];
    }

    // Function to get the number of purchases made by the caller
    function getPurchaseCount() public view returns (uint256) {
        return purchaseCount[msg.sender];
    }

    // Function to get the caller's address
    function getCallerAddress() public view returns (address) {
        return msg.sender;
    }   

    // Function to get the caller's transaction cost
    function getTransactionCost() public view returns (uint256) {
        return transactionCost[msg.sender];
    }

}
