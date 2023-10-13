// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FlowerMarketplace {
    address public owner;
    uint256 public listingCount = 0;

    struct FlowerListing {
        uint256 id;
        string name;
        string description;
        uint256 price;
        address seller;
        bool isSold;
    }

    mapping(uint256 => FlowerListing) public listings;

    event FlowerListed(uint256 id, string name, uint256 price, address seller);
    event FlowerSold(uint256 id, string name, uint256 price, address seller, address buyer);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function createListing(string memory _name, string memory _description, uint256 _price) public {
        require(bytes(_name).length > 0 && bytes(_description).length > 0, "Name and description cannot be empty");
        require(_price > 0, "Price must be greater than zero");

        listingCount++;
        listings[listingCount] = FlowerListing(listingCount, _name, _description, _price, msg.sender, false);

        emit FlowerListed(listingCount, _name, _price, msg.sender);
    }

    function purchaseFlower(uint256 _id) public payable {
        require(_id > 0 && _id <= listingCount, "Invalid listing ID");
        FlowerListing storage listing = listings[_id];
        require(!listing.isSold, "This flower has already been sold");
        require(msg.value >= listing.price, "Insufficient funds to purchase this flower");

        listing.isSold = true;
        address payable seller = payable(listing.seller);
        seller.transfer(listing.price);

        emit FlowerSold(_id, listing.name, listing.price, listing.seller, msg.sender);
    }
}
