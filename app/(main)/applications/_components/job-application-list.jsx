"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Eye, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteJobApplication } from "@/actions/job-application";
import JobApplicationPreview from "./job-application-preview";

// Helper function to format salary according to Indian numbering system
const formatSalary = (salary) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(salary);
};

export default function JobApplicationList({ applications }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState("appliedDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteJobApplication(id);
      toast.success("Job application deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete job application");
    }
  };

  // Filter applications based on search query and status
  const filteredApplications = useMemo(() => {
    let filtered = applications;
    if (searchQuery) {
      filtered = filtered.filter((app) =>
        [app.companyName, app.jobRole, app.jobDescription]
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }
    return filtered;
  }, [applications, searchQuery, statusFilter]);

  // Sorting logic: when a header is clicked, sort by that field
  const sortedApplications = useMemo(() => {
    const sorted = [...filteredApplications];
    sorted.sort((a, b) => {
      let aKey = a[sortKey];
      let bKey = b[sortKey];
      if (["appliedDate", "createdAt", "updatedAt"].includes(sortKey)) {
        aKey = new Date(aKey);
        bKey = new Date(bKey);
      }
      if (sortKey === "salary") {
        aKey = aKey ?? 0;
        bKey = bKey ?? 0;
      }
      if (aKey < bKey) return sortOrder === "asc" ? -1 : 1;
      if (aKey > bKey) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredApplications, sortKey, sortOrder]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (!applications?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Job Applications Yet</CardTitle>
          <CardDescription>
            Create your first job application to get started
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div>
      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Input
          placeholder="Search by company, role, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-background"
        />
        <Select onValueChange={setStatusFilter} value={statusFilter}>
          <SelectTrigger className="w-full lg:w-[200px] bg-background">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="APPLIED">Applied</SelectItem>
            <SelectItem value="INTERVIEW_SCHEDULED">
              Interview Scheduled
            </SelectItem>
            <SelectItem value="OFFERED">Offered</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Applications Table */}
      <div className="rounded-md overflow-hidden shadow bg-background">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary/90">
              <TableHead
                className="px-4 py-2 cursor-pointer text-primary-foreground"
                onClick={() => handleSort("companyName")}>
                Company{" "}
                {sortKey === "companyName" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="px-4 py-2 cursor-pointer text-primary-foreground"
                onClick={() => handleSort("jobRole")}>
                Role{" "}
                {sortKey === "jobRole" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="px-4 py-2 text-primary-foreground">
                Description
              </TableHead>
              <TableHead
                className="px-4 py-2 cursor-pointer text-primary-foreground"
                onClick={() => handleSort("appliedDate")}>
                Date{" "}
                {sortKey === "appliedDate" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="px-4 py-2 cursor-pointer text-primary-foreground"
                onClick={() => handleSort("salary")}>
                Salary{" "}
                {sortKey === "salary" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="px-4 py-2 cursor-pointer text-primary-foreground"
                onClick={() => handleSort("status")}>
                Status{" "}
                {sortKey === "status" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="px-4 py-2 text-primary-foreground">
                Contact
              </TableHead>
              <TableHead className="px-4 py-2 text-primary-foreground">
                Notes
              </TableHead>
              <TableHead className="px-4 py-2 text-primary-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border">
            {sortedApplications.map((app) => (
              <TableRow
                key={app.id}
                onClick={() => setSelectedApplication(app)}
                className="hover:cursor-pointer">
                <TableCell className=" px-4 py-2 text-foreground">
                  {app.companyName}
                </TableCell>
                <TableCell className=" px-4 py-2 text-foreground">
                  {app.jobRole}
                </TableCell>
                <TableCell
                  className=" px-4 py-2 text-foreground max-w-xs truncate"
                  title={app.jobDescription}>
                  {app.jobDescription}
                </TableCell>
                <TableCell className=" px-4 py-2 text-foreground">
                  {new Date(app.appliedDate).toLocaleDateString()}
                </TableCell>
                <TableCell className=" px-4 py-2 text-foreground">
                  {app.salary ? formatSalary(app.salary) : "N/A"}
                </TableCell>
                <TableCell className=" px-4 py-2 text-foreground">
                  {app.status.replace("_", " ")}
                </TableCell>
                <TableCell className=" px-4 py-2 text-foreground">
                  {app.contactName} ({app.contactInfo})
                </TableCell>
                <TableCell
                  className=" px-4 py-2 text-foreground max-w-xs truncate"
                  title={app.userNote || "N/A"}>
                  {app.userNote || "N/A"}
                </TableCell>
                <TableCell className=" px-4 py-2">
                  <div className="flex items-center space-x-2">
                    {/* Open the preview modal on click */}
                    <Button
                      size="icon"
                      onClick={() => setSelectedApplication(app)}>
                      <Eye />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(app.id)}>
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={9} className="px-4 py-2">
                Total Applications: {sortedApplications.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      {/* Modal Dialog for Job Application Preview */}
      <Dialog
        open={!!selectedApplication}
        onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Job Application Preview</DialogTitle>
          </DialogHeader>
          <JobApplicationPreview application={selectedApplication} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
