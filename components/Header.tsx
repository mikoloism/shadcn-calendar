"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const pagesInfo = [
  { link: "/", title: "شمسی", classNames: "rounded-e-none" },
  { link: "/gregorian", title: "میلادی", classNames: "rounded-s-none" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-center items-center gap-2 text-center">
      <h2 className="text-lg font-medium">Shadcnui Jalali Date Picker</h2>
      <div className="flex justify-center w-[223px] rounded-lg border">
        {pagesInfo.map((page) => (
          <Link key={page.link} href={page.link} className="w-1/2">
            <Button
              variant="outline"
              className={cn(
                "border-none w-full",
                pathname === page.link && "bg-primary text-white hover:bg-primary hover:text-white",
                page.classNames
              )}
            >
              {page.title}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
