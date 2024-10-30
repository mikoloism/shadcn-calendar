"use client";
import React from "react";
import { DatePickerJalali } from "@/components/ui/date-picker-jalali";
import { RangePickerJalali } from "@/components/ui/range-picker-jalali";
import { MultiplePickerJalali } from "@/components/ui/multiple-picker-jalali";
import { CalendarJalali } from "@/components/ui/calendar-jalali";
import { Calendar } from "@/components/ui/calendar";
import { Formatters } from "react-day-picker";
import { format as jalaliFormat } from "date-fns-jalali";
import { format } from "date-fns";

const jalaliFormatWeekdayName: Formatters["formatWeekdayName"] = (
  day: Date
) => {
  return jalaliFormat(day, "EEE");
};

const formatWeekdayName: Formatters["formatWeekdayName"] = (day: Date) => {
  return format(day, "EEE");
};

export default function Home() {
  return (
    <div className="flex justify-center flex-col gap-5 items-center z-10 mb-36">
      <h2>App</h2>

      <DatePickerJalali />
      <br />
      <RangePickerJalali />
      <br />
      <MultiplePickerJalali />
      <br />
      <CalendarJalali mode="single" />
      <div className="w-[400px]">
        <CalendarJalali
          mode="single"
          formatters={{ formatWeekdayName: jalaliFormatWeekdayName }}
        />
      </div>
      <br />
      <Calendar mode="single" />
      <br />
      <div className="w-[400px]">
        <Calendar
          mode="single"
          formatters={{ formatWeekdayName: formatWeekdayName }}
        />
      </div>
    </div>
  );
}
