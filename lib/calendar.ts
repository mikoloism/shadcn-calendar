import { format } from "date-fns";
import { format as jalaliFormat } from "date-fns-jalali";
import type { Formatters } from "react-day-picker";

export const jalaliFormatWeekdayName: Formatters["formatWeekdayName"] = (
  day: Date
) => {
  return jalaliFormat(day, "EEE");
};

export const gregorianFormatWeekdayName: Formatters["formatWeekdayName"] = (
  day: Date
) => {
  return format(day, "EEE");
};

export function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** @internal */
export type CalendarType = "gregorian" | "persian";

/** @internal */
export const DEFAULT_CALENDAR_TYPE: CalendarType = "persian";
