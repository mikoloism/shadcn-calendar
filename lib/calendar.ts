import { Formatters } from "react-day-picker";
import { format as jalaliFormat } from "date-fns-jalali";
import { format } from "date-fns";

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