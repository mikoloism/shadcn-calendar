export const NATIVE_TIME_FORMAT = "HH:mm";

type DecimalDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Period60 = DecimalDigit | `${DecimalDigit}` | `${0 | 1 | 2 | 3 | 4 | 5}${DecimalDigit}`;
export type Minutes = Period60;
export type Seconds = Period60;
export type Hours24H =
  | DecimalDigit
  | `${DecimalDigit}`
  | `${0}${DecimalDigit}`
  | `${1}${DecimalDigit}`
  | `${2}${0 | 1 | 2 | 3}`;
export type Hours12H =
  | DecimalDigit
  | `${DecimalDigit}`
  | `${0}${DecimalDigit}`
  | `${1}${0 | 1 | 2}`;
export type Hours = Hours12H | Hours24H;
export type TimeFormat<
  H extends Hours = Hours,
  HaveSeconds extends boolean = false,
> = `${H}:${Minutes}${HaveSeconds extends true ? `:${Seconds}` : ""}`;
export type MilitaryTimeFormat = TimeFormat<Hours24H>;
export type PureDisplayFormat = TimeFormat<Hours12H>;
export type StandardDisplayTimeFormat = `${PureDisplayFormat} ${"AM" | "PM"}`;
export type DisplayTimeFormat = PureDisplayFormat | StandardDisplayTimeFormat;