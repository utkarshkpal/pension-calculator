"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculatePensionBenefits } from "@/lib/calculations/pension-calculator";
import { CalculationResults, PromotionDetails, UserDetails } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BasicDetailsForm } from "./basic-details-form";
import { NPSResults } from "./nps-results";
import { PromotionDetailsForm } from "./promotion-details-form";
import { UPSResults } from "./ups-results";

const formSchema = z.object({
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

export function CalculatorForm() {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [activeTab, setActiveTab] = useState("basic-details");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basicDetails: {
        expectedRateOfReturn: 8.5,
        currentDA: 55.0,
        npsCorpusTillDate: 0,
      },
      npsSettings: {
        annuityInvestmentPercentage: 40,
        annuityRoi: 6.0,
        remainingCorpusRoi: 9.0,
      },
      upsSettings: {
        expectedRoi: 9.0,
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const userDetails: UserDetails = values.basicDetails;

    const promotions: PromotionDetails[] = [
      values.promotionDetails.firstPromotion,
      values.promotionDetails.secondPromotion,
      values.promotionDetails.thirdPromotion,
      values.promotionDetails.fourthPromotion,
    ].filter((p) => p.promotionDate && p.payLevelAfterPromotion);

    const calculationResults = calculatePensionBenefits(
      userDetails,
      promotions,
      values.npsSettings,
      values.upsSettings
    );

    setResults(calculationResults);
    setActiveTab("results");
  }

  function resetForm() {
    form.reset();
    setResults(null);
    setActiveTab("basic-details");
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Pension Scheme Calculator
        </CardTitle>
        <CardDescription className="text-center">
          Compare benefits between New Pension Scheme (NPS) and Unified Pension
          Scheme (UPS)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic-details">Basic Details</TabsTrigger>
                <TabsTrigger value="promotion-details">
                  Promotion Details
                </TabsTrigger>
                <TabsTrigger value="results" disabled={!results}>
                  Results
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic-details">
                <BasicDetailsForm form={form} />
                <div className="flex justify-end mt-4 space-x-2">
                  <Button
                    type="button"
                    onClick={() => setActiveTab("promotion-details")}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="promotion-details">
                <PromotionDetailsForm form={form} />
                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("basic-details")}
                  >
                    Back
                  </Button>
                  <div className="space-x-2">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Reset
                    </Button>
                    <Button type="submit">Calculate</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="results">
                {results && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <NPSResults
                      results={results.nps}
                      npsSettings={form.watch("npsSettings")}
                      onSettingsChange={(settings) => {
                        form.setValue("npsSettings", settings);
                        // Recalculate with new settings
                        onSubmit(form.getValues());
                      }}
                    />
                    <UPSResults
                      results={results.ups}
                      upsSettings={form.watch("upsSettings")}
                      onSettingsChange={(settings) => {
                        form.setValue("upsSettings", settings);
                        // Recalculate with new settings
                        onSubmit(form.getValues());
                      }}
                    />
                  </div>
                )}
                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("promotion-details")}
                  >
                    Back
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Reset
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
