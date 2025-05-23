"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import type { DateRange as OriginalDateRange } from "react-day-picker";
import { Calendar } from "~/components/calendar/mod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import type { CalendarType } from "~/lib/calendar";
import { cn } from "~/lib/utils";
import DateFactory from "./formatter";

type DateRange =
  | OriginalDateRange
  | { from: string | undefined; to?: string | undefined };

const NATIVE_DATE_FORMAT = "yyyy-MM-dd";
const DEFAULT_PLACEHOLDER = "----/--/--";

export interface RangeDatePickerProps
  extends Omit<React.ComponentProps<"input">, "type" | "defaultValue"> {
  type?: CalendarType;
  defaultValue?: DateRange;
  placeholder?: string;
}

function RangeDatePicker(props: RangeDatePickerProps): React.ReactNode {
  const parse = DateFactory.getParser(props.type);
  const format = DateFactory.getFormatter(props.type);
  const isEqual = DateFactory.getIsEqual(props.type);

  const date: Date = new Date();
  const defaultValue: OriginalDateRange | undefined =
    typeof props.defaultValue !== "undefined"
      ? {
          from:
            typeof props.defaultValue.from === "string"
              ? parse(props.defaultValue.from, NATIVE_DATE_FORMAT, date)
              : props.defaultValue.from,
          to:
            typeof props.defaultValue.to === "string"
              ? parse(props.defaultValue.to, NATIVE_DATE_FORMAT, date)
              : props.defaultValue.to,
        }
      : undefined;
  const [value, setValue] = React.useState<OriginalDateRange | undefined>(
    defaultValue
  );

  function onDayBlur(_1: any, _2: any, ev: React.FocusEvent): void {
    // @ts-expect-error 'the type <Element> matches the type <HTMLInputElement>'
    props.onBlur?.(ev);
  }

  function onSelect(selected: OriginalDateRange | undefined): void {
    if (typeof selected !== "undefined") {
      props.onChange?.({
        target: {
          // @ts-expect-error 'the <name> possible undefined'
          name: props.name,
          // @ts-expect-error 'the <value> possible undefined'
          value: selected,
        },
      });
      setValue(selected);
    }
  }

  const placeholder: string =
    typeof value?.from !== "undefined" || typeof value?.to !== "undefined"
      ? isEqual(value?.from!, value?.to!)
        ? format(value?.from!, NATIVE_DATE_FORMAT)
        : `${format(value?.from!, NATIVE_DATE_FORMAT)!} - ${format(
            value?.to!,
            NATIVE_DATE_FORMAT
          )}`
      : props.placeholder ?? DEFAULT_PLACEHOLDER;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={props.disabled}
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="ms-2 h-4 w-4" />
          <span>{placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Input type="hidden" name={props.name} disabled={props.disabled} />
        <Calendar
          mode="range"
          selected={value}
          onSelect={onSelect}
          onDayBlur={onDayBlur}
          disabled={props.disabled}
          required={props.required}
          calendarType={props.type}
        />
      </PopoverContent>
    </Popover>
  );
}

export default RangeDatePicker;
export { RangeDatePicker };
