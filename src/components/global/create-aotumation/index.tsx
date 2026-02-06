import { Button } from "@/components/ui/button";
import Loader from "../loader";
import { Workflow } from "lucide-react";

type Props = {};

const CreateAutomation = (props: Props) => {
  return (
    <Button className='lg:px-10! py-6 px-4! gradient-bg hover:opacity-80 text-white rounded-full font-medium cursor-pointer'>
      <Loader state={false}>
        <Workflow />
        <p className='lg:inline hidden'>Create an Automation</p>
      </Loader>
    </Button>
  );
};

export default CreateAutomation;
