import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {
  type: "BUTTON" | "LINK";
  children: React.ReactNode;
  className?: string;
  href?: string;
};

const GradientButton = ({ children, type, className, href }: Props) => {
  const gradeints = "gradient-bg p-[2px] rounded-xl";
  switch (type) {
    case "BUTTON":
      return (
        <div className={gradeints}>
          <Button className={cn(className, "rounded-xl py-2 bg-[#202222]")}>{children}</Button>
        </div>
      );
    case "LINK":
      return (
        <div className={gradeints}>
          <Link href={href!} className={cn(className, "rounded-xl py-2 bg-[#202222]")}>
            {children}
          </Link>
        </div>
      );

    default:
      return null;
  }
};

export default GradientButton;
