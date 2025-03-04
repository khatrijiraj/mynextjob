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
      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center justify-between mb-5">
        <h1 className="text-6xl font-bold text-primary mb-4">
          Job Applications
        </h1>
        <Link href="/applications/new">
          <Button>
            <Plus />
            Create New
          </Button>
        </Link>
      </div>
      <JobApplicationList applications={applications} />
    </div>
  );
}
