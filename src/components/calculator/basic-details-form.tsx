"use client";

import { DatePicker } from "@/components/ui/date-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAY_LEVELS, getBasicPayOptions } from "@/lib/constants";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

interface BasicDetailsFormProps {
  form: UseFormReturn<any>;
}

export function BasicDetailsForm({ form }: BasicDetailsFormProps) {
  const payLevel = form.watch("basicDetails.currentPayLevel");

  // Update basic pay options when pay level changes
  useEffect(() => {
    if (payLevel) {
      const basicPayOptions = getBasicPayOptions(payLevel);
      if (
        basicPayOptions.length > 0 &&
        !basicPayOptions.includes(
          form.getValues("basicDetails.currentBasicSalary")
        )
      ) {
        form.setValue("basicDetails.currentBasicSalary", basicPayOptions[0]);
      }
    }
  }, [payLevel, form]);

  return (
    <div className="space-y-4">
      <div className="text-xl font-semibold text-primary">Basic Details</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="basicDetails.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="basicDetails.dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth*</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) =>
                    field.onChange(date?.toISOString().split("T")[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="basicDetails.dateOfJoining"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Joining*</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) =>
                    field.onChange(date?.toISOString().split("T")[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="basicDetails.currentPayLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Pay Level*</FormLabel>
              <Select
                value={field.value?.toString()}
                onValueChange={(value) => field.onChange(parseInt(value))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pay level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PAY_LEVELS.map((level) => (
                    <SelectItem key={level} value={level.toString()}>
                      Level {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="basicDetails.currentBasicSalary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Basic Salary*</FormLabel>
              <Select
                value={field.value?.toString()}
                onValueChange={(value) => field.onChange(parseInt(value))}
                disabled={!payLevel}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select basic salary" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getBasicPayOptions(payLevel).map((salary) => (
                    <SelectItem key={salary} value={salary.toString()}>
                      ₹{salary.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="basicDetails.npsCorpusTillDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NPS Corpus Till Date</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="basicDetails.expectedRateOfReturn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Rate of Annual Returns (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="8.5"
                  step="0.1"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.valueAsNumber || 8.5)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="basicDetails.currentDA"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Dearness Allowance (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="55.0"
                  step="0.1"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.valueAsNumber || 55.0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="basicDetails.earlyRetirementDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Early Retirement Date (if applicable)</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) =>
                    field.onChange(date?.toISOString().split("T")[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="text-sm text-muted-foreground mt-4">
        <p>Note: Fields marked with * are mandatory</p>
        <p className="text-red-500 mt-2">
          Note: If length of service ≥ 25 years, then there will be full
          pension, else proportionate pension under UPS
        </p>
      </div>
    </div>
  );
}
