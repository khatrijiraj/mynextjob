// app/(main)/applications/new/page.jsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobApplicationGenerator from "../_components/job-application-generator";

export default function NewJobApplicationPage() {
  return (
    <div className="container mx-auto px-5">
      <div className="flex flex-col space-y-2">
        <Link href="/applications">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Applications
          </Button>
        </Link>
        <div className="pb-6">
          <h1 className="text-6xl font-bold text-primary">
            Create Job Application
          </h1>
          <p className="mt-6 text-muted-foreground">
            Fill in the details for your job application.
          </p>
        </div>
      </div>
      <JobApplicationGenerator />
    </div>
  );
}
