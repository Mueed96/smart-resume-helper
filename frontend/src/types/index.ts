export interface ScoreBreakdown {
  name: string;
  score: number;
  maxScore: number;
}

export interface ResumeAnalysis {
  id: string;
  filename: string;
  score: number;
  suggestions: string[];
  parsedText: string;
  scoreBreakdown: ScoreBreakdown[];
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  description: string;
  matchingSkills: string[];
  matchPercentage: number;
  url: string; // --- ADDED: The new URL field ---
}