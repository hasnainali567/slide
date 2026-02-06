import { Instagram } from "lucide-react";
import React from "react";

type Props = {
    title : string,
    icon : React.ReactNode,
    description : string,
    strategy : 'INSTAGRAM' | "CRM"
}

export const INTEGRATION_CARD : Props[] = [
    {
        title : 'Connect Instagram',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse et voluptatem nemo, doloribus voluptate quidem cum saepe ipsum iste eos repellat accusantium est ipsa laboriosam? Natus et aut ullam eligendi?',
        icon : <Instagram />,
        strategy : 'INSTAGRAM'
    },
    {
        title : 'Connect Salesforce',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse et voluptatem nemo, doloribus voluptate quidem cum saepe ipsum iste eos repellat accusantium est ipsa laboriosam? Natus et aut ullam eligendi?',
        icon : <Instagram />,
        strategy : 'CRM'
    },
]