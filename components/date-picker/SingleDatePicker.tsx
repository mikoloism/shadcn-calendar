"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { Calendar } from "~/components/calendar/mod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import DateFactory, { type CalendarType } from "./formatter";

const NATIVE_DATE_FORMAT = "yyyy-MM-dd";
const DEFAULT_PLACEHOLDER = "----/--/--";

export interface SingleDatePickerProps
  extends Omit<React.ComponentProps<"input">, "type" | "defaultValue"> {
  type?: CalendarType;
  defaultValue?: Date | string;
  placeholder?: string;
}

function SingleDatePicker(props: SingleDatePickerProps): React.ReactNode {
  const parse = DateFactory.getParser(props.type);
  const format = DateFactory.getFormatter(props.type);

  const date: Date = new Date();
  const defaultValue: Date | undefined =
    typeof props.defaultValue === "string"
      ? parse(props.defaultValue, NATIVE_DATE_FORMAT, date)
      : props.defaultValue;
  const [value, setValue] = React.useState<Date | undefined>(defaultValue);

  function onDayBlur(_1: any, _2: any, ev: React.FocusEvent): void {
    // @ts-expect-error 'the type <Element> matches the type <HTMLInputElement>'
    props.onBlur?.(ev);
  }

  function onSelect(selected: Date | undefined): void {
    if (typeof selected !== "undefined") {
      props.onChange?.({
        target: {
          // @ts-expect-error 'the <name> possible undefined'
          name: props.name,
          value: format(selected, NATIVE_DATE_FORMAT),
          valueAsDate: selected,
          valueAsNumber: selected.getMilliseconds(),
        },
      });
      setValue(selected);
    }
  }

  const placeholder: string = !!value
    ? format(value, NATIVE_DATE_FORMAT)!
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
          mode="single"
          autoFocus={true}
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

export default SingleDatePicker;
export { SingleDatePicker };
