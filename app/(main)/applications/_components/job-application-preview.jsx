"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { jobApplicationSchema } from "@/app/lib/schema";
import { updateJobApplication } from "@/actions/job-application";

// Helper function to format salary according to Indian numbering system
const formatSalary = (salary) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(salary);
};

export default function JobApplicationPreview({ application, onUpdate }) {
  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      jobRole: application?.jobRole || "",
      companyName: application?.companyName || "",
      jobDescription: application?.jobDescription || "",
      status: application?.status || "APPLIED",
      contactName: application?.contactName || "",
      contactInfo: application?.contactInfo || "",
      salary: application?.salary || "",
      resumeUrl: application?.resumeUrl || "",
      userNote: application?.userNote || "",
      appliedDate: application
        ? new Date(application.appliedDate).toISOString().split("T")[0]
        : "",
    },
  });

  // Use watch to get current status value from the form state
  const statusValue = watch("status");

  const onSubmit = async (data) => {
    try {
      const updatedApp = await updateJobApplication(application.id, data);
      toast.success("Job application updated successfully!");
      setEditMode(false);
      // Pass updated data to the parent so it can update the preview
      if (onUpdate) onUpdate(updatedApp);
      reset(data); // Update default values after save
    } catch (error) {
      toast.error(error.message || "Failed to update job application");
    }
  };

  if (!application) return <p>No application found.</p>;

  if (editMode) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 shadow rounded space-y-4">
        <h2 className="text-3xl font-bold">Edit Application</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block font-semibold">Job Role</label>
            <Input {...register("jobRole")} />
            {errors.jobRole && (
              <p className="text-sm text-destructive">
                {errors.jobRole.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block font-semibold">Company Name</label>
            <Input {...register("companyName")} />
            {errors.companyName && (
              <p className="text-sm text-destructive">
                {errors.companyName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-semibold">Job Description</label>
          <Textarea className="min-h-[100px]" {...register("jobDescription")} />
          {errors.jobDescription && (
            <p className="text-sm text-destructive">
              {errors.jobDescription.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block font-semibold">Status</label>
            <Select
              onValueChange={(value) => setValue("status", value)}
              value={statusValue} // Use the current form state
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="APPLIED">Applied</SelectItem>
                <SelectItem value="INTERVIEW_SCHEDULED">
                  Interview Scheduled
                </SelectItem>
                <SelectItem value="OFFERED">Offered</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-destructive">
                {errors.status.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block font-semibold">Salary</label>
            <Input type="number" {...register("salary")} />
            {errors.salary && (
              <p className="text-sm text-destructive">
                {errors.salary.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block font-semibold">Contact Name</label>
            <Input {...register("contactName")} />
            {errors.contactName && (
              <p className="text-sm text-destructive">
                {errors.contactName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block font-semibold">Contact Info</label>
            <Input {...register("contactInfo")} />
            {errors.contactInfo && (
              <p className="text-sm text-destructive">
                {errors.contactInfo.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block font-semibold">Resume URL</label>
            <Input {...register("resumeUrl")} />
            {errors.resumeUrl && (
              <p className="text-sm text-destructive">
                {errors.resumeUrl.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block font-semibold">Applied Date</label>
            <Input type="date" {...register("appliedDate")} />
            {errors.appliedDate && (
              <p className="text-sm text-destructive">
                {errors.appliedDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-semibold">User Note</label>
          <Textarea className="min-h-[100px]" {...register("userNote")} />
          {errors.userNote && (
            <p className="text-sm text-destructive">
              {errors.userNote.message}
            </p>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => setEditMode(false)}>
          Cancel
        </Button>
        <br />
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    );
  }

  // Preview mode
  return (
    <div className="p-6 shadow rounded space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-3xl font-bold">
          {application.jobRole} at {application.companyName}
        </h2>
        <Button onClick={() => setEditMode(true)}>Edit</Button>
      </div>
      <div className="space-y-4">
        <p className="text-sm">
          <span className="font-semibold text-xl">Job Description</span>
          <br />
          {application.jobDescription}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-xl">Status</span>
          <br />
          {application.status}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-xl">Contact</span>
          <br />
          {application.contactName} &mdash; {application.contactInfo}
        </p>
        {application.salary && (
          <p className="text-sm">
            <span className="font-semibold text-xl">Salary</span>
            <br />
            {formatSalary(application.salary)}
          </p>
        )}
        <p className="text-sm">
          <span className="font-semibold text-xl">Applied Date</span>
          <br />
          {new Date(application.appliedDate).toLocaleDateString()}
        </p>
        {application.resumeUrl && (
          <p className="text-sm">
            <span className="font-semibold text-xl">Resume</span>
            <br />
            <a
              href={application.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline">
              View Resume
            </a>
          </p>
        )}
        {application.userNote && (
          <p className="text-sm">
            <span className="font-semibold text-xl">Note</span>
            <br />
            {application.userNote}
          </p>
        )}
      </div>
    </div>
  );
}
