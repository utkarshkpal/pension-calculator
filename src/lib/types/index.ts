export interface UserDetails {
  name: string;
  dateOfBirth: string;
  dateOfJoining: string;
  currentPayLevel: number;
  currentBasicSalary: number;
  npsCorpusTillDate: number;
  expectedRateOfReturn: number;
  currentDA: number;
  earlyRetirementDate?: string;
}

export interface PromotionDetails {
  promotionDate?: string;
  payLevelAfterPromotion?: number;
}

export interface NPSResults {
  corpusAtRetirement: number;
  corpusInTodaysTerms: number;
  corpusAtAge65: number;
  corpusInvestedInAnnuity: number;
  corpusWithdrawn: number;
  monthlyPension: number;
  monthlyReturnsFromWithdrawnCorpus: number;
  totalMonthlyIncome: number;
}

export interface UPSResults {
  lumpsumAmount: number;
  lastSalary: number;
  basicSalaryAtRetirement: number;
  daAtRetirement: number;
  monthlyPension: number;
  individualUpsCorpus: number;
  benchmarkUpsCorpus: number;
  additionalAmount: number | null;
  totalLumpsumAmount: number;
  monthlyReturnOnLumpsum: number;
  totalMonthlyIncome: number;
}

export interface CalculationResults {
  nps: NPSResults;
  ups: UPSResults;
}
