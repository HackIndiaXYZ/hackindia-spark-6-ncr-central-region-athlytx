// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AthleteCredentialNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    // Credential types
    enum CredentialType {
        HEALTH_CLEARED,
        FITNESS_MILESTONE,
        DIET_CONSISTENCY,
        INJURY_FREE_STREAK,
        RISK_MANAGEMENT
    }

    struct Credential {
        CredentialType credType;
        uint256 issuedAt;
        string ipfsHash;
        uint256 expiryDate;
        bool isActive;
        string athleteId;
    }

    // Mapping: tokenId => Credential
    mapping(uint256 => Credential) public credentials;
    
    // Mapping: athleteId => tokenIds[]
    mapping(string => uint256[]) public athleteCredentials;
    
    // Mapping: athleteId => isVerified
    mapping(string => bool) public verifiedAthletes;

    event CredentialMinted(
        uint256 indexed tokenId,
        address indexed athlete,
        CredentialType credType,
        string athleteId
    );

    event CredentialRevoked(uint256 indexed tokenId);

    constructor() ERC721("ATHLYX Credential", "ATHC") Ownable(msg.sender) {}

    function mintCredential(
        address athleteAddress,
        string memory athleteId,
        CredentialType credType,
        string memory ipfsHash,
        uint256 validityDays
    ) public onlyOwner returns (uint256) {
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;

        _safeMint(athleteAddress, newTokenId);

        Credential memory newCred = Credential({
            credType: credType,
            issuedAt: block.timestamp,
            ipfsHash: ipfsHash,
            expiryDate: block.timestamp + (validityDays * 1 days),
            isActive: true,
            athleteId: athleteId
        });

        credentials[newTokenId] = newCred;
        athleteCredentials[athleteId].push(newTokenId);
        verifiedAthletes[athleteId] = true;

        emit CredentialMinted(newTokenId, athleteAddress, credType, athleteId);
        return newTokenId;
    }

    function revokeCredential(uint256 tokenId) public onlyOwner {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        credentials[tokenId].isActive = false;
        emit CredentialRevoked(tokenId);
    }

    function isCredentialValid(uint256 tokenId) public view returns (bool) {
        Credential memory cred = credentials[tokenId];
        return cred.isActive && block.timestamp < cred.expiryDate;
    }

    function getAthleteCredentials(string memory athleteId)
        public
        view
        returns (uint256[] memory)
    {
        return athleteCredentials[athleteId];
    }

    function getCredential(uint256 tokenId)
        public
        view
        returns (Credential memory)
    {
        return credentials[tokenId];
    }

    // Override required functions
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
