// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FlowerShop {
    mapping(string => uint256) flowerCost;
    mapping(address => string[]) userFlowers;
    mapping(address => uint256) purchaseCount;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function purchase(string memory _selectedSlug, uint256 _cost) public {
        require(_cost > 0, "Cost must be greater than 0");
        require(bytes(_selectedSlug).length > 0, "Invalid flower slug");

        flowerCost[_selectedSlug] = _cost;
        userFlowers[msg.sender].push(_selectedSlug);
        purchaseCount[msg.sender]++;
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

    function withdrawSpecificAmount(uint256 amount) public onlyOwner {
        require(amount > 0, "Withdrawal amount must be greater than 0");
        uint256 contractBalance = address(this).balance;
        require(contractBalance >= amount, "Insufficient balance for withdrawal");
        payable(owner).transfer(amount);
    }

    function clientCostForPurchase(string memory _selectedSlug) public view returns (uint256) {
        uint256 cost = flowerCost[_selectedSlug];
        require(cost > 0, "Flower not found or price not set");
        return cost;
    }

    function ownerEarningsForPurchase(string memory _selectedSlug, uint256 _cost) public view onlyOwner returns (uint256) {
        uint256 cost = flowerCost[_selectedSlug];
        require(cost > 0, "Flower not found or price not set");
        return _cost;
    }
}