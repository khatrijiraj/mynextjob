// actions/job-application.js
"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Save a new job application
export async function saveJobApplication(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  const application = await db.jobApplication.create({
    data: {
      companyName: data.companyName,
      jobRole: data.jobRole,
      jobDescription: data.jobDescription,
      status: data.status,
      contactName: data.contactName,
      contactInfo: data.contactInfo,
      salary: data.salary ? Number(data.salary) : null,
      appliedDate: new Date(data.appliedDate),
      resumeUrl: data.resumeUrl || null,
      userNote: data.userNote,
      userId: user.id,
    },
  });

  return application;
}

// Get all job applications for the current user
export async function getJobApplications() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  return await db.jobApplication.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

// Get a single job application by ID
export async function getJobApplication(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  return await db.jobApplication.findFirst({
    where: { id, userId: user.id },
  });
}

// Delete a job application
export async function deleteJobApplication(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  return await db.jobApplication.delete({
    where: { id },
  });
}

//update application function
export async function updateJobApplication(id, data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Ensure the user exists
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  // Confirm that the job application belongs to the current user
  const application = await db.jobApplication.findFirst({
    where: { id, userId: user.id },
  });
  if (!application) throw new Error("Job application not found");

  // Update the job application with the new data
  return await db.jobApplication.update({
    where: { id },
    data: {
      companyName: data.companyName,
      jobRole: data.jobRole,
      jobDescription: data.jobDescription,
      status: data.status,
      contactName: data.contactName,
      contactInfo: data.contactInfo,
      salary: data.salary ? Number(data.salary) : null,
      appliedDate: new Date(data.appliedDate),
      resumeUrl: data.resumeUrl || null,
      userNote: data.userNote,
    },
  });
}
