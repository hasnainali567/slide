import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import React from "react";
import Loader from "../loader";
import { Activity } from "lucide-react";

type Props = {};

const PaymentButton = (props: Props) => {
  const { onSubscribe, isProcessing } = useSubscription();
  return (
    <Button disabled={isProcessing} onClick={onSubscribe} className='text-white rounded-full gradient-bg font-bold'>
      <Loader state={isProcessing}>
        <Activity />
      </Loader>
      <p className='lg:inline hidden'>
        Upgrade
      </p>
    </Button>
  );
};

export default PaymentButton;
