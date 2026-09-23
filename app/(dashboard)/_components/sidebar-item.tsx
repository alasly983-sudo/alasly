"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-codeup-muted text-sm font-[500] pr-6 transition-all hover:text-codeup-strong hover:bg-codeup-soft/70",
        isActive && "text-codeup-brand bg-codeup-soft hover:bg-codeup-soft hover:text-codeup-brand"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-codeup-muted",
            isActive && "text-codeup-brand"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "mr-auto opacity-0 border-2 border-codeup-brand h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  )
}