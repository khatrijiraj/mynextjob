import { getInterviews } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performace-chart";
import InterviewList from "./_components/interview-list";

export default async function InterviewPrepPage() {
  const interviews = await getInterviews();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold text-primary">AI Mock Interview</h1>
      </div>
      <div className="space-y-6">
        <StatsCards interviews={interviews} />
        <PerformanceChart interviews={interviews} />
        <InterviewList interviews={interviews} />
      </div>
    </div>
  );
}
