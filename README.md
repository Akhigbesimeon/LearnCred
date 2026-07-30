# LearnCred
LearnCred is a full-stack decentralized credentialing platform built on Ethereum. Authorized educators mint immutable skill credentials directly to a student's wallet through a secure **Issuer Console**, and any employer, anywhere, can verify those credentials instantly and for free through a public **Verification Workspace**.

> Issuance is restricted. Verification is open. Exactly as a public credential registry should be.

**Stack:** Solidity `^0.8.0` · Ethereum Sepolia · Expo React Native (web) · ethers.js v6 · TypeScript

---

## The Problem

Youth in underserved, low-income communities master advanced technical skills through digital learning — but leave with no formal, verifiable proof employers will trust.

- **Unverified mastery:** real skills, no verifiable degree.
- **Centralized monopolies:** transcripts are controlled by institutions and held behind administrative paywalls.
- **Systemic exclusion:** capable students can't pass automated HR filters; employers can't trust self-reported skills; institutional verification is slow, expensive, and exclusionary.

The credential gap perpetuates generational cycles of poverty by ignoring self-taught excellence.

## The Solution

LearnCred applies blockchain within the **Education** and **Identity Management** application areas:

- **Decentralized ownership:** credentials are cryptographically bound to the student's Ethereum address. Students control the private keys to their academic identity; no university or government can revoke or delete what they've earned.
- **Immutable verification:** records live on a transparent, publicly readable ledger. Verification is instant, trustless, and zero-cost.
- **Zero gatekeepers:** no transcript fees, no third-party verification services, no central authority deciding who gets to prove what they know.

## Features

| Feature | Description |
|---|---|
| **Issuer Console** | Protected admin interface for minting permanent records on-chain |
| **Verification Workspace** | Public explorer where employers audit candidate skills by wallet address |
| **Wallet integration** | Direct mapping of skills to personal Ethereum addresses |
| **Industrial web interface** | Bespoke "Neoclassic Industrial" dark theme — monospaced typography, strict 4px borders, high-contrast editorial palette |
| **Live blockchain state** | Pending/success/revert states surfaced in the UI via async status banners |

## Architecture

```
┌─────────────────────────────  Frontend (Expo React Native Web)  ─────┐
│                                                                       │
│   IssueScreen.tsx  ──── write ────┐        ┌──── read ──── ExplorerScreen.tsx
│   (Issuer Console)                │        │               (Verification Workspace)
│                                   ▼        ▼                          │
│                              contract.ts (ethers.js v6)               │
│                          provider · signer · ABI abstraction          │
└───────────────────────────────────┬───────────────────────────────────┘
                                    │
                                    ▼
                     LearnCred.sol on Ethereum Sepolia
                     ┌────────────────────────────────┐
                     │ issueCredential()   onlyOwner  │  ← educator only
                     │ getStudentCredentials()  free  │  ← anyone
                     │ getCredentialCount()     free  │  ← anyone
                     └────────────────────────────────┘
```

**Smart contract components:**

```
LearnCred.sol
├── State Variables
│   └── owner (address)
├── Structs
│   └── Credential
│       ├── courseName (string)
│       ├── skillGained (string)
│       ├── issueDate (uint256)
│       └── issuerName (string)
├── Mappings
│   └── studentCredentials (address → Credential[])
├── Events
│   └── CredentialIssued (address indexed, string, uint256)
├── Modifiers
│   └── onlyOwner
└── Functions
    ├── constructor()
    ├── issueCredential()
    ├── getStudentCredentials()
    └── getCredentialCount()
```

## Project Structure

```
LearnCred/
├── contracts/
│   └── LearnCred.sol            # Solidity smart contract
├── LearnCred-web-app/
│   ├── .env                     # Secure environment variables (never committed)
│   ├── package.json             # App dependencies
│   ├── App.tsx                  # Root application entry
│   └── src/
│       ├── components/          # Reusable UI elements
│       │   ├── CredentialCard.tsx
│       │   └── StatusBanner.tsx
│       ├── screens/             # Main application views
│       │   ├── ExplorerScreen.tsx   # Public verification panel
│       │   └── IssueScreen.tsx      # Protected admin console
│       ├── contract.ts          # ethers.js provider / signer / ABI layer
│       └── theme.ts             # Global styling constraints
└── README.md
```

## Smart Contract

- **Language:** Solidity `^0.8.0` (built-in overflow protection)
- **Network:** Ethereum **Sepolia testnet**
- **Design:** deliberately lightweight — one owner, one struct, one mapping, no external dependencies — to minimize gas during deployment and interaction

### Public interface

```solidity
// Write (owner only) — reverts for any other caller
function issueCredential(
    address _student,
    string memory _courseName,
    string memory _skillGained,
    string memory _issuerName
) public onlyOwner;

// Read (anyone, zero gas off-chain)
function getStudentCredentials(address _student) public view returns (Credential[] memory);
function getCredentialCount(address _student) public view returns (uint256);
```

Key behaviors:

