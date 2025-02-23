"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex md:items-center justify-between flex-col md:flex-row gap-4 items-start">
            <div>
              <CardTitle className="gradient-title text-3xl md:text-4xl">
                Recent Quizzes
              </CardTitle>
              <CardDescription>
                Review your past quiz performance
              </CardDescription>
            </div>
            <Button
              onClick={() => router.push("/quiz/mock")}
              className=" w-48 h-10">
              Start New Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments
              ?.slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((assessment, i) => (
                <Card
                  key={assessment.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedQuiz(assessment)}>
                  <CardHeader>
                    <CardTitle>
                      {i + 1}
                      {". "}
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy - HH:mm"
                      )}
                    </CardTitle>
                    <CardDescription className="flex justify-between w-full">
                      <div>Grades: {assessment.quizScore.toFixed(1)}%</div>
                    </CardDescription>
                  </CardHeader>
                  {assessment.improvementTip && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {assessment.improvementTip}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/quiz/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
