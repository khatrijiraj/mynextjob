// app/(main)/applications/_components/job-application-generator.jsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveJobApplication } from "@/actions/job-application";
import useFetch from "@/hooks/use-fetch";
import { jobApplicationSchema } from "@/app/lib/schema";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JobApplicationGenerator() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(jobApplicationSchema),
  });

  const {
    loading: submitting,
    fn: submitApplicationFn,
    data: submittedApplication,
  } = useFetch(saveJobApplication);

  useEffect(() => {
    if (submittedApplication) {
      toast.success("Job application submitted successfully!");
      router.push("/applications");
      reset();
    }
  }, [submittedApplication, router, reset]);

  const onSubmit = async (data) => {
    try {
      // Process resume file if provided
      const resumeUrl = data.resume;
      await submitApplicationFn({ ...data, resumeUrl });
    } catch (error) {
      toast.error(error.message || "Failed to submit job application");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Provide information about the job you are applying for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="text-sm text-destructive">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobRole">Job Role</Label>
                <Input
                  id="jobRole"
                  placeholder="Enter job role"
                  {...register("jobRole")}
                />
                {errors.jobRole && (
                  <p className="text-sm text-destructive">
                    {errors.jobRole.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                className="min-h-[100px]"
                id="jobDescription"
                placeholder="Enter job description"
                {...register("jobDescription")}
              />
              {errors.jobDescription && (
                <p className="text-sm text-destructive">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Person Name</Label>
                <Input
                  id="contactName"
                  placeholder="Enter contact person name"
                  {...register("contactName")}
                />
                {errors.contactName && (
                  <p className="text-sm text-destructive">
                    {errors.contactName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactInfo">Contact Info</Label>
                <Input
                  id="contactInfo"
                  placeholder="Enter contact info (email or mobile)"
                  {...register("contactInfo")}
                />
                {errors.contactInfo && (
                  <p className="text-sm text-destructive">
                    {errors.contactInfo.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Application Status</Label>
                <select
                  id="status"
                  {...register("status")}
                  className="border rounded w-full p-2">
                  <option value="APPLIED">Applied</option>
                  <option value="INTERVIEW_SCHEDULED">
                    Interview Scheduled
                  </option>
                  <option value="OFFERED">Offered</option>
                  <option value="REJECTED">Rejected</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-destructive">
                    {errors.status.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  type="number"
                  placeholder="Enter salary"
                  {...register("salary")}
                />
                {errors.salary && (
                  <p className="text-sm text-destructive">
                    {errors.salary.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appliedDate">Applied Date</Label>
                <Input
                  id="appliedDate"
                  type="date"
                  {...register("appliedDate")}
                />
                {errors.appliedDate && (
                  <p className="text-sm text-destructive">
                    {errors.appliedDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="resume">Resume Link</Label>
                <Input
                  id="resume"
                  type="text"
                  placeholder="Enter resume link"
                  {...register("resume")}
                />
                {errors.resume && (
                  <p className="text-sm text-destructive">
                    {errors.resume.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userNote">Notes</Label>
              <Textarea
                className="min-h-[100px]"
                id="userNote"
                placeholder="Enter any additional notes"
                {...register("userNote")}
              />
              {errors.userNote && (
                <p className="text-sm text-destructive">
                  {errors.userNote.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
