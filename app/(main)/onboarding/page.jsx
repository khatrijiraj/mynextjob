import React from "react";
import OnboardingForm from "./_components/OnboardingForm";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import { industries } from "@/data/industries";

const page = async () => {
  //check if user already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();
  if (isOnboarded) {
    redirect("/insights");
  }
  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  )
};

export default page;
