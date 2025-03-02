"use client";
import { Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppLoader({ children }) {
  const { isLoaded } = useAuth();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Simulate loading delay
    return () => clearTimeout(timeout);
  }, [pathname]); // Re-run on route change

  if (!isLoaded || loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        <p>Loading...</p>
      </div>
    );
  }

  return children;
}
