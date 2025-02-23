import React from "react";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container py-12 bg-background text-foreground">
      <div className="container mx-auto px-6">
        {/* Main footer content */}
        <div className="text-center mb-8">
          <p className="mt-2">
            Developed by{" "}
            <Link
              className="text-primary"
              target="_blank"
              href={"https://github.com/khatrijiraj/"}>
              @khatrijiraj
            </Link>
          </p>
        </div>

        {/* Additional footer links */}
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="/privacy-policy"
            className="text-muted-foreground hover:underline">
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="text-muted-foreground hover:underline">
            Terms of Service
          </a>
          <a href="/contact" className="text-muted-foreground hover:underline">
            Contact Us
          </a>
        </div>

        {/* Social media icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="https://github.com/khatrijiraj"
            target="_blank"
            rel="noopener noreferrer">
            <Github className="text-muted-foreground" size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/khatrijiraj"
            target="_blank"
            rel="noopener noreferrer">
            <Linkedin className="text-muted-foreground" size={24} />
          </a>
        </div>

        {/* Footer bottom text */}
        <div className="text-center text-xs text-muted-foreground">
          <p className="mb-8">
            Powered by NextJs &bull; ShadCN &bull; Clerk &bull; Prisma &bull;
            Neon &bull; PostgreSQL &bull; TailwindCSS &bull; ReactJS &bull;
            JavaScript &bull; Node &bull; npm &bull; Inngest &bull; Google
            Gemini &bull; Vercel &bull; Git &bull; GitHub
          </p>
          <p>Copyright &copy; 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
