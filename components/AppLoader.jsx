// components/AppLoader.js
"use client";
import { Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

export default function AppLoader({ children }) {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    // Render a full-page loader to cover header, main, and footer
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <p>Loading...</p>
      </div>
    );
  }

  return children;
}
