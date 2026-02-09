import { useQueryUser } from "@/hooks/use-query";
import React from "react";

type Props = {
    type: "FREE" | "PRO"
  children: React.ReactNode;
};

const Subscription = ({ type, children }: Props) => {
  const {data} = useQueryUser();
  return data?.data?.subscription?.plan === type && children
};

export default Subscription;
