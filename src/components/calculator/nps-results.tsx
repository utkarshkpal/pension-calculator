"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/calculations/age-calculator";
import { NPSResults as NPSResultsType } from "@/lib/types";
import { useState } from "react";

interface NPSResultsProps {
  results: NPSResultsType;
  npsSettings: {
    annuityInvestmentPercentage: number;
    annuityRoi: number;
    remainingCorpusRoi: number;
  };
  onSettingsChange: (settings: {
    annuityInvestmentPercentage: number;
    annuityRoi: number;
    remainingCorpusRoi: number;
  }) => void;
}

export function NPSResults({
  results,
  npsSettings,
  onSettingsChange,
}: NPSResultsProps) {
  const [localSettings, setLocalSettings] = useState(npsSettings);

  const handleSettingChange = (
    key: keyof typeof localSettings,
    value: number
  ) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <Card>
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-xl text-primary">
          New Pension Scheme (NPS)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between">
            <span className="font-medium">NPS Corpus at Retirement:</span>
            <span className="font-semibold">
              ₹{formatCurrency(results.corpusAtRetirement)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Value in Today&apos;s Terms:</span>
            <span className="font-semibold">
              ₹{formatCurrency(results.corpusInTodaysTerms)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Corpus at Age 65:</span>
            <span className="font-semibold">
              ₹{formatCurrency(results.corpusAtAge65)}
            </span>
          </div>

          <div className="border-t pt-4">
            <Label className="mb-2 block">
              Percentage to Invest in Annuity (40-100%):&nbsp;
              {localSettings.annuityInvestmentPercentage}%
            </Label>
            <Slider
              value={[localSettings.annuityInvestmentPercentage]}
              min={40}
              max={100}
              step={1}
              onValueChange={(value) =>
                handleSettingChange("annuityInvestmentPercentage", value[0])
              }
              className="mb-4"
            />
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Corpus Invested in Annuity:</span>
            <span className="font-semibold">
              ₹{formatCurrency(results.corpusInvestedInAnnuity)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Corpus Withdrawn:</span>
            <span className="font-semibold">
              ₹{formatCurrency(results.corpusWithdrawn)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <Label htmlFor="annuityRoi">Annuity ROI (%)</Label>
              <Input
                id="annuityRoi"
                type="number"
                value={localSettings.annuityRoi}
                onChange={(e) =>
                  handleSettingChange(
                    "annuityRoi",
                    parseFloat(e.target.value) || 6.0
                  )
                }
                step={0.1}
                min={0}
                max={20}
              />
            </div>

            <div>
              <Label htmlFor="remainingCorpusRoi">
                Other Investment ROI (%)
              </Label>
              <Input
                id="remainingCorpusRoi"
                type="number"
                value={localSettings.remainingCorpusRoi}
                onChange={(e) =>
                  handleSettingChange(
                    "remainingCorpusRoi",
                    parseFloat(e.target.value) || 9.0
                  )
                }
                step={0.1}
                min={0}
                max={20}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Monthly Pension:</span>
            <span className="font-semibold">
              ₹{formatCurrency(results.monthlyPension)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">
              Monthly Returns from Withdrawn Corpus:
            </span>
            <span className="font-semibold">
              ₹{formatCurrency(results.monthlyReturnsFromWithdrawnCorpus)}
            </span>
          </div>

          <div className="flex justify-between border-t pt-4">
            <span className="font-medium text-lg">Total Monthly Income:</span>
            <span className="font-semibold text-lg text-primary">
              ₹{formatCurrency(results.totalMonthlyIncome)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
