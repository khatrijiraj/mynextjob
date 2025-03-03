"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      className="rounded-full border-2 border-primary"
      size="icon"
      onClick={toggleTheme}>
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
}
