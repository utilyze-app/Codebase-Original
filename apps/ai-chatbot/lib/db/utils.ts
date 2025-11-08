// TypeScript environments without @types/node may complain about the 'crypto' module.
// Use a ts-ignore here to keep this file self-contained and dependency-free.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Allow import of built-in 'crypto' without type declarations
import { randomBytes, scryptSync } from 'crypto';

// Derive a password hash using scrypt. Returns a string in the format: salt:derivedKey
export function generateHashedPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

// Generate a random dummy password and return its hashed form.
export function generateDummyPassword(): string {
  // 12 bytes -> 24 hex chars, suitable as a random password token for testing
  const password = randomBytes(12).toString('hex');
  const hashedPassword = generateHashedPassword(password);
  return hashedPassword;
}
