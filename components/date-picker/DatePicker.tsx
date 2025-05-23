import type { MultipleDatePickerProps } from "./MultipleDatePicker";
import { MultipleDatePicker } from "./MultipleDatePicker";
import type { RangeDatePickerProps } from "./RangeDatePicker";
import { RangeDatePicker } from "./RangeDatePicker";
import type { SingleDatePickerProps } from "./SingleDatePicker";
import { SingleDatePicker } from "./SingleDatePicker";

export type DatePickerProps = { mode?: "single" | "multiple" | "range" } & (
  | MultipleDatePickerProps
  | RangeDatePickerProps
  | SingleDatePickerProps
);

function DatePicker({ mode, ...props }: DatePickerProps): React.ReactNode {
  switch (mode) {
    case "multiple":
      return <MultipleDatePicker {...(props as MultipleDatePickerProps)} />;
    case "range":
      return <RangeDatePicker {...(props as RangeDatePickerProps)} />;
    case "single":
    default:
      return <SingleDatePicker {...(props as SingleDatePickerProps)} />;
  }
}

export default DatePicker;
export { DatePicker };
