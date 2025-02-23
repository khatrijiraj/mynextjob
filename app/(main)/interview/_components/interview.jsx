"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateInterview, saveInterviewResult } from "@/actions/interview";
import InterviewResult from "./interview-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

export default function Interview() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingInterview,
    fn: generateInterviewFn,
    data: interviewData,
  } = useFetch(generateInterview);

  const {
    loading: savingResult,
    fn: saveInterviewResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveInterviewResult);

  useEffect(() => {
    if (interviewData) {
      setAnswers(new Array(interviewData.length).fill(null));
    }
  }, [interviewData]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && answers[currentQuestion]) {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestion, answers]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < interviewData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishInterview();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === interviewData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / interviewData.length) * 100;
  };

  const finishInterview = async () => {
    const score = calculateScore();
    try {
      await saveInterviewResultFn(interviewData, answers, score);
      toast.success("Interview completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save interview results");
    }
  };

  const startNewInterview = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateInterviewFn();
    setResultData(null);
  };

  if (generatingInterview) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  // Show results if interview is completed
  if (resultData) {
    return (
      <div className="mx-2">
        <InterviewResult result={resultData} onStartNew={startNewInterview} />
      </div>
    );
  }

  if (!interviewData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Practice 10 interview questions specific to your job description and
            role. Take your time and give the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateInterviewFn} size="lg" className="w-full">
            Start Interview
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = interviewData[currentQuestion];

  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {interviewData.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question.question}</p>
        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-2">
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex flex-col gap-6 items-start">
        <Button
          className="w-full"
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}>
          {savingResult && <Icons.spinner className="size-4 animate-spin" />}
          {currentQuestion < interviewData.length - 1
            ? "Next Question"
            : "Finish Interview"}
        </Button>

        {!showExplanation && (
          <Button
            className="w-full"
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}>
            Show Explanation
          </Button>
        )}
        {showExplanation && (
          <div className="p-4 bg-muted rounded-lg w-full">
            <p className="font-medium">Explanation:</p>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
