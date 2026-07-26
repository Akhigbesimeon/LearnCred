# LearnCred Platform
LearnCred is a decentralized credentialing platform operating within the Education and Identity Management application areas. When a student completes a technical curriculum or demonstrates mastery in your digital learning environment, the platform issues a verifiable credential directly to the student's digital wallet.
 
##  The Problem
 
Youth in underserved, low-income communities acquire real technical skills through digital learning platforms — but leave with no formal, verifiable proof employers will trust. Traditional institutions act as credentialing gatekeepers: certification is expensive, verification is centralized, and transcript services impose fees and delays. Without a way to cryptographically prove their skills, non-traditionally educated students remain locked out of economic opportunity.
 
##  The Solution
 
LearnCred applies blockchain technology within the **Education** and **Identity Management** application areas:
 
- **Decentralized ownership** — credentials are minted directly to the student's Ethereum wallet. The learner owns the record permanently.
- **Immutable verification** — records live on-chain and cannot be altered or forged. Employers query the blockchain and verify skills instantly, trustlessly.
- **Zero gatekeepers** — no transcript fees, no third-party verification services, no central authority deciding who gets to prove what they know.

## Architecture
 
The core of the system is a single lightweight Solidity smart contract that acts as the credential registry:
 
```
Educator (contract owner)
        │  issueCredential()          ← guarded by onlyOwner
        ▼
Credential struct                     ← course · skill · issue date · issuer
        │
        ▼
mapping(address => Credential[])      ← student wallet → earned credentials
        │
        ▼
Anyone: getStudentCredentials()       ← public, free verification
```
 
Key design elements:
 
| Element | Purpose |
|---|---|
| `owner` | Address of the authorized educator/platform administrator, set at deployment |
| `struct Credential` | Stores `courseName`, `skillGained`, `issueDate`, `issuerName` |
| `mapping(address => Credential[])` | Associates each student wallet with an array of earned credentials |
| `onlyOwner` modifier | Reverts any issuance attempt by a non-owner wallet |
| `CredentialIssued` event | Emits a permanent, indexed audit trail entry on every issuance |
| `block.timestamp` | Issue date is supplied by the chain, so credentials cannot be backdated |
 
The contract is deliberately minimal — one owner, one struct, one mapping, no external dependencies — to keep gas costs low for deployment and interaction.
 
##  Smart Contract
 
- **Language:** Solidity `^0.8.0`
- **Network:** Ethereum — deployed and validated on the **Sepolia testnet**
- **File:** `contracts/LearnCred.sol`
### Public interface
 
```solidity
// Write (owner only)
function issueCredential(
    address _student,
    string memory _courseName,
    string memory _skillGained,
    string memory _issuerName
) public onlyOwner;
 
// Read (anyone, free)
function getStudentCredentials(address _student) public view returns (Credential[] memory);
function getCredentialCount(address _student) public view returns (uint256);
```
 
## Deployment (Sepolia Testnet via Remix)
 
1. **Configure MetaMask** — install the [MetaMask](https://metamask.io) extension, enable "Show test networks," and select **Sepolia**. Fund your wallet with test ETH from a public faucet (e.g., Alchemy or Infura).
2. **Open Remix** — go to [remix.ethereum.org](https://remix.ethereum.org) and create `contracts/LearnCred.sol`. Paste in the contract code.
3. **Compile** — in the *Solidity Compiler* tab, select compiler version `0.8.0` or higher and click **Compile LearnCred.sol**.
4. **Connect wallet** — in *Deploy & Run Transactions*, set the Environment to **Injected Provider – MetaMask** and approve the connection.
5. **Deploy** — with `LearnCred` selected, click **Deploy** and confirm the transaction (test gas fee) in MetaMask.
6. **Interact** — once confirmed, expand the contract under *Deployed Contracts* to access `issueCredential` (write) and `getStudentCredentials` / `getCredentialCount` (read).

## Testing
 
All four test cases passed on the Sepolia testnet:
 
| # | Test | Expected | Result |
|---|---|---|---|
| 1 | Owner issues a credential (`"Advanced Routing"`, `"TypeScript"`, `"Brainbox"`) | Transaction succeeds; `CredentialIssued` emitted | Passed |
| 2 | Non-owner wallet calls `issueCredential` | Reverts: `"Error: Only the authorized educator can issue credentials"` | Passed |
| 3 | `getStudentCredentials` for the student from Test 1 | Returns exact course, skill, timestamp, and issuer | Passed |
| 4 | `getCredentialCount` for a wallet with no credentials | Returns `0` | Passed |
 
Together, tests 1–2 prove the write path works for the owner *and only* the owner; tests 3–4 validate the open read path, including the empty-wallet edge case.
 
## Roadmap
 
- **Multi-issuer support** — role-based access so multiple verified educators can issue through one registry
- **Revocation flags** — mark a credential revoked without erasing the historical record
- **Gas optimization** — move string metadata off-chain (e.g., IPFS) and store content hashes
- **Mainnet / L2 migration** — deploy to Ethereum mainnet or a low-fee layer-2 to keep issuance affordable at scale

## Mission
 
LearnCred exists to dismantle generational cycles of poverty by making academic excellence permanently provable — so any student who masters a skill can open the door to a technical career, no institution required.
