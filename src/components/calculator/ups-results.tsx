"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/calculations/age-calculator";
import { UPSResults as UPSResultsType } from "@/lib/types";
import { useState } from "react";

interface UPSResultsProps {
  results: UPSResultsType;
  upsSettings: {
    expectedRoi: number;
  };
  onSettingsChange: (settings: {
    expectedRoi: number;
  }) => void;
}

export function UPSResults({
  results,
  upsSettings,
  onSettingsChange,
}: UPSResultsProps) {
  const [localSettings, setLocalSettings] = useState(upsSettings);

  const handleSettingChange = (value: number) => {
    const newSettings = { ...localSettings, expectedRoi: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <Card>
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-xl text-primary">
          Unified Pension Scheme (UPS)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between">
            <span className="font-medium">Last Drawn Salary:</span>
            <span className="font-semibold">
              ₹{formatCurrency(results.lastSalary)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Basic Salary at Retirement:</span>
            <span className="font-semibold">
              ₹{formatCurrency(results.basicSalaryAtRetirement)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">DA at Retirement:</span>
            <span className="font-semibold">{results.daAtRetirement.toFixed(2)}%</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Monthly Pension:</span>
            <span className="font-semibold">
              ₹{formatCurrency(results.monthlyPension)}
            </span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between">
              <span className="font-medium">Lumpsum Amount:</span>
              <span className="font-semibold">
                ₹{formatCurrency(results.lumpsumAmount)}
              </span>
            </div>

            <div className="flex justify-between mt-2">
              <span className="font-medium">Total Lumpsum Amount:</span>
              <span className="font-semibold">
                ₹{formatCurrency(results.totalLumpsumAmount)}
              </span>
            </div>
          </div>

          <div className="mt-2">
            <Label htmlFor="expectedRoi">Investment ROI (%)</Label>
            <Input
              id="expectedRoi"
              type="number"
              value={localSettings.expectedRoi}
              onChange={(e) =>
                handleSettingChange(parseFloat(e.target.value) || 9.0)
              }
              step={0.1}
              min={0}
              max={20}
            />
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Monthly Return on Lumpsum:</span>
            <span className="font-semibold">
              ₹{formatCurrency(results.monthlyReturnOnLumpsum)}
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