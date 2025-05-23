"use client";

import { CalendarIcon } from "lucide-react";
import * as React from "react";
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

const NATIVE_DATE_FORMAT = "yyyy-MM-dd";
const DEFAULT_PLACEHOLDER = "----/--/--";

export interface MultipleDatePickerProps
  extends Omit<React.ComponentProps<"input">, "type" | "defaultValue"> {
  type?: CalendarType;
  defaultValue?: Date[] | string;
  placeholder?: string;
}

function MultipleDatePicker(props: MultipleDatePickerProps): React.ReactNode {
  const format = DateFactory.getFormatter(props.type);

  const [list, setList] = React.useState<Date[]>([]);

  function onDayBlur(_1: any, _2: any, ev: React.FocusEvent): void {
    // @ts-expect-error 'the type <Element> matches the type <HTMLInputElement>'
    props.onBlur?.(ev);
  }

  function onSelect(selected: Date[] | undefined): void {
    if (typeof selected !== "undefined") {
      props.onChange?.({
        target: {
          // @ts-expect-error 'the <name> possible undefined'
          name: props.name,
          // @ts-expect-error 'the <value> possible undefined'
          value: selected,
        },
      });
      setList(selected);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[260px] justify-start text-left font-normal",
            list.length === 0 && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="ms-2 h-4 w-4" />
          {list.length ? (
            <div>
              {list.map((date, index) => {
                const v = format(date, NATIVE_DATE_FORMAT);
                return (
                  <span key={v}>
                    {v.concat(index + 1 < list.length ? "" : ",")}
                  </span>
                );
              })}
            </div>
          ) : (
            <span>{props.placeholder ?? DEFAULT_PLACEHOLDER}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Input type="hidden" name={props.name} />
        <Calendar
          mode="multiple"
          selected={list}
          onSelect={onSelect}
          onDayBlur={onDayBlur}
          min={props.maxLength}
          max={props.maxLength}
          required={props.required}
          calendarType={props.type}
        />
      </PopoverContent>
    </Popover>
  );
}

export default MultipleDatePicker;
export { MultipleDatePicker };
