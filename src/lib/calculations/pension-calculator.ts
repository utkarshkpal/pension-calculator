import {
  COMMUTATION_FACTOR,
  COMMUTATION_PERCENTAGE,
  DA_ANNUAL_INCREASE,
  GRATUITY_FACTOR,
  INFLATION_RATE,
  MAX_GRATUITY_MONTHS,
  MAX_LEAVE_ENCASHMENT_DAYS,
  RETIREMENT_AGE,
} from "@/lib/constants";
import { CalculationResults, PromotionDetails, UserDetails } from "@/lib/types";
import { calculateAge, calculateLengthOfService } from "./age-calculator";

export function calculatePensionBenefits(
  userDetails: UserDetails,
  promotions: PromotionDetails[],
  npsSettings: {
    annuityInvestmentPercentage: number;
    annuityRoi: number;
    remainingCorpusRoi: number;
  },
  upsSettings: {
    expectedRoi: number;
  }
): CalculationResults {
  // Calculate retirement date (60 years from birth date)
  const birthDate = new Date(userDetails.dateOfBirth);
  const joinDate = new Date(userDetails.dateOfJoining);

  // Default retirement age is 60
  const retirementDate = new Date(birthDate);
  retirementDate.setFullYear(birthDate.getFullYear() + RETIREMENT_AGE);

  // If early retirement is specified, use that instead
  const earlyRetirementDate = userDetails.earlyRetirementDate
    ? new Date(userDetails.earlyRetirementDate)
    : null;

  const actualRetirementDate =
    earlyRetirementDate && earlyRetirementDate < retirementDate
      ? earlyRetirementDate
      : retirementDate;

  // Calculate length of service
  const serviceLength = calculateLengthOfService(
    joinDate,
    actualRetirementDate
  );

  // Calculate age at retirement
  const ageAtRetirement = calculateAge(birthDate);
  console.log(`Age at retirement: ${ageAtRetirement}`);

  // Calculate years until retirement
  const today = new Date();
  const yearsUntilRetirement =
    (actualRetirementDate.getTime() - today.getTime()) /
    (1000 * 60 * 60 * 24 * 365.25);

  // Calculate basic salary at retirement (considering promotions)
  let finalBasicSalary = userDetails.currentBasicSalary;

  // Sort promotions by date
  const sortedPromotions = [...promotions].sort((a, b) => {
    if (!a.promotionDate) return 1;
    if (!b.promotionDate) return -1;
    return (
      new Date(a.promotionDate).getTime() - new Date(b.promotionDate).getTime()
    );
  });

  // Apply promotions to get final basic salary
  // This is a simplified implementation - in a real app, you'd need to consider
  // the full pay matrix and increments over time
  sortedPromotions.forEach((promotion) => {
    if (
      promotion.payLevelAfterPromotion &&
      promotion.payLevelAfterPromotion > userDetails.currentPayLevel
    ) {
      // Simple approximation - in reality would need to look up in pay matrix
      finalBasicSalary = finalBasicSalary * 1.15; // Assume 15% increase per promotion
    }
  });

  // Calculate DA at retirement (simplified - assuming 5% annual increase)
  const currentDA = userDetails.currentDA;
  const daAtRetirement =
    currentDA * Math.pow(1 + DA_ANNUAL_INCREASE, yearsUntilRetirement);

  // Calculate NPS corpus
  const monthlyNpsContribution = finalBasicSalary * 0.1; // 10% of basic
  const employerContribution = monthlyNpsContribution; // Matching contribution
  const totalMonthlyContribution =
    monthlyNpsContribution + employerContribution;

  // Calculate NPS corpus at retirement
  const roi = userDetails.expectedRateOfReturn / 100;
  let npsCorpus = userDetails.npsCorpusTillDate;

  // Simple compound interest calculation for NPS corpus
  npsCorpus = npsCorpus * Math.pow(1 + roi, yearsUntilRetirement);

  // Add future contributions
  const futureContributions =
    totalMonthlyContribution *
    12 *
    ((Math.pow(1 + roi, yearsUntilRetirement) - 1) / roi);

  npsCorpus += futureContributions;

  // Calculate NPS results
  const corpusInvestedInAnnuity =
    npsCorpus * (npsSettings.annuityInvestmentPercentage / 100);
  const corpusWithdrawn = npsCorpus - corpusInvestedInAnnuity;

  // Monthly pension from annuity (simplified calculation)
  const annuityRoi = npsSettings.annuityRoi / 100;
  const monthlyPension = corpusInvestedInAnnuity * (annuityRoi / 12);

  // Monthly returns from withdrawn corpus
  const remainingCorpusRoi = npsSettings.remainingCorpusRoi / 100;
  const monthlyReturnsFromWithdrawnCorpus =
    corpusWithdrawn * (remainingCorpusRoi / 12);

  // Calculate corpus at age 65
  const yearsFrom60To65 = 5;
  const corpusAtAge65 =
    corpusWithdrawn * Math.pow(1 + remainingCorpusRoi, yearsFrom60To65);

  // Calculate corpus in today's terms (accounting for inflation)
  const corpusInTodaysTerms =
    npsCorpus / Math.pow(1 + INFLATION_RATE, yearsUntilRetirement);

  // Calculate UPS results
  // UPS pension is 50% of last drawn salary if service >= 25 years, else proportionate
  const pensionPercentage =
    serviceLength >= 25 ? 0.5 : (serviceLength / 25) * 0.5;
  const lastSalary =
    finalBasicSalary + (finalBasicSalary * daAtRetirement) / 100;
  const upsPension = finalBasicSalary * pensionPercentage;

  // Calculate UPS lumpsum (simplified)
  // Gratuity: 16.5 days salary for each year of service, max 20 months
  const gratuityDays = Math.min(
    serviceLength * GRATUITY_FACTOR,
    MAX_GRATUITY_MONTHS * 30
  );
  const dailySalary = finalBasicSalary / 30;
  const gratuityAmount = gratuityDays * dailySalary;

  // Commutation: 40% of pension can be commuted
  const commutationAmount =
    upsPension * (COMMUTATION_PERCENTAGE / 100) * COMMUTATION_FACTOR * 12;

  // Leave encashment: 300 days max
  const leaveEncashmentAmount = MAX_LEAVE_ENCASHMENT_DAYS * dailySalary;

  const totalLumpsumAmount =
    gratuityAmount + commutationAmount + leaveEncashmentAmount;

  // Monthly return on lumpsum investment
  const upsRoi = upsSettings.expectedRoi / 100;
  const monthlyReturnOnLumpsum = totalLumpsumAmount * (upsRoi / 12);

  // Calculate individual and benchmark UPS corpus
  // This is a simplified calculation
  const individualUpsCorpus = monthlyNpsContribution * 12 * serviceLength;
  const benchmarkUpsCorpus = individualUpsCorpus * 2; // Including employer contribution

  return {
    nps: {
      corpusAtRetirement: npsCorpus,
      corpusInTodaysTerms,
      corpusAtAge65,
      corpusInvestedInAnnuity,
      corpusWithdrawn,
      monthlyPension,
      monthlyReturnsFromWithdrawnCorpus,
      totalMonthlyIncome: monthlyPension + monthlyReturnsFromWithdrawnCorpus,
    },
    ups: {
      lumpsumAmount: gratuityAmount + leaveEncashmentAmount,
      lastSalary,
      basicSalaryAtRetirement: finalBasicSalary,
      daAtRetirement,
      monthlyPension: upsPension * (1 - COMMUTATION_PERCENTAGE / 100), // After commutation
      individualUpsCorpus,
      benchmarkUpsCorpus,
      additionalAmount: null, // Would be calculated based on specific rules
      totalLumpsumAmount,
      monthlyReturnOnLumpsum,
      totalMonthlyIncome:
        upsPension * (1 - COMMUTATION_PERCENTAGE / 100) +
        monthlyReturnOnLumpsum,
    },
  };
}

/**
 * Utility function to load pay matrix data from CSV
 * This would be used to load future pay matrices
 */
export function loadPayMatrixFromCsv(
  csvData: string
): Record<number, number[]> {
  const payMatrix: Record<number, number[]> = {};

  // Simple CSV parsing - in a real app, you'd use a CSV parsing library
  const rows = csvData.trim().split("\n");

  for (let i = 1; i < rows.length; i++) {
    // Skip header row
    const columns = rows[i].split(",");
    const level = parseInt(columns[0]);
    const salaries = columns
      .slice(1)
      .map((s) => parseInt(s.trim()))
      .filter((s) => !isNaN(s));

    if (!isNaN(level) && salaries.length > 0) {
      payMatrix[level] = salaries;
    }
  }

  return payMatrix;
}
