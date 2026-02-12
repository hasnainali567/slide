import { Input } from "@/components/ui/input";
import { useMutationDataState } from "@/hooks/use-mutation-data";
import { useQueryAutomation } from "@/hooks/use-query";
import { X } from "lucide-react";
import React from "react";
import Loader from "../../loader";

type Props = {
  id: string;
  keyword: string;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onValueChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  deleteMutation: (data: { id: string }) => void;
  deletePending: boolean;
  isPending: boolean;
  data: ReturnType<typeof useQueryAutomation>["data"];
};

const Keywords = ({ data, keyword, onKeyPress, onValueChange, deleteMutation, deletePending, isPending }: Props) => {
  const { latestVariables } = useMutationDataState<{ word: string }>(["add-keyword"]);
  const { latestVariables: deleteVariables } = useMutationDataState<{ id: string }>(["delete-keyword"]);

  return (
    <div className='bg-[] flex flex-col gap-y-3 p-3 rounded-xl'>
      <p className='text-[#8C8F94] text-sm'>
        Add words that trigger automations
      </p>
      <div className='flex flex-wrap justify-start gap-2 items-center'>
        {data?.data?.keywords &&
          data.data.keywords?.length > 0 &&
          data.data.keywords.map(
            (keyword) =>
              keyword.word !== latestVariables?.variables?.word && (
                <div
                  key={keyword.id}
                  className='bg-[#15171D] flex items-center gap-x-2 capitalize text-[#8C8F94] py-1 px-4 rounded-full'
                >
                  <p>{keyword.word}</p>
                  <Loader state={deletePending && deleteVariables?.variables?.id === keyword.id} size={4}>
                    <X
                    size={20}
                    onClick={() => deleteMutation({ id: keyword.id })}
                    className="cursor-pointer"
                  />
                  </Loader>
                </div>
              ),
          )}
          {latestVariables && latestVariables.status === "pending" && (
            <div className="bg-[#15171D] flex items-center gap-x-2 capitalize text-[#8C8F94] py-1 px-4 rounded-full" >
                {latestVariables.variables?.word}
                <Loader state={isPending} size={4}>
                  <></>
                </Loader>
            </div>
          )}

          <Input placeholder="Add keywords" 
          style={{
            width: Math.max(Math.max((keyword.length || 12) * 0.7 + 1, 2), 50) + 'ch',
          }}
          value={keyword}
          onChange={onValueChange}
          onKeyUp={onKeyPress}
          className="py-0 bg-transparent ring-0 border-none outline-none"/>
      </div>
    </div>
  );
};

export default Keywords;

