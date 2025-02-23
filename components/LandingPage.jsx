import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  Lightbulb,
  Shield,
  Users,
  TrendingUp,
  FileText,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      {/* HERO SECTION */}
      <section className="text-center py-24 px-6">
        <h1 className="text-6xl font-extrabold text-primary leading-tight">
          AI-Powered Career Assistance
        </h1>
        <p className="mt-5 text-lg opacity-80 max-w-2xl mx-auto">
          Land your dream job faster with AI-powered resumes, interview prep,
          and career guidance.
        </p>
        <Link href="/sign-in">
          <Button
            size="lg"
            className="mt-8 px-10 py-4 bg-primary text-primary-foreground">
            Get Started
          </Button>
        </Link>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-primary">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-8 text-center bg-card rounded-lg shadow-lg">
              <step.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground mt-2">{step.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="bg-secondary py-24 text-center px-6">
        <h2 className="text-4xl font-bold text-primary">
          Why Choose CareerAI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12 px-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-8 bg-card rounded-lg shadow-lg">
              <benefit.icon className="w-14 h-14 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold">{benefit.title}</h3>
              <p className="text-muted-foreground mt-2">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold text-primary">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 bg-card rounded-lg shadow-md">
              <p className="text-lg italic text-muted-foreground">
                “{testimonial.feedback}”
              </p>
              <h4 className="mt-4 font-semibold text-primary">
                - {testimonial.name}, {testimonial.role}
              </h4>
            </Card>
          ))}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="bg-primary text-primary-foreground text-center py-24">
        <h2 className="text-4xl font-bold">Pricing Plans</h2>
        <p className="mt-3 text-lg opacity-90">
          Choose the plan that fits your needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12 px-6">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className="p-6 bg-background text-primary rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold">{plan.title}</h3>
              <p className="mt-2 text-muted-foreground">{plan.price}</p>
              <ul className="mt-4 text-left space-y-2">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="w-full mt-6 bg-primary text-primary-foreground">
                  Get Started
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="text-center py-16">
        <h3 className="text-3xl font-bold text-primary">
          Join MyNextJob Today
        </h3>
        <Link href="/sign-in">
          <Button
            size="lg"
            className="mt-6 bg-primary text-primary-foreground px-10 py-4">
            Get Started
          </Button>
        </Link>
      </section>
    </div>
  );
}

// Step-by-Step Process
const steps = [
  {
    title: "1. Get AI Insights",
    description:
      "Receive real-time suggestions of market outlook, get skills recommendation, see salaries in various domains.",
    icon: Lightbulb,
  },
  {
    title: "2. Give Mock Interviews",
    description:
      "Prepare for interview by giving mock interview and quiz to AI based on your skills, industry, experience and job description",
    icon: Lightbulb,
  },
  {
    title: "3. Apply & Succeed",
    description: "Land interviews and secure your dream job!",
    icon: ArrowRight,
  },
];

// Benefits Section
const benefits = [
  {
    title: "AI Resume Builder",
    description: "Stand out with AI-powered resume improvements.",
    icon: TrendingUp,
  },
  {
    title: "AI Industry Insights",
    description: "Get job recommendations based on your skills.",
    icon: Users,
  },
  {
    title: "AI Mock Interviews",
    description: "Get job recommendations based on your skills.",
    icon: Users,
  },
  {
    title: "AI Cover Letter Generator",
    description: "Get job recommendations based on your skills.",
    icon: Users,
  },
  {
    title: "Manage your job applications",
    description: "Get job recommendations based on your skills.",
    icon: Users,
  },
  {
    title: "Check your resume ATS Score",
    description: "Get job recommendations based on your skills.",
    icon: Users,
  },
  {
    title: "AI based mock quizzes",
    description: "Get job recommendations based on your skills.",
    icon: Users,
  },
  {
    title: "Secure & Private",
    description: "Your data is encrypted and never shared.",
    icon: Shield,
  },
];

// Testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    feedback: "It helped me land a job at Amazon!",
  },
  {
    name: "Mark Lee",
    role: "Product Manager",
    feedback: "AI-powered interviews gave me an edge in my applications.",
  },
  {
    name: "Emma Davis",
    role: "Data Scientist",
    feedback: "Best investment I made for my career!",
  },
];

// Pricing Plans
const pricingPlans = [
  {
    title: "Free Plan",
    price: "₹0/month",
    features: [
      "Basic Resume Builder",
      "Limited AI Interviews & Quizzes",
      "One time Industry Insights",
      "Limited Job applications management",
      "Limited Cover letters",
    ],
  },
  {
    title: "Pro Plan",
    price: "₹69/month",
    features: [
      "Advanced AI Resume Builder",
      "Unlimited AI Interviews and Quizzes",
      "Weekly update to Industry Insights",
      "Unlimited Job applications management",
      "Unlimited Cover letters",
    ],
  },
];
