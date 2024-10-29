"use client";
import React from "react";
import { CalendarJalali } from "@/components/ui/calendar-jalali";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  console.log({ selectedDate: date });

  return (
    <div className="flex justify-center flex-col gap-5 items-center z-10">
      <h2>App</h2>
      <CalendarJalali mode="single" selected={date} onSelect={setDate} />
    </div>
  );
}
