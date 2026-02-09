import Spinner from "@/components/global/loader/spinner";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  state: boolean;
  className?: string;
  children: React.ReactNode;
  color?: string;
  size?: number;
};

const Loader = ({ state, className, children, color, size }: Props) => {
  return state ? (
    <div className={cn(className)}>
      <Spinner color={color} size={size} />
    </div>
  ) : (
    children
  );
};

export default Loader;
