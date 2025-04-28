import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ClockIcon } from "lucide-react";
import React from "react";
import TimePicker, { type TimePickerProps } from "./TimePicker";

function TimePickerField(props: TimePickerProps): React.ReactNode {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !props.value && "text-muted-foreground"
          )}
        >
          <ClockIcon className="mr-2 h-4 w-4" />
          {!!props.value ? (
            <span>{props.value}</span>
          ) : (
            <span>{props.placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <TimePicker {...props} />
      </PopoverContent>
    </Popover>
  );
}

export default TimePickerField;
export { TimePickerField };
