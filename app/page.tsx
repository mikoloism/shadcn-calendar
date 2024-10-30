"use client";
import React from "react";
import { DatePickerJalali } from "@/components/ui/date-picker-jalali";
import { RangePickerJalali } from "@/components/ui/range-picker-jalali";
import { MultiplePickerJalali } from "@/components/ui/multiple-picker-jalali";
import { CalendarJalali } from "@/components/ui/calendar-jalali";
import { Calendar } from "@/components/ui/calendar";

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
      <br />
      <Calendar mode="single" />
    </div>
  );
}
