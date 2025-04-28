"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { enGB } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import * as styles from "./calendar.styles";

export type GregorianCalendarProps = React.ComponentProps<typeof DayPicker>;

function GregorianCalendar(props: GregorianCalendarProps): React.ReactNode {
  const { components, showOutsideDays = true, className, classNames, ...extraProps } = props;
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      dir="ltr"
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
      locale={enGB}
      {...props}
    />
  );
}
GregorianCalendar.displayName = "GregorianCalendar";

export default GregorianCalendar;
export { GregorianCalendar };