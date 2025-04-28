import React from "react";
import GregorianCalendar, { type GregorianCalendarProps } from "./GregorianCalendar";
import PersianCalendar, { type PersianCalendarProps } from "./PersianCalendar";

export type CalendarProps = { calendarType?: "persian" | "gregorian" } & (
  | GregorianCalendarProps
  | PersianCalendarProps
);

function Calendar(props: CalendarProps): React.ReactNode {
  switch (props.calendarType) {
    case "gregorian":
      return <GregorianCalendar {...(props as GregorianCalendarProps)} />;
    case "persian":
    default:
      return <PersianCalendar {...(props as PersianCalendarProps)} />;
  }
}

export default Calendar;
export { Calendar };
