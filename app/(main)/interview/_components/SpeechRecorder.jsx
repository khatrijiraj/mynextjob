"use client";

import { useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

export default function SpeechRecorder({ onAnswer }) {
  const { error, isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({ continuous: true });

  useEffect(() => {
    if (!isRecording && results.length > 0) {
      // Send only the transcript for the current question.
      onAnswer(results.join(" "));
    }
  }, [isRecording, results, onAnswer]);

  return (
    <div className="space-y-4">
      <Button
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
        variant={isRecording ? "destructive" : "secondary"}
        className={`w-full ${isRecording ? "animate-pulse" : ""}`}>
        <Mic className="mr-2 h-4 w-4" />
        {isRecording ? "Stop Recording" : "Record Answer"}
      </Button>
      {error && <p className="text-destructive">Error: {error}</p>}
      <p className="p-4 bg-muted rounded-md text-muted-foreground">
        <h3 className="font-medium">Your Answer: </h3>
        {results.length > 0
          ? results.join(" ")
          : "Your answer will appear here..."}
      </p>
    </div>
  );
}
