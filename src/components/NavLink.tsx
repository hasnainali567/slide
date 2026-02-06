'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, children, className, activeClassName, exact = false, ...props }, ref) => {
    const pathname = usePathname();
    
    // Check if the link is active
    // exact: true means the path must match exactly
    // exact: false (default) means it matches sub-routes (e.g., /settings matches /settings/profile)
    const isActive = exact 
      ? pathname === href 
      : pathname.startsWith(href) && (pathname[href.length] === '/' || pathname.length === href.length);

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };