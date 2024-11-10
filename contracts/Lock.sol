// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract nxtag {

    struct User {
        bool isVerified;
        uint reputation;
    }

    struct DataRequest {
        address consumer;
        string category;
        uint rewardAmount;
        bool isActive;
    }

    struct DataSubmission {
        address contributor;
        uint requestId;
        string dataHash;
        bool isVerified;
    }

    address public owner;
    uint public nextRequestId;
    uint public nextSubmissionId;

    mapping(address => User) public users;
    mapping(uint => DataRequest) public dataRequests;
    mapping(uint => DataSubmission) public dataSubmissions;
    mapping(address => uint) public rewards;

    event UserVerified(address indexed user);
    event DataRequestCreated(uint requestId, string category, uint rewardAmount);
    event DataSubmitted(uint submissionId, uint requestId, string dataHash);
    event DataVerified(uint submissionId, bool isVerified);
    event RewardClaimed(address user, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyVerifiedUser() {
        require(users[msg.sender].isVerified, "Only verified users can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function verifyUser(address _user, uint _reputation) external onlyOwner {
        users[_user] = User(true, _reputation);
        emit UserVerified(_user);
    }

    function createDataRequest(string calldata _category, uint _rewardAmount) external onlyVerifiedUser {
        dataRequests[nextRequestId] = DataRequest(msg.sender, _category, _rewardAmount, true);
        emit DataRequestCreated(nextRequestId, _category, _rewardAmount);
        nextRequestId++;
    }

    function submitData(uint _requestId, string calldata _dataHash) external onlyVerifiedUser {
        require(dataRequests[_requestId].isActive, "Request is not active");

        dataSubmissions[nextSubmissionId] = DataSubmission(msg.sender, _requestId, _dataHash, false);
        emit DataSubmitted(nextSubmissionId, _requestId, _dataHash);
        nextSubmissionId++;
    }

    function verifyData(uint _submissionId, bool _isVerified) external onlyVerifiedUser {
        DataSubmission storage submission = dataSubmissions[_submissionId];
        require(dataRequests[submission.requestId].consumer == msg.sender, "Only the data consumer can verify this submission");
        
        submission.isVerified = _isVerified;
        if (_isVerified) {
            rewards[submission.contributor] += dataRequests[submission.requestId].rewardAmount;
        }
        emit DataVerified(_submissionId, _isVerified);
    }

    function claimRewards() external onlyVerifiedUser {
        uint amount = rewards[msg.sender];
        require(amount > 0, "No rewards to claim");

        rewards[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        emit RewardClaimed(msg.sender, amount);
    }

    function fundContract() external payable onlyOwner {}

    receive() external payable {}
}
