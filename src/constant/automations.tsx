import {  BotMessageSquare, Instagram, SendHorizonal } from "lucide-react";
import { JSX } from "react";
import { v4 } from "uuid";

export type AUTOMATION_LISTENERS_PROPS = {
  id: string;
  lable: string;
  icon: JSX.Element;
  description: string;
  type: "SMARTAI" | "MESSAGE";
};

export type AutomationTriggerProps = {
  id: string;
  lable: string;
  icon: JSX.Element;
  description: string;
  type: "COMMENT" | "DM";
};

export const AUTOMATION_LISTENERS: AUTOMATION_LISTENERS_PROPS[] = [
  {
    id: v4(),
    lable: "Send the user a message",
    icon: <SendHorizonal />,
    description: "Enter the message that you want to be sent to the user",
    type: "MESSAGE",
  },
  {
    id: v4(),
    lable: "Let Smart AI take over",
    icon: <BotMessageSquare />,
    description: "Tell Ai about your project. (Upgrade to use this feature)",
    type: "SMARTAI",
  },
];

export const AUTOMATION_TRIGGERS: AutomationTriggerProps[] = [
  {
    id: v4(),
    lable: "User comments on my post",
    icon: <Instagram />,
    description: "Select if you want to automate comments on your posts",
    type: "COMMENT",
  },
  {
    id: v4(),
    lable: "User sends me a dm with a keyword",
    icon: <Instagram />,
    description: "Select if you want to automate DMs on your profile",
    type: "DM",
  },
];
