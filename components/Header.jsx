import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles, ChevronDown } from "lucide-react";
import { checkUser } from "@/lib/checkUser";
import MenuItems from "./MenuItems"; // adjust the path as needed

const Header = async () => {
  await checkUser();
  return (
    <header className="bg-background container flex justify-between items-center px-4 h-16 fixed top-0 w-full border-b z-50 shadow-md">
      <Link href="/" className="text-xl font-black text-primary ">
        MyNextJob
      </Link>

      <div className="flex gap-4 items-center">
        <SignedOut>
          <ThemeToggle />
          <Link href="/sign-in">
            <Button>
              <Mail />
              Sign In
            </Button>
          </Link>
        </SignedOut>

        <SignedIn>
          <DropdownMenu>
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
            <DropdownMenuContent>
              <MenuItems />
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 border-2 border-primary",
                userPreviewMainIdentifier: "text-foreground",
              },
            }}
          />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
