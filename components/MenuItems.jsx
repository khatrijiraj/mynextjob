"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  TrendingUp,
  Bot,
  GalleryThumbnails,
  MailCheck,
  FileCode2,
  ListChecks,
} from "lucide-react";

const menuItems = [
  { href: "/insights", icon: TrendingUp, label: "AI Industry Insights" },
  { href: "/interview", icon: Bot, label: "AI Mock Interview" },
  { href: "/quiz", icon: GalleryThumbnails, label: "AI Mock Quiz" },
  { href: "/cover", icon: MailCheck, label: "AI Cover Letter" },
  { href: "/resume", icon: FileCode2, label: "AI Resume Builder" },
  { href: "/applications", icon: ListChecks, label: "Job Application Manager" },
];

const MenuItems = () => {
  const pathname = usePathname();

  return (
    <>
      {menuItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <DropdownMenuItem key={href} asChild>
            <Link
              href={href}
              className={`flex items-center gap-3 p-2 transition hover:cursor-pointer ${
                isActive ? "bg-primary text-white" : ""
              }`}>
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          </DropdownMenuItem>
        );
      })}
    </>
  );
};

export default MenuItems;
