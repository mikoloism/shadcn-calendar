import { format as GregorianFormatter } from "date-fns";
import { format as PersianFormatter } from "date-fns-jalali";

function selectDateFormatter(calendarType: "persian" | "gregorian" = "persian") {
  switch (calendarType) {
    case "gregorian":
      return GregorianFormatter;
    case "persian":
    default:
      return PersianFormatter;
  }
}

export default selectDateFormatter;
export { selectDateFormatter };