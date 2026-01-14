import { AnalysisResult, StrengthCategory } from '../types';
import { COMMON_PASSWORDS, CRACK_SPEED_PER_SECOND } from '../constants';
import { formatTime } from './cryptoUtils';

export const calculateEntropy = (password: string): number => {
  const len = password.length;
  if (len === 0) return 0;

  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  if (poolSize === 0) return 0;

  // H = L * log2(R)
  const entropy = len * Math.log2(poolSize);
  return Number(entropy.toFixed(2));
};

export const analyzePassword = (password: string): AnalysisResult => {
  const len = password.length;
  const isCommon = COMMON_PASSWORDS.has(password.toLowerCase());
  
  // Character Counts
  const counts = {
    upper: (password.match(/[A-Z]/g) || []).length,
    lower: (password.match(/[a-z]/g) || []).length,
    digits: (password.match(/[0-9]/g) || []).length,
    special: (password.match(/[^a-zA-Z0-9]/g) || []).length,
  };

  // Base Scoring
  let score = 0;
  const recommendations: string[] = [];

  // Length points
  score += len * 4;
  if (len < 8) recommendations.push("Increase length to at least 8 characters.");
  if (len > 16) score += 10;

  // Variety points
  if (counts.upper > 0) score += 5; else recommendations.push("Add uppercase letters.");
  if (counts.lower > 0) score += 5; else recommendations.push("Add lowercase letters.");
  if (counts.digits > 0) score += 5; else recommendations.push("Add numbers.");
  if (counts.special > 0) score += 5; else recommendations.push("Add special characters (e.g., !@#$).");

  // Diversity bonus
  const varietyCount = [counts.upper, counts.lower, counts.digits, counts.special].filter(c => c > 0).length;
  if (varietyCount >= 3) score += 10;
  if (varietyCount === 4) score += 10;

  // Penalties
  // Sequential patterns (simplified check)
  if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(password)) {
    score -= 15;
    recommendations.push("Avoid alphabet sequences like 'abc'.");
  }
  if (/(123|234|345|456|567|678|789|890|012)/.test(password)) {
    score -= 15;
    recommendations.push("Avoid number sequences like '123'.");
  }
  // Repeated characters (3 or more)
  if (/(.)\1\1/.test(password)) {
    score -= 10;
    recommendations.push("Avoid repeating characters like 'aaa'.");
  }

  // Common password cap
  if (isCommon) {
    score = Math.min(score, 20); // Cap at 20
    recommendations.unshift("CRITICAL: This is a very common password.");
  }

  // Final Clamping
  score = Math.max(0, Math.min(100, score));

  // Categorization
  let category: StrengthCategory = 'Weak';
  if (score > 80) category = 'Very Strong';
  else if (score > 60) category = 'Strong';
  else if (score > 40) category = 'Moderate';

  // Entropy & Crack Time
  const entropy = calculateEntropy(password);
  const possibleCombinations = Math.pow(2, entropy);
  const crackSeconds = possibleCombinations / CRACK_SPEED_PER_SECOND;

  return {
    score,
    category,
    entropy,
    crackTime: formatTime(crackSeconds),
    recommendations,
    charCounts: counts,
    isCommon
  };
};
