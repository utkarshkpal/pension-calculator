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
import { formSchema, FormSchema } from "@/lib/schemas/calculator-schema";
import { CalculationResults, PromotionDetails, UserDetails } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BasicDetailsForm } from "./basic-details-form";
import { NPSResults } from "./nps-results";
import { PromotionDetailsForm } from "./promotion-details-form";
import { UPSResults } from "./ups-results";

export function CalculatorForm() {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [activeTab, setActiveTab] = useState("basic-details");

  const form = useForm<FormSchema>({
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

  function onSubmit(values: FormSchema) {
    // Ensure name has a default value if undefined
    const userDetails: UserDetails = {
      ...values.basicDetails,
      name: values.basicDetails.name || "Anonymous User",
    };

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
