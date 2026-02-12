import { useEffect, useRef, useState } from "react";
import { useMutationData } from "./use-mutation-data";
import {
  createAutomations,
  deleteKeyword,
  saveKeyword,
  saveListener,
  savePosts,
  saveTrigger,
  updateAutomationName,
} from "@/actions/automations";
import { z } from "zod";
import { useZodForm } from "./use-zod-form";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { TRIGGER } from "@/redux/slices/automation";
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        mutate({ name: inputRef.current.value });
      } else {
        disableEdit();
      }
    };
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
    edit,
  };
};

export const useListener = (id: string) => {
  const [listener, setListener] = useState<"MESSAGE" | "SMARTAI" | null>(null);
  const promptSchema = z.object({
    prompt: z.string().min(1, "Prompt is required"),
    reply: z.string(),
  });

  const { mutate, isPending } = useMutationData<{ status: number; data: string }, { prompt: string; reply: string }>(
    ["create-listener"],
    (data: { prompt: string; reply: string }) =>
      saveListener(id, listener || "MESSAGE", data.prompt, data.reply),
    "automation-info",
  );

  const { errors, register, onFormSubmit, reset, watch } = useZodForm(
    promptSchema,
    mutate,
  );
  const onSetListener = (type: "MESSAGE" | "SMARTAI") => setListener(type);

  return {
    onSetListener,
    listener,
    isPending,
    register,
    onFormSubmit,
    errors,
    watch,
    reset,
  };
};

export const useTrigger = (id: string) => {
  const types = useAppSelector((state) => {
    return state.AutomationReducer?.trigger?.types;
  });

  const dispatch = useDispatch();

  const onSetTrigger = (type: "COMMENT" | "DM") =>
    dispatch(TRIGGER({ trigger: { type } }));

  const { mutate, isPending } = useMutationData(
    ["add-trigger"],
    (data: { types: string[] }) => saveTrigger(id, data.types),
    "automation-info",
  );

  const onSaveTrigger = () => mutate({ types: types || [] });

  return {
    onSetTrigger,
    onSaveTrigger,
    isPending,
    types,
  };
};

export const useKeywords = (id: string) => {
  const [keyword, setKeyword] = useState("");
  const onValueChange = (value: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(value.target.value);

  const { mutate, isPending } = useMutationData(
    ["add-keyword"],
    (data: { word: string }) => saveKeyword(id, data.word),
    "automation-info",
    () => setKeyword(""),
  );
  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && keyword.trim() !== "") {
      // save keyword to db
      mutate({ word: keyword });
      setKeyword("");
    }
  };

  const { mutate: deleteMutation, isPending: deletePending } = useMutationData(
    ["delete-keyword"],
    (data: { id: string }) => deleteKeyword(id, data.id),
    "automation-info",
  );

  return {
    keyword,
    onValueChange,
    onKeyPress,
    deleteMutation,
    deletePending,
    isPending,
  };
};

export const useAutomationPost = (id: string) => {
  const [posts, setPosts] = useState<
    {
      postId: string;
      caption?: string;
      media: string;
      mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    }[]
  >([]);

  const onSelectPost = (post: {
    postId: string;
    caption?: string;
    media: string;
    mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  }) => {
    setPosts((prev) => {
      if (prev.find((p) => p.postId === post.postId)) {
        return prev.filter((p) => p.postId !== post.postId);
      } else {
        return [...prev, post];
      }
    });
  };

  const { mutate, isPending } = useMutationData(
    ["attach-posts"],
    (data: { posts: typeof posts }) => savePosts(id, data.posts || []),
    "automation-info",
    () => setPosts([]),
  );

  return {
    posts,
    onSelectPost,
    isPending,
    mutate,
  };
};
