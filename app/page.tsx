"use client";

import React from "react";
import { CalendarJalali } from "@/components/calendar/calendar-jalali";
import { DatePickerJalali } from "@/components/calendar/examples/single-picker-jalali";
import { RangePickerJalali } from "@/components/calendar/examples/range-picker-jalali";
import { MultiplePickerJalali } from "@/components/calendar/examples/multiple-picker-jalali";
import { Formatters } from "react-day-picker";
import { format as jalaliFormat } from "date-fns-jalali";

const jalaliFormatWeekdayName: Formatters["formatWeekdayName"] = (
  day: Date
) => {
  return jalaliFormat(day, "EEE");
};

export default function Home() {
  return (
    <div className="flex flex-col gap-12 z-10 mb-36">
      <div className="space-y-5">
        <h3>تقویم های جلالی</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DatePickerJalali />
          <RangePickerJalali />
          <MultiplePickerJalali />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
          <CalendarJalali mode="single" />
          <div className="w-[400px]">
            <CalendarJalali
              mode="single"
              formatters={{ formatWeekdayName: jalaliFormatWeekdayName }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
