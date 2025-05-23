import * as React from "react";
import type { CalendarType } from "~/lib/calendar";
import type { GregorianCalendarProps } from "./GregorianCalendar";
import GregorianCalendar from "./GregorianCalendar";
import type { PersianCalendarProps } from "./PersianCalendar";
import PersianCalendar from "./PersianCalendar";

export type CalendarProps = { calendarType?: CalendarType } & (
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
