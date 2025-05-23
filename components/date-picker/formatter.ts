import {
  format as GregorianFormatter,
  isEqual as GregorianIsEqual,
  parse as GregorianParser,
} from "date-fns";
import {
  parse as PerisanParser,
  format as PersianFormatter,
  isEqual as PersianIsEqual,
} from "date-fns-jalali";
import type { CalendarType } from "~/lib/calendar";
import { DEFAULT_CALENDAR_TYPE } from "~/lib/calendar";

class DateFactory {
  public static getFormatter(target: CalendarType = DEFAULT_CALENDAR_TYPE) {
    switch (target) {
      case "gregorian":
        return GregorianFormatter;
      default:
      case "persian":
        return PersianFormatter;
    }
  }

  public static getParser(target: CalendarType = DEFAULT_CALENDAR_TYPE) {
    switch (target) {
      case "gregorian":
        return GregorianParser;
      default:
      case "persian":
        return PerisanParser;
    }
  }

  public static getIsEqual(target: CalendarType = DEFAULT_CALENDAR_TYPE) {
    switch (target) {
      case "gregorian":
        return GregorianIsEqual;
      default:
      case "persian":
        return PersianIsEqual;
    }
  }
}

export default DateFactory;
export { DateFactory };
