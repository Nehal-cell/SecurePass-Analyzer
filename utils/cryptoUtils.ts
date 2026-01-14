import { PasswordHash } from '../types';

/**
 * Generates a random salt and hashes the password using SHA-256.
 * This runs entirely in the browser using the Web Crypto API.
 */
export const hashPassword = async (password: string): Promise<PasswordHash> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  
  // Generate a random 16-byte salt
  const saltBytes = window.crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(saltBytes).map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Combine password + salt (simple concatenation for demo)
  const saltData = encoder.encode(saltHex);
  const combined = new Uint8Array(data.length + saltData.length);
  combined.set(data);
  combined.set(saltData, data.length);

  // Hash using SHA-256
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', combined);
  
  // Convert buffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return {
    hash: hashHex,
    salt: saltHex
  };
};

export const formatTime = (seconds: number): string => {
  if (seconds < 1) return "Instantly";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
  return "Centuries";
};
