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
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        icon : <Instagram size={32} color="#ED4C79" />,
        strategy : 'INSTAGRAM'
    },
    {
        title : 'Connect Salesforce',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        icon : <Instagram  size={32} color="#ED4C79" />,
        strategy : 'CRM'
    },
]