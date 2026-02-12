import { useAutomationPost } from "@/hooks/use-automation";
import { useQueryAutomationPosts } from "@/hooks/use-query";
import React from "react";
import TriggerButton from "../trigger-button";
import { InstagramPostProps } from "@/types/post.type";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Loader from "../../loader";

type Props = {
  id: string;
};

const PostButton = ({ id }: Props) => {
  const { data } = useQueryAutomationPosts();
  const { isPending, mutate, posts, onSelectPost } = useAutomationPost(id);
  return (
    <TriggerButton label='Attach a post'>
      {data?.status === 200 ? (
        <div className='flex flex-col gap-y-3 w-full'>
          <div className='flex flex-wrap w-full gap-3'>
            {data?.data?.data?.map((post: InstagramPostProps) => {
              return (
                <div
                  className='relative w-4/12 aspect-square rounded-lg cursor-pointer outline-hidden'
                  key={post.id}
                  onClick={() =>
                    onSelectPost({
                      postId: post.id,
                      media: post.media_url,
                      caption: post.caption,
                      mediaType: post.media_type,
                    })
                  }
                >
                  {posts.find((p) => p.postId === post.id) && (
                    <CheckCircle
                      fill='white'
                      stroke='black'
                      className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'
                    />
                  )}
                  <Image
                    fill
                    sizes='100vw'
                    src={post.media_url}
                    alt='post image'
                    className={cn(
                      "hover:opacity-75 transition duration-100",
                      posts.find((p) => p.postId === post.id) && "opacity-75",
                    )}
                  />

                </div>
              );
            })}
          </div>
          <Button onClick={() => mutate({ posts })} disabled={posts.length === 0 || isPending} className="gradient-bg w-full font-medium text-white">
            <Loader state={isPending}>
                Attach Post
            </Loader>
          </Button>
        </div>
      ) : (
        <p className="text-[#9b9ca0] text-center">No posts found</p>
      )}
    </TriggerButton>
  );
};

export default PostButton;
