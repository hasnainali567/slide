import { Button } from "@/components/ui/button";
import React from "react";
import Loader from "../loader";
import { Activity } from "lucide-react";
import { useQueryAutomation } from "@/hooks/use-query";
import { useMutationData } from "@/hooks/use-mutation-data";
import { activateAutomation } from "@/actions/automations";

type Props = {
  id: string;
};

const ActivateAutomationButton = ({ id }: Props) => {
  const { data } = useQueryAutomation(id);
  const { mutate, isPending } = useMutationData(
    ["activate"],
    (data: { state: boolean }) => activateAutomation(id, data.state),
    "automation-info",
  );
  return (
    <Button
      onClick={() => mutate({ state: !data?.data?.active })}
      className=' gradient-bg hover:opacity-80 text-white rounded-full font-medium ml-4 cursor-pointer flex items-center gap-x-2 '
      disabled={isPending}
    >
      <Loader state={isPending}>
        <Activity />
      </Loader>
      <p className='lg:inline hidden'>
        {data?.data?.active ? "Disable" : "Activate"}
      </p>
    </Button>
  );
};

export default ActivateAutomationButton;