- `issueCredential` stamps every record with `block.timestamp` — the issue date is supplied by the network, so credentials **cannot be backdated**.
- Every issuance emits `CredentialIssued(address indexed student, string courseName, uint256 issueDate)` for off-chain indexing and audit trails.
- `getCredentialCount` lets the frontend cheaply check whether a wallet has any records before parsing arrays (an empty wallet triggers the "Zero ledger records" UI banner).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (LTS) and npm
- [MetaMask](https://metamask.io) browser extension
- Sepolia test ETH from a public faucet (e.g., Alchemy or Infura)

### 1 · Deploy the smart contract

1. Open [Remix IDE](https://remix.ethereum.org) and create `contracts/LearnCred.sol`; paste in the contract code.
2. In the **Solidity Compiler** tab, select compiler `0.8.0`+ and compile.
3. In **Deploy & Run Transactions**, set the Environment to **Injected Provider – MetaMask** (connected to **Sepolia**).
4. Deploy from your authorized **admin wallet** and confirm the gas fee in MetaMask.
5. Copy the deployed **contract address** — you'll need it in the next step.

### 2 · Configure the environment

Create a `.env` file in `LearnCred-web-app/`:

```bash
EXPO_PUBLIC_ISSUER_KEY="0xYourAdminPrivateKey"
```

Then map your deployed address in `src/contract.ts`:

```ts
const CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
```

> The issuer key must belong to the **same wallet that deployed the contract** (the `owner`). Never commit `.env` to version control.

### 3 · Run the web app

```bash
cd LearnCred-web-app
npm install
npx expo start -c --web
```

The `-c` flag clears the Metro bundler cache, **required** whenever `.env` values change (see [Troubleshooting](#-challenges--troubleshooting)). Open the local server and you're interfacing directly with the live Sepolia network.

## Usage

### Issue a credential (admin)

1. Open the **Issuer Console** tab.
2. Input the target recipient address (`0x…`).
3. Enter the **Curriculum** (e.g., `Brainbox Pilot: Kigali`).
4. Enter the **Primary Skill** (e.g., `TypeScript Architecture`).
5. Enter the **Issuer** (e.g., `Nuwacu Outreach`).
6. Click **Execute & Sign State Update**.
7. Watch the blue pending banner transition to a green success confirmation once the block confirms.

### Verify a credential (employer)

1. Open the **Verification Workspace** tab.
2. Paste the candidate's wallet address into the search bar.
3. Click **Query Ledger**.
4. View the cryptographically verified asset card — skill, issuer, and on-chain timestamp.

## Testing

**4/4 core logic tests passing** on the Sepolia testnet:

| # | Scenario | Action | Result |
|---|---|---|---|
| 1 | Authorized issuance | Admin wallet mints `"Advanced Routing"` via `issueCredential` | ✅ Transaction succeeds, block confirms, event emitted |
| 2 | Unauthorized access (security) | Secondary/fake wallet attempts to mint | ✅ EVM instantly reverts: `"Error: Only the authorized educator can issue credentials"` |
| 3 | Retrieve records | `getStudentCredentials` on the target address | ✅ Accurately returns mapped tuple data for the frontend UI |
| 4 | Count validation | `getCredentialCount` on a fresh, unused address | ✅ Returns `0`, triggering the "Zero ledger records" UI banner |

Tests 1–2 prove the write path works for the owner *and only* the owner; tests 3–4 validate the open read path, including the empty-wallet edge case.

## Security

**Smart contract**

- **Access control:** the `onlyOwner` modifier prevents bad actors from polluting the academic ledger with fake skills.
- **EVM revert handling:** unauthorized attempts don't fail silently; they are forcefully reverted, protecting contract state.
- **Immutable timestamps:** `block.timestamp` is generated by the network, preventing issuers from backdating credentials.

**Application**

- **Environment isolation:** `EXPO_PUBLIC_ISSUER_KEY` lives only in `.env`, which is excluded from version control.
- **Automated signing:** a headless wallet (`new Wallet(ISSUER_KEY, provider)`) signs transactions in the background without exposing keys to the client UI.
- **Error boundaries:** the UI gracefully catches EVM reverts (e.g., `INSUFFICIENT_FUNDS`, unauthorized access) and surfaces readable messages.

## Challenges & Troubleshooting

Real issues hit during development, and their fixes:

| Problem | Symptom | Fix |
|---|---|---|
| **Metro `.env` caching** | The bundler aggressively caches old environment variables — stale/unauthorized keys can bypass tests | Always restart with `npx expo start -c`; confirm the `EXPO_PUBLIC_ISSUER_KEY` naming convention is referenced correctly in `contract.ts` |
| **Contract immutability vs. upgrades** | Testing `onlyOwner` against an older, unsecured deployment gives misleading results | Deployed contracts can't be patched — compile and deploy a **fresh instance** to Sepolia, then update `CONTRACT_ADDRESS` in the frontend |
| **Generic UI tropes** | Early iterations looked like templated dashboards | Rebuilt into a split-panel sidebar layout with high-contrast editorial colors and monospaced technical typography |

## Roadmap

- **Multi-signature verification:** require dual signatures (e.g., Technical Instructor + Peer Mentor) before a credential is fully minted.
- **Real-world integration:** connect the LearnCred API to the Brainbox pilot framework in Kigali to auto-issue credentials on module completion.
- **Decentralized storage (IPFS):** store rich metadata (project links, GitHub repos, portfolios) on IPFS and anchor the hash on-chain.
- **Mainnet / L2 migration:** move to Ethereum mainnet or a low-fee layer-2 to keep issuance affordable at scale.

## Mission

> Leveraging technology to dismantle generational cycles of poverty by providing underserved youth with accessible, high-impact digital learning environments that unlock previously inaccessible technical industries.

LearnCred shifts identity control from legacy institutions into the hands of students, translating self-taught excellence into accessible technical careers, regardless of socioeconomic background.

## 👤 Author

**Akhigbe Simeon** — African Leadership University
