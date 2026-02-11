'use client'
import { useQueryAutomation } from "@/hooks/use-query";
import { Separator } from "@/components/ui/separator";
import { CircleAlert, Instagram } from "lucide-react";
import Image from "next/image";
type Props = {
  id: string;
};

const PostNode = ({ id }: Props) => {
  const { data } = useQueryAutomation(id);
  return (
    data?.data &&
    data.data.posts &&
    data.data.posts.length > 0 && (
      <div className='w-10/12 lg:w-8/12 relative xl:w-4/12 p-5 rounded-xl flex flex-col bg-[#15171d] gap-y-3'>
        <div className='absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50'>
          <Separator
            orientation='vertical'
            className='border-muted border h-10'
          />
        </div>
        <div className='flex gap-x-2 items-center text-[#8C8F94]'>
          <CircleAlert
            fill='#ED4C79'
            stroke='#15171D'
            color='#fff'
            className='text-white'
            size={26}
          />
          If they comment on...
        </div>
        <div className='bg-[#28292E] p-3 rounded-xl flex flex-col gap-y-2'>
          <div className='flex gap-x-2 items-center'>
            <Instagram fill='#ED4C79' stroke='#28292E' size={32} />
            <p className='font-bold text-lg'>These posts</p>
          </div>
          <div className='flex gap-x-2 flex-wrap mt-3'>
            {data.data.posts.map((post) => (
              <div
                className='relative w-4/12 aspect-square rounded-lg cursor-pointer'
                key={post.id}
              >
                <Image 
                    src={post.media}
                    alt='image'
                    fill
                    sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default PostNode;
