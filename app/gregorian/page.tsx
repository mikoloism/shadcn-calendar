"use client";

import React from "react";
import { CalendarGregorian } from "@/components/calendar/calendar-gregorian";
import { gregorianFormatWeekdayName } from "@/lib/calendar";
import { DropdownPickerGregorian } from "@/components/calendar/examples/dropdown-picker-gregorian";
import { BookedPickerGregorian } from "@/components/calendar/examples/booked-picker-gregorian";

export default function GregorianCalendarPage() {
  return (
    <div className="flex flex-col gap-12 z-10 mb-36" dir="ltr" lang="en">
      <div className="space-y-5">
        <h3>Gregorian Calendar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
          <CalendarGregorian mode="single" />
          <div className="w-[400px]">
            <CalendarGregorian
              mode="single"
              formatters={{ formatWeekdayName: gregorianFormatWeekdayName }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <h3>Advanced Calenders</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DropdownPickerGregorian />
          <BookedPickerGregorian />
        </div>
      </div>
    </div>
  );
}
