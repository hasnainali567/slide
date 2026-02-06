import React from "react";

type Props = {
    type: "FREE" | "PRO"
  children: React.ReactNode;
};

const Subscription = ({ type, children }: Props) => {
  return children;
};

export default Subscription;
