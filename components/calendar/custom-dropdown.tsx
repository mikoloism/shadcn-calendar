"use client";

import React from "react";
import { ClassNames, CustomComponents, DropdownOption } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type DropDownType = {
  components: CustomComponents;
  classNames: ClassNames;
  options?: DropdownOption[] | undefined;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children">;

export default function CustomDropdown({
  props,
}: {
  props: DropDownType;
}): React.JSX.Element | undefined {
  const { options, value, onChange, dir } = props;
  const validDir = dir === "ltr" || dir === "rtl" ? dir : undefined;

  const handleCalendarChange = (newValue: string) => {
    if (onChange) {
      const event = {
        target: {
          value: String(newValue),
        },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(event);
    }
  };

  return (
    <Select
      {...props}
      value={value?.toString()}
      defaultValue={value?.toString()}
      onValueChange={handleCalendarChange}
      dir={validDir}
    >
      <SelectTrigger
        className={cn(
          "px-2 py-1 h-7 w-24 font-medium hover:bg-accent",
          "transition-colors",
          "hover:bg-accent"
        )}
      >
        <SelectValue />
      </SelectTrigger>
      {/* fix select bug: click outside of the select and will close the popover too */}
      <SelectContent>
        {options?.map(({ value, label, disabled }) => (
          <SelectItem
            key={value}
            value={value.toString()}
            disabled={disabled}
            className="min-w-[var(--radix-popper-anchor-width)] pr-7"
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
