"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LandingPage from "../components/LandingPage";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/insights");
    }
  }, [isSignedIn, router]);

  // If signed in, don't render anything because we're redirecting
  if (isSignedIn) return null;

  return <LandingPage />;
}
