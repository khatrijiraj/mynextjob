import { getIndustryInsights } from "@/actions/insights";
import InsightsView from "./_components/insights-view";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function InsightsPage() {
  const { isOnboarded } = await getUserOnboardingStatus();

  // If not onboarded, redirect to onboarding page
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  // Skip this check if already on the onboarding page
  const insights = await getIndustryInsights();

  return (
    <div className="container mx-auto">
      <InsightsView insights={insights} />
    </div>
  );
}
