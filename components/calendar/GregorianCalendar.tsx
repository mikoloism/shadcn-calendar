"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { enGB } from "date-fns/locale";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import * as styles from "./calendar.styles";

export type GregorianCalendarProps = React.ComponentProps<typeof DayPicker>;

function GregorianCalendar({
  components,
  showOutsideDays = true,
  className,
  classNames,
  ...props
}: GregorianCalendarProps): React.ReactNode {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      dir="ltr"
      className={styles.DayPicker(className)}
      classNames={{
        ...styles.getClassNames(props),
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
      locale={enGB}
      {...props}
    />
  );
}
GregorianCalendar.displayName = "GregorianCalendar";

export default GregorianCalendar;
export { GregorianCalendar };
