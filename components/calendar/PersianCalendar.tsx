"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { faIR } from "date-fns-jalali/locale";
import * as React from "react";
import { DayPicker } from "react-day-picker/persian";
import * as styles from "./calendar.styles";

export type PersianCalendarProps = React.ComponentProps<typeof DayPicker>;

function PersianCalendar(props: PersianCalendarProps) {
  const { components, showOutsideDays = true, className, classNames, ...extraProps } = props;
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      dir="rtl"
      className={styles.DayPicker(className)}
      classNames={{
        ...styles.getClassNames(extraProps),
        ...classNames,
      }}
      components={{
        Chevron(props): React.ReactElement {
          switch (props.orientation) {
            case "left":
              return <ChevronRightIcon className={styles.Chevron} />;
            case "right":
              return <ChevronLeftIcon className={styles.Chevron} />;
            default:
              return <span />;
          }
        },
        ...components,
      }}
      locale={faIR}
      {...extraProps}
    />
  );
}
PersianCalendar.displayName = "PersianCalendar";

export default PersianCalendar;
export { PersianCalendar };
