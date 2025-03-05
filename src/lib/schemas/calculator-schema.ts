import { z } from "zod";

export const formSchema = z.object({
  basicDetails: z.object({
    name: z.string().optional(),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    dateOfJoining: z.string().min(1, "Date of joining is required"),
    currentPayLevel: z.coerce.number().min(1, "Pay level is required"),
    currentBasicSalary: z.coerce.number().min(1, "Basic salary is required"),
    npsCorpusTillDate: z.coerce.number().default(0),
    expectedRateOfReturn: z.coerce.number().default(8.5),
    currentDA: z.coerce.number().default(55.0),
    earlyRetirementDate: z.string().optional(),
  }),
  promotionDetails: z.object({
    firstPromotion: z.object({
      promotionDate: z.string().optional(),
      payLevelAfterPromotion: z.coerce.number().optional(),
    }),
    secondPromotion: z.object({
      promotionDate: z.string().optional(),
      payLevelAfterPromotion: z.coerce.number().optional(),
    }),
    thirdPromotion: z.object({
      promotionDate: z.string().optional(),
      payLevelAfterPromotion: z.coerce.number().optional(),
    }),
    fourthPromotion: z.object({
      promotionDate: z.string().optional(),
      payLevelAfterPromotion: z.coerce.number().optional(),
    }),
  }),
  npsSettings: z.object({
    annuityInvestmentPercentage: z.coerce.number().min(40).max(100).default(40),
    annuityRoi: z.coerce.number().default(6.0),
    remainingCorpusRoi: z.coerce.number().default(9.0),
  }),
  upsSettings: z.object({
    expectedRoi: z.coerce.number().default(9.0),
  }),
});

export type FormSchema = z.infer<typeof formSchema>;
