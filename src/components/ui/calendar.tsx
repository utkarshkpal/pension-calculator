"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

import "react-day-picker/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>(
    props.defaultMonth || new Date()
  );

  // Generate years from 1930 to current year + 50

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear + 50 - 1930 + 1 },
    (_, i) => 1930 + i
  );

  // Generate all months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Handle month change
  const handleMonthChange = (newMonth: Date) => {
    setMonth(newMonth);
    if (props.onMonthChange) {
      props.onMonthChange(newMonth);
    }
  };

  // Navigation handlers
  const goToPreviousMonth = () => {
    const previousMonth = new Date(month);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    handleMonthChange(previousMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(month);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    handleMonthChange(nextMonth);
  };

  const handleMonthSelectChange = (value: string) => {
    const newDate = new Date(month);
    newDate.setMonth(months.indexOf(value));
    handleMonthChange(newDate);
  };

  const handleYearSelectChange = (value: string) => {
    const newDate = new Date(month);
    newDate.setFullYear(parseInt(value));
    handleMonthChange(newDate);
  };

  return (
    <div className="space-y-4">
      {/* Custom navigation header */}
      <div className="flex justify-center items-center gap-2 px-1">
        <button
          onClick={goToPreviousMonth}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex-1 flex gap-2 items-center justify-center">
          <Select
            value={months[month.getMonth()]}
            onValueChange={handleMonthSelectChange}
          >
            <SelectTrigger className="h-8 min-w-[120px] text-sm font-medium">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent position="popper" className="max-h-[300px]">
              {months.map((monthName) => (
                <SelectItem
                  key={monthName}
                  value={monthName}
                  className="text-sm"
                >
                  {monthName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={month.getFullYear().toString()}
            onValueChange={handleYearSelectChange}
          >
            <SelectTrigger className="h-8 min-w-[80px] text-sm font-medium">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="max-h-[300px] overflow-y-auto"
            >
              {years.map((year) => (
                <SelectItem
                  key={year}
                  value={year.toString()}
                  className="text-sm"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          onClick={goToNextMonth}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Calendar */}
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "hidden", // Hide the entire caption
          nav: "hidden", // Hide the default navigation
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          day_button: cn(
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          ),
          day_range_end: "day-range-end",
          day_range_start: "day-range-start",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_hidden: "invisible",
          ...classNames,
        }}
        month={month}
        onMonthChange={handleMonthChange}
        {...props}
      />
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
