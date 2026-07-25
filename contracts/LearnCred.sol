// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title LearnCred
 * @dev Issues immutable, verifiable educational credentials for technical skills.
 */
contract LearnCred {
    
    address public owner;

    struct Credential {
        string courseName;
        string skillGained;
        uint256 issueDate;
        string issuerName;
    }

    // Maps a student's wallet address to an array of their earned credentials
    mapping(address => Credential[]) private studentCredentials;

    // Emit event when a new credential is logged on the blockchain
    event CredentialIssued(address indexed student, string courseName, uint256 issueDate);

    // Restricts credential issuance to the authorized platform administrator
    modifier onlyOwner() {
        require(msg.sender == owner, "Error: Only the authorized educator can issue credentials");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Issues a new credential to a student's wallet address.
     * @param _student Address of the student.
     * @param _courseName Name of the completed course or module.
     * @param _skillGained Specific technical skill unlocked.
     * @param _issuerName Name of the platform or instructor.
     */
    function issueCredential(
        address _student, 
        string memory _courseName, 
        string memory _skillGained, 
        string memory _issuerName
    ) public onlyOwner {
        
        Credential memory newCredential = Credential({
            courseName: _courseName,
            skillGained: _skillGained,
            issueDate: block.timestamp,
            issuerName: _issuerName
        });

        studentCredentials[_student].push(newCredential);
        
        emit CredentialIssued(_student, _courseName, block.timestamp);
    }

    /**
     * @dev Retrieves all credentials earned by a specific student.
     * @param _student Address of the student.
     * @return Array of Credential structs.
     */
    function getStudentCredentials(address _student) public view returns (Credential[] memory) {
        return studentCredentials[_student];
    }
    
    /**
     * @dev Returns the total number of credentials a student has earned.
     * @param _student Address of the student.
     * @return Number of credentials.
     */
    function getCredentialCount(address _student) public view returns (uint256) {
        return studentCredentials[_student].length;
    }
}