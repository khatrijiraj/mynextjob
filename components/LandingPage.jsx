import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  Lightbulb,
  Mail,
  TrendingUp,
  ListTodo,
  FileUser,
  Handshake,
  Sparkle,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="py-60 px-6  flex flex-col justify-center items-center">
      <h1 className="text-5xl text-primary font-extrabold leading-tight text-center">
        AI-Powered Career Assistance
      </h1>
      <p className="mt-6 text-muted-foreground text-lg opacity-90 max-w-2xl text-center">
        AI-powered platform to land your next job — interviews, resumes, cover
        letters, quizzes, applications manager, and industry insights, all in
        one place!
      </p>
      <Link href="/sign-in">
        <Button size="lg" className="mt-8">
          Get Started
        </Button>
      </Link>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="py-24 px-6 bg-muted">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-8 text-center bg-background  hover:scale-105 transition-transform duration-200">
              <step.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground mt-2">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Why Choose CareerAI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-8 bg-muted hover:scale-105 transition-transform duration-200">
              <benefit.icon className="w-14 h-14 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground mt-2">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-muted">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 bg-background rounded-lg shadow-md hover:scale-105 transition-transform duration-200">
              <p className="text-lg italic text-muted-foreground">
                “{testimonial.feedback}”
              </p>
              <h4 className="mt-4 font-semibold text-primary">
                - {testimonial.name}, {testimonial.role}
              </h4>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Pricing Plans
        </h2>
        <p className="mt-3 text-lg opacity-90 text-center text-muted-foreground mb-12">
          Choose the plan that fits your needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className="p-6 bg-muted hover:scale-105 transition-transform duration-200">
              <h3 className="text-xl font-medium text-foreground mb-2">
                {plan.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{plan.price}</p>
              <ul className="mt-4 text-left space-y-2">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/sign-in">
                <Button size="lg" className="w-full mt-6">
                  Get Started
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-36 flex flex-col justify-center items-center text-white bg-muted">
      <h3 className="text-3xl font-bold mb-6 text-center text-primary z-10">
        Join MyNextJob Today!
      </h3>
      <Link href="/sign-in" className="z-10">
        <Button size="lg">Get Started</Button>
      </Link>
    </section>
  );
}
// Data Arrays
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
    description: "Apply to jobs and secure your dream job!",
    icon: ArrowRight,
  },
];

const benefits = [
  {
    title: "AI Resume Builder",
    description:
      "Create a polished and professional resume with AI-driven enhancements.",
    icon: FileUser,
  },
  {
    title: "AI Industry Insights",
    description:
      "Discover tailored job opportunities and industry trends based on your skills.",
    icon: TrendingUp,
  },
  {
    title: "AI Mock Interviews",
    description:
      "Practice with AI-driven interview simulations to boost your confidence.",
    icon: Handshake,
  },
  {
    title: "AI Cover Letter Generator",
    description:
      "Craft compelling cover letters that make a lasting impression.",
    icon: Mail,
  },
  {
    title: "Manage Your Job Applications",
    description:
      "Track and organize your job applications effortlessly in one place.",
    icon: ListTodo,
  },
  {
    title: "AI Mock Quizzes",
    description:
      "Sharpen your skills with AI-generated quizzes tailored to your field.",
    icon: Sparkle,
  },
];

const testimonials = [
  {
    name: "John Doe",
    role: "Software Engineer",
    feedback: "It helped me land a job at my dream company!",
  },
  {
    name: "Jane Smith",
    role: "Product Manager",
    feedback: "AI-powered interviews gave me an edge in my applications.",
  },
  {
    name: "Alice Johnson",
    role: "Data Analyst",
    feedback: "Best investment I made for my career!",
  },
];

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
