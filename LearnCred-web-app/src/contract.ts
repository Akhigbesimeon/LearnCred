import { Contract, JsonRpcProvider, Wallet, isAddress } from 'ethers';

// Sepolia address
export const CONTRACT_ADDRESS = '0x04d8c8eC082487e1c3e84A5dD5a99Eb0603b7539';

const RPC_URL = 'https://ethereum-sepolia-rpc.publicnode.com';

const ISSUER_KEY = process.env.EXPO_PUBLIC_ISSUER_KEY ?? '';

// Functions
const ABI = [
  'function issueCredential(address _student, string _courseName, string _skillGained, string _issuerName) public',
  'function getStudentCredentials(address _student) public view returns (tuple(string courseName, string skillGained, uint256 issueDate, string issuerName)[])',
];

export interface Credential {
  courseName: string;
  skillGained: string;
  issueDate: bigint;
  issuerName: string;
}

// Provider
const provider = new JsonRpcProvider(RPC_URL);
const reader = new Contract(CONTRACT_ADDRESS, ABI, provider);

export async function fetchCredentials(student: string): Promise<Credential[]> {
  const rows = await reader.getStudentCredentials(student);
  return rows.map((row: any) => ({
    courseName: row.courseName,
    skillGained: row.skillGained,
    issueDate: row.issueDate,
    issuerName: row.issuerName,
  }));
}

export async function issueCredential(
  student: string,
  courseName: string,
  skillGained: string,
  issuerName: string,
) {
  if (!ISSUER_KEY) {
    throw new Error('EXPO_PUBLIC_ISSUER_KEY is not set — see .env.example');
  }
  const signer = new Wallet(ISSUER_KEY, provider);
  const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);
  const tx = await contract.issueCredential(student, courseName, skillGained, issuerName);
  return tx.wait();
}

export function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export { isAddress };
