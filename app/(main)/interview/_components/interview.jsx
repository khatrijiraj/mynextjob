"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateInterview, saveInterviewResult } from "@/actions/interview";
import useFetch from "@/hooks/use-fetch";
import { interviewSchema } from "@/app/lib/schema";
import Webcam from "react-webcam";
import SpeechRecorder from "./SpeechRecorder";
import InterviewResult from "./interview-result"; // Import the InterviewResult component

export default function Interview() {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(interviewSchema),
  });

  const {
    loading: generatingInterview,
    fn: generateInterviewFn,
    data: interviewData,
  } = useFetch(generateInterview);
  const {
    loading: savingResult,
    fn: saveInterviewResultFn,
    data: resultData,
  } = useFetch(saveInterviewResult);

  const handleNext = () => {
    if (currentQuestion < interviewData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishInterview();
    }
  };

  const finishInterview = async () => {
    setIsSubmitting(true);
    try {
      await saveInterviewResultFn(interviewData, answers);
      toast.success("Interview completed!");
      // Optionally, you can keep isSubmitting true to disable further actions
    } catch (error) {
      toast.error(error.message || "Failed to save interview results");
      setIsSubmitting(false); // re-enable if error occurs
    }
  };

  const onSubmit = async (data) => {
    try {
      await generateInterviewFn(data);
      setInterviewStarted(true);
    } catch (error) {
      toast.error(error.message || "Failed to generate interview");
    }
  };

  // If the interview is complete and resultData is available, display the results
  if (resultData) {
    return (
      <InterviewResult
        result={resultData}
        onStartNew={() => {
          // Reset states to start a new interview if needed
          setInterviewStarted(false);
          setCurrentQuestion(0);
          setAnswers([]);
        }}
      />
    );
  }

  if (!interviewStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Enter Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input {...register("position")} placeholder="Enter job title" />
              {errors.position && (
                <p className="text-sm text-destructive">
                  {errors.position.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Job Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Enter job description"
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Years of Experience</Label>
              <Input
                {...register("experience")}
                type="number"
                placeholder="Enter years of experience"
              />
            </div>

            <div className="space-y-2">
              <Label>Tech Stack</Label>
              <Input
                {...register("techStack")}
                placeholder="Enter technologies (comma-separated)"
              />
            </div>

            <Button
              type="submit"
              disabled={generatingInterview}
              className="w-full">
              {generatingInterview ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Start Interview"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  // Render the current interview question
  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {interviewData.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">
          {interviewData[currentQuestion].question}
        </p>
        <div>
          <Webcam className="w-full max-w-sm border rounded" />
        </div>
        {/* The key forces a remount each time the question changes */}
        <SpeechRecorder
          key={currentQuestion}
          onAnswer={(answer) => {
            const newAnswers = [...answers];
            newAnswers[currentQuestion] = answer;
            setAnswers(newAnswers);
          }}
        />
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || isSubmitting}
          className="w-full">
          {currentQuestion < interviewData.length - 1 ? (
            "Next Question"
          ) : isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Finish Interview"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
