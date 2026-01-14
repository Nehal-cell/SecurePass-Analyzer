export type StrengthCategory = 'Weak' | 'Moderate' | 'Strong' | 'Very Strong';

export interface AnalysisResult {
  score: number; // 0-100
  category: StrengthCategory;
  entropy: number;
  crackTime: string;
  recommendations: string[];
  charCounts: {
    upper: number;
    lower: number;
    digits: number;
    special: number;
  };
  isCommon: boolean;
}

export interface PasswordHash {
  hash: string;
  salt: string;
}
