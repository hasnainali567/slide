import { useEffect, useRef, useState } from "react";
import { useMutationData } from "./use-mutation-data";
import { createAutomations, updateAutomationName } from "@/actions/automations";

export const useCreateAutomation = () => {
  const { mutate, isPending } = useMutationData(
    ["create-automation"],
    (data: { id: string }) => createAutomations(data.id),
    "user-automations",
  );

  return {
    isPending,
    mutate,
  };
};

export const useEditAutomation = (automationId: string) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const enableEdit = () => setEdit(true);
  const disableEdit = () => setEdit(false);

  const { mutate, isPending } = useMutationData(
    ["update-automation"],
    (data: { name: string }) =>
      updateAutomationName(automationId, { name: data.name }),
    "automation-info",
    disableEdit,
  );

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        mutate({ name: inputRef.current.value });
      } else {
        disableEdit();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mutate]);

  return {
    isPending,
    enableEdit,
    inputRef,
    disableEdit,
    edit
  };
};
