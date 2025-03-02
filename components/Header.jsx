import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { ModeToggle } from "../components/theme-toggle";
import { Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileCode2,
  Sparkles,
  TrendingUp,
  ChevronDown,
  Bot,
  FileSearch,
  GalleryThumbnails,
  ListChecks,
  MailCheck,
} from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <header className="bg-background container flex justify-between items-center px-4 h-16 fixed top-0 w-full border-b z-50">
      <Link href={"/"}>
        <span className="text-xl font-black text-primary">MyNextJob</span>
      </Link>

      <div className="flex gap-6 items-center">
        <SignedOut>
          <ModeToggle />
          <Link href="/sign-in">
            <Button className="items-center">
              <Mail />
              Sign In
            </Button>
          </Link>
        </SignedOut>

        <SignedIn>
          <DropdownMenu className="cursor-pointer">
            <DropdownMenuTrigger asChild>
              <Button className="relative inline-flex h-auto overflow-hidden rounded-full p-1">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex gap-2 h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-5 py-2 text-sm font-medium text-foreground backdrop-blur-3xl">
                  <Sparkles />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown />
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60 text-lg">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/resume" className="flex items-center gap-2">
                  <FileCode2 />
                  Resume Builder
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/interview" className="flex items-center gap-2">
                  <Bot />
                  AI Mock Interview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/insights" className="flex items-center gap-2">
                  <TrendingUp />
                  Industry Insights
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/quiz" className="flex items-center gap-2">
                  <GalleryThumbnails />
                  AI Mock Quiz
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/ats" className="flex items-center gap-2">
                  <FileSearch />
                  ATS Score
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/applications" className="flex items-center gap-2">
                  <ListChecks />
                  Application Manager
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/cover" className="flex items-center gap-2">
                  <MailCheck />
                  AI Cover Letter
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />

          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
                userButtonPopoverCard: "shadow-xl",
                userPreviewMainIdentifier: "font-semibold text-purple-600",
              },
            }}
          />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
