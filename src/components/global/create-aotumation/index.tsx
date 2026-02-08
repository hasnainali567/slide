"use client";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import Loader from "../loader";
import { Workflow } from "lucide-react";
import { useCreateAutomation } from "@/hooks/use-automation";

const CreateAutomation = () => {
  const { mutate, isPending } = useCreateAutomation();
  
  const handleClick = () => {
    const newId = uuid();
    console.log('newId', newId);
    
    mutate({ name: "Untitled", id: newId, createdAt: new Date(), active : false, userId: '', keywords : [], listener : {listener : ''} });
  };
  return (
    <Button
      className='lg:px-10! py-6 px-4! gradient-bg hover:opacity-80 text-white rounded-full font-medium cursor-pointer'
      onClick={handleClick}
    >
      <Loader state={isPending}>
        <Workflow />
        <p className='lg:inline hidden'>Create an Automation</p>
      </Loader>
    </Button>
  );
};

export default CreateAutomation;
