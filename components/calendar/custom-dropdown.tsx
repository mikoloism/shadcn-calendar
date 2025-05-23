"use client";

import * as React from "react";
import { ClassNames, CustomComponents, DropdownOption } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";

type DropDownType = {
  components: CustomComponents;
  classNames: ClassNames;
  options?: DropdownOption[] | undefined;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children">;

type CustomDropdownProps = {
  dropdownProps: DropDownType;
  // TODO: make bellow types required
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
};

export default function CustomDropdown(
  props: CustomDropdownProps
): React.ReactNode {
  const { dropdownProps: dropdownProps, open, onOpenChange } = props;
  const { options, value, onChange, dir } = dropdownProps;
  const validatedDirection = dir === "ltr" || dir === "rtl" ? dir : undefined;

  function handleCalendarChange(newValue: string): void {
    if (typeof onChange === "function") {
      const event = { target: { value: String(newValue) } };
      onChange(event as React.ChangeEvent<HTMLSelectElement>);
    }
  }

  return (
    <Select
      {...dropdownProps}
      value={value?.toString()}
      open={open}
      onOpenChange={onOpenChange}
      defaultValue={value?.toString()}
      onValueChange={handleCalendarChange}
      dir={validatedDirection}
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
      <SelectContent>
        {options?.map(function mapOptions({
          value,
          label,
          disabled,
        }): React.ReactNode {
          return (
            <SelectItem
              key={value}
              value={value.toString()}
              disabled={disabled}
              className="min-w-[var(--radix-popper-anchor-width)] pr-7"
            >
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export function useDropdowns(initial = { month: false, year: false }) {
  const [openDropdowns, setOpenDropdowns] = React.useState(initial);

  const setDropdownOpen = (dropdownType: "month" | "year", isOpen: boolean) => {
    setOpenDropdowns((prev) => ({ ...prev, [dropdownType]: isOpen }));
  };

  const isAnyDropdownOpen = Object.values(openDropdowns).some(Boolean);

  return { openDropdowns, setDropdownOpen, isAnyDropdownOpen };
}

type DropdownWrapperProps = {
  dropdownProps: DropDownType;
  openDropdowns: { [key: string]: boolean };
  setDropdownOpen: (dropdownType: "month" | "year", isOpen: boolean) => void;
};

export function DropdownWrapper({
  dropdownProps,
  openDropdowns,
  setDropdownOpen,
}: DropdownWrapperProps) {
  const dropdownType = dropdownProps["aria-label"]?.includes("Month")
    ? "month"
    : "year";
  return (
    <CustomDropdown
      dropdownProps={dropdownProps}
      open={openDropdowns[dropdownType]}
      onOpenChange={(isOpen: boolean) => setDropdownOpen(dropdownType, isOpen)}
    />
  );
}
