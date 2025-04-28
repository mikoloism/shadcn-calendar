"use client";

import {
  addHours,
  addMinutes,
  format,
  isAfter,
  isBefore,
  parse,
  setHours as setHoursFn,
  setMinutes as setMinutesFn,
  subHours,
  subMinutes,
} from "date-fns";
import React, { useState } from "react";
import {
  NATIVE_TIME_FORMAT,
  type Hours,
  type Hours24H,
  type MilitaryTimeFormat,
  type Minutes,
  type TimeFormat,
} from "./Time";

const DEFAULT_MINIMUM: MilitaryTimeFormat = "00:00";
const DEFAULT_MAXIMUM: MilitaryTimeFormat = "23:59";
const DEFAULT_OPTION: UseTimePickerOption = {
  max: DEFAULT_MAXIMUM,
  min: DEFAULT_MINIMUM,
};

export interface UseTimePickerOption<T extends Hours = Hours24H> {
  defaultValue?: TimeFormat<T>;
  max?: TimeFormat<T>;
  min?: TimeFormat<T>;
  onChange?: (time: TimeFormat<T>) => void;
}

export interface UseTimePickerReturn<T extends Hours = Hours24H> {
  value: TimeFormat<T>;
  decrement(action: ActionOption): void;
  getHours(): T;
  getMinutes(): Minutes;
  getValue(): TimeFormat<T>;
  handleChange(fn: TimeChangeHandler<T>): (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleHoursBlur(fn: TimeBlurHandler<T>): () => void;
  handleHoursChange(fn: TimeChangeHandler<T>): (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleHoursKeyDown(
    fn: TimeKeyDownHandler<T>
  ): (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  handleMinutesBlur(fn: TimeBlurHandler<T>): () => void;
  handleMinutesChange(fn: TimeChangeHandler<T>): (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleMinutesKeyDown(
    fn: TimeKeyDownHandler<T>
  ): (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  increment(action: ActionOption): void;
  setHours(hours: T | number, option?: { shouldClamp?: boolean }): void;
  setMinutes(minutes: Minutes | number, option?: { shouldClamp?: boolean }): void;
}

function useTimePicker<THours extends Hours = Hours24H>(
  option: UseTimePickerOption<THours> = DEFAULT_OPTION as unknown as UseTimePickerOption<THours>
): UseTimePickerReturn<THours> {
  const minDate: Date = toDate(option?.min ?? (DEFAULT_MINIMUM as unknown as TimeFormat<THours>));
  const maxDate: Date = toDate(option?.max ?? (DEFAULT_MAXIMUM as unknown as TimeFormat<THours>));
  const [value, setValue] = useState<TimeFormat<THours>>(
    toString(clamp(toDate(option?.defaultValue)))
  );

  function toDate(timeString?: TimeFormat<THours>): Date {
    const date: Date = new Date();
    // @ts-expect-error 'complex type'
    return parse(timeString ?? toString(date), NATIVE_TIME_FORMAT, date);
  }

  function toString(date: Date): TimeFormat<THours> {
    return format(date, NATIVE_TIME_FORMAT) as TimeFormat<THours>;
  }

  function getValue(): TimeFormat<THours> {
    return value!;
  }

  function getHours(): THours {
    return format(toDate(getValue()), "HH") as THours;
  }

  function getMinutes(): Minutes {
    return format(toDate(getValue()), "mm") as Minutes;
  }

  function clamp(value: Date): Date {
    if (isBefore(value, minDate)) {
      return minDate;
    }
    if (isAfter(value, maxDate)) {
      return maxDate;
    }
    return value;
  }

  function increment(action: ActionOption = { hours: 0, minutes: 0 }): void {
    let valueDate: Date = toDate(value!);
    valueDate = addHours(valueDate, action.hours ?? 0);
    valueDate = addMinutes(valueDate, action.minutes ?? 0);
    const nextTime: TimeFormat<THours> = toString(clamp(valueDate));
    setValue(nextTime);
  }

  function decrement(action: ActionOption = { hours: 0, minutes: 0 }): void {
    let valueDate: Date = toDate(value!);
    valueDate = subHours(valueDate, action.hours ?? 0);
    valueDate = subMinutes(valueDate, action.minutes ?? 0);
    const nextTime: TimeFormat<THours> = toString(clamp(valueDate));
    setValue(nextTime);
  }

  function setHours(
    hours: THours | number,
    option: { shouldClamp?: boolean } = { shouldClamp: true }
  ): void {
    const valueDate: Date = setHoursFn(toDate(getValue()), parseInt(String(hours)));
    const nextTime: TimeFormat<THours> = toString(
      option.shouldClamp ? clamp(valueDate) : valueDate
    );
    setValue(nextTime);
  }

  function setMinutes(
    minutes: Minutes | number,
    option: { shouldClamp?: boolean } = { shouldClamp: true }
  ): void {
    const valueDate: Date = setMinutesFn(toDate(getValue()), parseInt(String(minutes)));
    const nextTime: TimeFormat<THours> = toString(
      option.shouldClamp ? clamp(valueDate) : valueDate
    );
    setValue(nextTime);
  }

  function handleChange(fn: TimeChangeHandler<THours>) {
    return function (ev: React.ChangeEvent<HTMLInputElement>) {
      fn(getValue(), ev);
    };
  }

  function handleHoursChange(fn: TimeChangeHandler<THours>) {
    return function (ev: React.ChangeEvent<HTMLInputElement>) {
      const valueString: string = ev.target.value.replace(/\D/g, "");
      const valueNumber: number = Number(valueString);
      if (!Number.isNaN(valueNumber)) {
        setHours(valueNumber, { shouldClamp: false });
        fn(getValue(), ev);
      }
    };
  }

  function handleHoursBlur(fn: TimeBlurHandler<THours>) {
    return function () {
      setHours(getHours());
      fn(getValue());
    };
  }

  function handleMinutesChange(fn: TimeChangeHandler<THours>) {
    return function (ev: React.ChangeEvent<HTMLInputElement>) {
      const valueString: string = ev.target.value.replace(/\D/g, "");
      const valueNumber: number = Number(valueString);
      if (!Number.isNaN(valueNumber)) {
        setMinutes(valueNumber, { shouldClamp: false });
        fn(getValue(), ev);
      }
    };
  }

  function handleMinutesBlur(fn: TimeBlurHandler<THours>) {
    return function () {
      setMinutes(getMinutes());
      fn(getValue());
    };
  }

  function handleHoursKeyDown(fn: TimeKeyDownHandler<THours>) {
    return function (ev: React.KeyboardEvent<HTMLInputElement>) {
      if (ev.key === "ArrowUp") {
        ev.preventDefault();
        increment({ hours: 1 });
        fn(getValue(), ev);
      } else if (ev.key === "ArrowDown") {
        ev.preventDefault();
        decrement({ hours: 1 });
        fn(getValue(), ev);
      }
    };
  }
  function handleMinutesKeyDown(fn: TimeKeyDownHandler<THours>) {
    return function (ev: React.KeyboardEvent<HTMLInputElement>) {
      if (ev.key === "ArrowUp") {
        ev.preventDefault();
        increment({ minutes: ev.shiftKey === true ? 10 : 1 });
        fn(getValue(), ev);
      } else if (ev.key === "ArrowDown") {
        ev.preventDefault();
        decrement({ minutes: ev.shiftKey === true ? 10 : 1 });
        fn(getValue(), ev);
      }
    };
  }

  React.useEffect(() => option.onChange?.(getValue()), [value]);

  return {
    value,
    decrement,
    getHours,
    getMinutes,
    getValue,
    handleChange,
    handleHoursBlur,
    handleHoursChange,
    handleHoursKeyDown,
    handleMinutesKeyDown,
    handleMinutesBlur,
    handleMinutesChange,
    increment,
    setHours,
    setMinutes,
  };
}

export default useTimePicker;
export { useTimePicker };

interface ActionOption {
  hours?: number;
  minutes?: number;
}
type TimeKeyDownHandler<T extends Hours = Hours24H> = (
  value: TimeFormat<T>,
  ev: React.KeyboardEvent<HTMLInputElement>
) => void;
type TimeChangeHandler<T extends Hours = Hours24H> = (
  value: TimeFormat<T>,
  ev: React.ChangeEvent<HTMLInputElement>
) => void;
type TimeBlurHandler<T extends Hours = Hours24H> = (value: TimeFormat<T>) => void;