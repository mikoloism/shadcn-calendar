"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";
import { getClassNames } from "./calendar.styles";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function CalendarGregorian({
  components,
  showOutsideDays = true,
  className,
  classNames,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        ...getClassNames(props),
        ...classNames,
      }}
      components={{
        Chevron(props) {
          if (props.orientation === "left")
            return <ChevronRightIcon className="h-4 w-4" />;
          else if (props.orientation === "right")
            return <ChevronLeftIcon className="h-4 w-4" />;
          return <span />;
        },
        ...components,
      }}
      {...props}
    />
  );
}
CalendarGregorian.displayName = "CalendarGregorian";

export { CalendarGregorian };
