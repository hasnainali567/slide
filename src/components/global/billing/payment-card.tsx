import { Button } from "@/components/ui/button";
import { PLANS } from "@/constant/pages";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { Span } from "next/dist/trace";
import React from "react";

type Props = {
  label: string;
  current: "PRO" | "FREE";
  landing?: boolean;
};

const PaymentCard = ({ label, current, landing }: Props) => {
  return (
    <div
      className={cn(
        label !== current ? "bg-[#46484F]" : "gradient-bg ",
        "p-0.5 rounded-xl overflow-hidden ",
      )}
    >
      <div
        className={cn(
          landing && "radial-gradient-bg",
          "flex flex-col rounded-xl pl-5 py-5 pr-10 bg-[#15171D]",
        )}
      >
        {landing ? (
          <h2 className='text-2xl'>
            {label === "PRO" && "Premium Plan"}
            {label === "FREE" && "Standard"}
          </h2>
        ) : (
          <h2 className='text-2xl mb-2'>
            {label === current
              ? "Your Current Plan"
              : current === "PRO"
                ? "Downgrade"
                : "Upgrade"}
          </h2>
        )}
        <p className="text-white/70 text-sm mb-2">
        This is what your plan covers for automation and Ai features</p>
        {label === "PRO" ? (
            <span className="gradient-bg text-3xl font-bold bg-clip-text text-transparent">Smart AI</span>
        ) : (
            <p className="font-bold text-white/70">Standard</p>
        )}
        {label === "PRO" ? (
            <p className="mb-2">
                <b className="text-xl">$29</b>/month
            </p>
        ) : (
            <p className="text-xl mb-2">Free</p>
        )}

        {PLANS[label === "PRO" ? 1 : 0].features.map((i) => (
            <p key={i}
                className="mt-2 text-muted-foreground flex gap-4">
                    <CircleCheck className="text-[#ED4C79]" />
                {i}
            </p>
        ))}
        {
            landing ? (
                <Button className={cn('rounded-full mt-5', label === 'PRO' ? 'gradient-bg text-white' : 'bg-[#1E1E1F] text-white')}>{label === current ? 'Get Started' : 'Upgrade'}</Button>
            ) : (
                <Button className={cn('rounded-full mt-5 bg-[#1E1E1F] text-white hover:bg-[#2C2F36] cursor-pointer')} disabled={label === current}>{label === current ? 'Active' : current === 'PRO' ? 'Downgrade' : 'Upgrade'}</Button>
            )
        }
      </div>
    </div>
  );
};

export default PaymentCard;
