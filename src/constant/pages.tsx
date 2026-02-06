import { House, Rocket, Settings, User, Workflow } from "lucide-react"

export const PAGE_BREAD_CRUMBS: string[] = [
    'contacts',
    'automations',
    'integrations',
    'settings',
]

type FieldProps = {
    [page in string] : React.ReactNode
}

export const PAGE_ICONS: FieldProps = {
    AUTOMATIONS : <Workflow />,
    CONTACTS : <User />,
    INTEGRATIONS : <Rocket />,
    SETTINGS : <Settings />,
    HOME : <House />
}

export const PLANS = [
  {
    name: "Free Plan",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      'Boost engagement with target responses',
      'Automate comment replies to enhance audience interaction',
      'Turn followers into customers with targeted messages'
    ],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Smart AI Plan",
    price: "$29",
    period: "per month",
    description: "Advanced features for power users",
    features: [
      "All features of the Free Plan",
      "AI-powered response generation",
      "Advananced analytics and insights",
      "Priority customer support",
    ],
    cta: "Start free trial",
    featured: true,
  },
];
