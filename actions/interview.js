"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function generateInterview(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const prompt = `
    Generate 5 open-ended technical interview questions along with ideal answer explanations 
    based on the following job details:

    - Job Position: ${data?.position}
    - Job Description: ${data?.description}
    - Years of Experience Required: ${data?.experience}
    - Tech Stacks: ${data?.techStack}

    The questions should assess problem-solving, design thinking, and real-world application 
    in ${data?.techStack} development.

    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;

    // Await the text() call to get a string result
    const text = await response.text();

    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const interview = JSON.parse(cleanedText);

    if (!cleanedText.startsWith("{")) {
      console.error("Cleaned response is not valid JSON:", cleanedText);
      throw new Error("API did not return valid JSON");
    }

    return interview.questions;
  } catch (error) {
    console.error("Error generating interview:", error);
    throw new Error("Failed to generate interview questions");
  }
}

export async function saveInterviewResult(questions, answers) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  let totalScore = 0;

  async function evaluateAnswer(question, correctAnswer, userAnswer) {
    const evaluatePrompt = `
      Question: "${question}"
      Ideal Answer: "${correctAnswer}"
      User Answer: "${userAnswer}"

      Return a JSON object with a score from 0 to 10, where:
    - 10 means a perfect answer.
    - 0 means completely incorrect.

    Ensure the response follows this exact format:
    {
      "score": number
    }
    `;

    try {
      const result = await model.generateContent(evaluatePrompt);
      // Await the text() call here as well
      const text = result.response.text();
      const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

      const parsed = JSON.parse(cleanedText);
      return Math.max(0, Math.min(10, parsed.score));
    } catch (error) {
      console.error("Error evaluating answer: ", error);
      return 0;
    }
  }

  // Evaluate all answers asynchronously
  const evaluatedAnswers = await Promise.all(
    questions.map(async (q, index) => {
      const score = await evaluateAnswer(
        q.question,
        q.correctAnswer,
        answers[index]
      );

      totalScore += score; // Accumulate total score // Increment score for correct answers

      return {
        question: q.question,
        answer: q.correctAnswer,
        userAnswer: answers[index],
        score,
        explanation: q.explanation,
      };
    })
  );

  // Get wrong answers
  const wrongAnswers = evaluatedAnswers.filter((q) => !q.isCorrect);

  let improvementTip = null;
  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
      The user got the following technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Keep the response under 2 sentences.
    `;

    try {
      const tipResult = await model.generateContent(improvementPrompt);
      improvementTip = await tipResult.response.text();
      improvementTip = improvementTip.trim();
    } catch (error) {
      console.error("Error generating improvement tip:", error);
    }
  }

  try {
    const interview = await db.interview.create({
      data: {
        userId: user.id,
        interviewScore: totalScore,
        questions: evaluatedAnswers,
        category: "Technical",
        improvementTip,
      },
    });

    return interview;
  } catch (error) {
    console.error("Error saving interview result:", error);
    throw new Error("Failed to save interview result");
  }
}

export async function getInterviews() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const interviews = await db.interview.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return interviews;
  } catch (error) {
    console.error("Error fetching interviews:", error);
    throw new Error("Failed to fetch interviews");
  }
}
