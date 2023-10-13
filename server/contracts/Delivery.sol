// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FlowerDelivery {
    struct Delivery {
        string destination;
        uint256 cost;
        address userId;
        address flowerId;
        uint256 quantity;
        string status;
    }

    mapping(uint256 => Delivery) public deliveries;
    uint256 public deliveryCount;

    event DeliveryCreated(uint256 deliveryId, string destination);
    event DeliveryStatusUpdated(uint256 deliveryId, string newStatus);

    function createDelivery(
        string memory _address,
        uint256 _cost,
        address _userId,
        address _flowerId,
        uint256 _quantity
    ) public {
        deliveries[deliveryCount] = Delivery({
            destination: _address,
            cost: _cost,
            userId: _userId,
            flowerId: _flowerId,
            quantity: _quantity,
            status: "Not paid"
        });

        emit DeliveryCreated(deliveryCount, _address);
        deliveryCount++;
    }

    function updateDeliveryStatus(uint256 _deliveryId, string memory _newStatus) public {
        require(_deliveryId < deliveryCount, "Invalid delivery ID");
        require(
            keccak256(abi.encodePacked(_newStatus)) == keccak256(abi.encodePacked("Paid")) ||
            keccak256(abi.encodePacked(_newStatus)) == keccak256(abi.encodePacked("In Transit")) ||
            keccak256(abi.encodePacked(_newStatus)) == keccak256(abi.encodePacked("Delivered")),
            "Invalid delivery status"
        );

        deliveries[_deliveryId].status = _newStatus;
        emit DeliveryStatusUpdated(_deliveryId, _newStatus);
    }
}