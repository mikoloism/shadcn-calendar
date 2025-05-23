"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import * as React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { useTimePicker, UseTimePickerOption } from "./useTimePicker";

export interface TimePickerProps
  extends Omit<
      React.ComponentProps<"input">,
      "type" | keyof UseTimePickerOption
    >,
    UseTimePickerOption {
  readOnly?: boolean;
}

function TimePicker({
  defaultValue,
  max,
  min,
  onChange,
  readOnly,
  className,
  ...props
}: TimePickerProps): React.ReactNode {
  const time = useTimePicker({ defaultValue, max, min, onChange });
  const onHoursBlur = time.handleHoursBlur(() => {});
  const onHoursChange = time.handleHoursChange(() => {});
  const onHoursKeyDown = time.handleHoursKeyDown(() => {});
  const onMinutesBlur = time.handleMinutesBlur(() => {});
  const onMinutesChange = time.handleMinutesChange(() => {});
  const onMinutesKeyDown = time.handleMinutesKeyDown(() => {});

  return (
    <div dir="ltr" className="flex items-center text-center gap-x-4 max-w-fit">
      <div className="flex flex-col items-center">
        <Button
          onClick={() => time.increment({ hours: 1 })}
          variant={"ghost"}
          size={"icon"}
          tabIndex={2}
        >
          <ChevronUpIcon />
        </Button>
        <Input
          type="text"
          inputMode="numeric"
          value={time.getHours()}
          onBlur={onHoursBlur}
          onChange={onHoursChange}
          onKeyDown={onHoursKeyDown}
          readOnly={readOnly}
          className={cn("text-center max-w-12", className)}
          tabIndex={0}
          {...props}
        />
        <Button
          onClick={() => time.decrement({ hours: 1 })}
          variant={"ghost"}
          size={"icon"}
          tabIndex={2}
        >
          <ChevronDownIcon />
        </Button>
      </div>
      <span>:</span>
      <div className="flex flex-col items-center">
        <Button
          onClick={() => time.increment({ minutes: 1 })}
          variant={"ghost"}
          size={"icon"}
          tabIndex={2}
        >
          <ChevronUpIcon />
        </Button>
        <Input
          type="text"
          inputMode="numeric"
          value={time.getMinutes()}
          onBlur={onMinutesBlur}
          onChange={onMinutesChange}
          onKeyDown={onMinutesKeyDown}
          readOnly={readOnly}
          className={cn("text-center max-w-12", className)}
          tabIndex={0}
          {...props}
        />
        <Button
          onClick={() => time.decrement({ minutes: 1 })}
          variant={"ghost"}
          size={"icon"}
          tabIndex={2}
        >
          <ChevronDownIcon />
        </Button>
      </div>
    </div>
  );
}

export default TimePicker;
export { TimePicker };
