"use client";

import { DatePicker } from "@/components/ui/date-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAY_LEVELS } from "@/lib/constants";
import { FormSchema } from "@/lib/schemas/calculator-schema";
import { UseFormReturn } from "react-hook-form";

interface PromotionDetailsFormProps {
  form: UseFormReturn<FormSchema>;
}

export function PromotionDetailsForm({ form }: PromotionDetailsFormProps) {
  const currentPayLevel = form.watch("basicDetails.currentPayLevel");

  return (
    <div className="space-y-4">
      <div className="text-xl font-semibold text-primary">
        Promotion Details
      </div>
      <p className="text-sm text-muted-foreground">
        Add details of expected promotions during your service period. This will
        help calculate a more accurate pension estimate.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="promotionDetails.firstPromotion.promotionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Promotion Date</FormLabel>
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
          name="promotionDetails.firstPromotion.payLevelAfterPromotion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pay Level After First Promotion</FormLabel>
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
                  {PAY_LEVELS.filter(
                    (level) => level > (currentPayLevel || 0)
                  ).map((level) => (
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
          name="promotionDetails.secondPromotion.promotionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Second Promotion Date</FormLabel>
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
          name="promotionDetails.secondPromotion.payLevelAfterPromotion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pay Level After Second Promotion</FormLabel>
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
                  {PAY_LEVELS.filter(
                    (level) =>
                      level >
                      (form.watch(
                        "promotionDetails.firstPromotion.payLevelAfterPromotion"
                      ) ||
                        currentPayLevel ||
                        0)
                  ).map((level) => (
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
          name="promotionDetails.thirdPromotion.promotionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Third Promotion Date</FormLabel>
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
          name="promotionDetails.thirdPromotion.payLevelAfterPromotion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pay Level After Third Promotion</FormLabel>
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
                  {PAY_LEVELS.filter(
                    (level) =>
                      level >
                      (form.watch(
                        "promotionDetails.secondPromotion.payLevelAfterPromotion"
                      ) ||
                        form.watch(
                          "promotionDetails.firstPromotion.payLevelAfterPromotion"
                        ) ||
                        currentPayLevel ||
                        0)
                  ).map((level) => (
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
          name="promotionDetails.fourthPromotion.promotionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fourth Promotion Date</FormLabel>
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
          name="promotionDetails.fourthPromotion.payLevelAfterPromotion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pay Level After Fourth Promotion</FormLabel>
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
                  {PAY_LEVELS.filter(
                    (level) =>
                      level >
                      (form.watch(
                        "promotionDetails.thirdPromotion.payLevelAfterPromotion"
                      ) ||
                        form.watch(
                          "promotionDetails.secondPromotion.payLevelAfterPromotion"
                        ) ||
                        form.watch(
                          "promotionDetails.firstPromotion.payLevelAfterPromotion"
                        ) ||
                        currentPayLevel ||
                        0)
                  ).map((level) => (
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
      </div>
    </div>
  );
}
