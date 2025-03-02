"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LandingPage from "../components/LandingPage";

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/insights");
    }
  }, [isLoaded, isSignedIn, router]);

  // Prevent flickering by showing nothing until auth is loaded
  if (!isLoaded) return null;

  // If signed in, don't render anything because we're redirecting
  if (isSignedIn) return null;

  return <LandingPage />;
}
