import { SIDEBAR_MENU } from "@/constant/menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  page: string;
  slug: string;
};

const Item = ({ page, slug }: Props) => {
  return SIDEBAR_MENU.map((item) => (
    <Link
      key={item.id}
      href={`/dashboard/${slug}/${item.label === "home" ? "/" : item.label}`}
      className={cn(
        "capitalize flex gap-x-2 rounded-full p-3  ",
        page === item.label && "bg-[#171717]",
        page === slug && item.label === "home"
          ? "bg-[#171717]"
          : "text-[#9b9ca0]",
      )}
    >
      {item.icon}
      {item.label}
    </Link>
  ));
};

export default Item;
