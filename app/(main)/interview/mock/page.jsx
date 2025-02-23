import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Interview from "../_components/interview";

export default function MockInterviewPage() {
  return (
    <div className="container mx-auto space-y-4">
      <div className="flex flex-col space-y-2 mx-2">
        <Link href="/interview">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        <div>
          <h1 className="text-6xl font-bold text-primary">Mock Interview</h1>
          <p className="text-muted-foreground">
            Test your knowledge with a mock interview
          </p>
        </div>
      </div>

      <Interview />
    </div>
  );
}
