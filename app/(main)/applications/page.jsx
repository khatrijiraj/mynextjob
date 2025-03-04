// app/(main)/applications/page.jsx
import { getJobApplications } from "@/actions/job-application";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobApplicationList from "./_components/job-application-list";

export default async function JobApplicationsPage() {
  const applications = await getJobApplications();

  return (
    <div className="container px-5">
      <div className="flex flex-col gap-6">
        <h1 className="text-6xl font-bold text-primary">Job Applications</h1>
        <Link href="/applications/new">
          <Button>
            <Plus />
            Create New
          </Button>
        </Link>
        <JobApplicationList applications={applications} />
      </div>
    </div>
  );
}
