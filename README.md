# My Next Job

**My Next Job** is a full-featured Next.js application designed to streamline the job preparation and application process. It provides AI based tools for creating cover letters, resumes, mock interviews, quizzes, and industry insights—all in one platform. Built with modern web technologies, this project offers a robust, scalable, and responsive user experience.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

**My Next Job** is a Next.js project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It’s structured to support a seamless job search experience—from user authentication to generating personalized job application materials. With its modular file system, the project ensures maintainability and scalability while delivering a clean, user-friendly interface.

---

## Features

- **User Authentication:** Secure sign-in and sign-up flows under the `(auth)` directory using Clerk authentication.
- **Job Applications Management:** Manage your applications with dedicated pages and components.
- **Cover Letter Generation:** Create and preview dynamic cover letters.
- **Resume Builder:** Craft and edit professional resumes with ease.
- **Interview Preparation:** Access mock interviews, performance charts, and analytics.
- **Quiz:** Improve your skills with quizzes.
- **Industry Insights:** Weekly update to user specified industry, salary trends, recommended skills etc.
- **Onboarding:** Smooth onboarding experience for new users.
- **Modern UI Components:** Reusable UI elements (accordion, buttons, forms, etc.) for a consistent look and feel.
- **Database Integration:** Neon PostgreSQL Managed via Prisma with migration scripts and a robust schema.
- **API Routes & Business Logic:** Centralized in the `actions` folder for functionalities such as generating cover letters, insights, quizzes, and managing user data.

---

## Project Structure

```
mynextjob
├─ actions
│  ├─ cover-letter.js     # Business logic for cover
│  ├─ insights.js         # Data processing for insights
│  ├─ interview.js        # Interview preparation logic
│  ├─ quiz.js             # Quiz generation and evaluation
│  ├─ resume.js           # Resume builder functionalities
│  └─ user.js             # User management actions
├─ app
│  ├─ (auth)              # Authentication routes and layouts
│  │  ├─ layout.js
│  │  ├─ sign-in
│  │  │  └─ [[...sign-in]]/page.jsx
│  │  └─ sign-up
│  │     └─ [[...sign-up]]/page.jsx
│  ├─ (main)              # Core application pages
│  │  ├─ applications/ page.jsx           # Job application dashboard
│  │  ├─ ats/          page.jsx           # Applicant Tracking System interface
│  │  ├─ cover         # Cover letter module
│  │  │  ├─ new/      page.jsx           # New cover letter creation
│  │  │  ├─ page.jsx                     # List or dashboard view
│  │  │  ├─ [id]/     page.jsx           # Individual cover letter view
│  │  │  └─ _components/                # Reusable cover letter components
│  │  │         ├─ cover-letter-generator.jsx
│  │  │         ├─ cover-letter-list.jsx
│  │  │         └─ cover-letter-preview.jsx
│  │  ├─ insights      # Insights and analytics module
│  │  │  ├─ layout.jsx
│  │  │  ├─ page.jsx
│  │  │  └─ _components/                # Insight view components
│  │  │         └─ insights-view.jsx
│  │  ├─ interview     # Interview preparation module
│  │  │  ├─ layout.js
│  │  │  ├─ mock/     page.jsx           # Mock interview sessions
│  │  │  ├─ page.jsx
│  │  │  └─ _components/                # Reusable interview components
│  │  │         ├─ interview-list.jsx
│  │  │         ├─ interview-result.jsx
│  │  │         ├─ interview.jsx
│  │  │         ├─ performace-chart.jsx
│  │  │         └─ stats-cards.jsx
│  │  ├─ onboarding   # User onboarding process
│  │  │  ├─ page.jsx
│  │  │  └─ _components/
│  │  │         └─ OnboardingForm.jsx
│  │  ├─ quiz         # Quiz module for skill evaluation
│  │  │  ├─ layout.js
│  │  │  ├─ mock/     page.jsx
│  │  │  ├─ page.jsx
│  │  │  └─ _components/                # Reusable quiz components
│  │  │         ├─ performace-chart.jsx
│  │  │         ├─ quiz-list.jsx
│  │  │         ├─ quiz-result.jsx
│  │  │         ├─ quiz.jsx
│  │  │         └─ stats-cards.jsx
│  │  └─ resume       # Resume builder module
│  │     ├─ layout.js
│  │     ├─ page.jsx
│  │     └─ _components/
│  │             ├─ entry-form.jsx
│  │             └─ resume-builder.jsx
│  ├─ api               # API routes (e.g., inngest webhook handling)
│  │  └─ inngest/      route.js
│  ├─ globals.css      # Global styles for the app
│  ├─ layout.js        # Main layout for public pages
│  ├─ lib/             # App-specific helpers and schema definitions
│  │  ├─ helper.js
│  │  └─ schema.js
│  ├─ not-found.jsx    # Custom 404 page
│  └─ page.js          # Landing or home page
├─ components           # Reusable UI components
│  ├─ clerk-theme-provider.jsx
│  ├─ Footer.jsx
│  ├─ Header.jsx
│  ├─ LandingPage.jsx
│  ├─ theme-provider.jsx
│  ├─ theme-toggle.jsx
│  └─ ui/             # Collection of generic UI elements (accordion, buttons, etc.)
│         ├─ accordion.jsx
│         ├─ alert-dialog.jsx
│         ├─ alert.jsx
│         ├─ aspect-ratio.jsx
│         ├─ avatar.jsx
│         ├─ badge.jsx
│         ├─ breadcrumb.jsx
│         ├─ button.jsx
│         ├─ calendar.jsx
│         ├─ card.jsx
│         ├─ carousel.jsx
│         ├─ chart.jsx
│         ├─ checkbox.jsx
│         ├─ collapsible.jsx
│         ├─ command.jsx
│         ├─ context-menu.jsx
│         ├─ dialog.jsx
│         ├─ drawer.jsx
│         ├─ dropdown-menu.jsx
│         ├─ form.jsx
│         ├─ hover-card.jsx
│         ├─ icons.jsx
│         ├─ input-otp.jsx
│         ├─ input.jsx
│         ├─ label.jsx
│         ├─ menubar.jsx
│         ├─ navigation-menu.jsx
│         ├─ pagination.jsx
│         ├─ popover.jsx
│         ├─ progress.jsx
│         ├─ radio-group.jsx
│         ├─ resizable.jsx
│         ├─ scroll-area.jsx
│         ├─ select.jsx
│         ├─ separator.jsx
│         ├─ sheet.jsx
│         ├─ sidebar.jsx
│         ├─ skeleton.jsx
│         ├─ slider.jsx
│         ├─ sonner.jsx
│         ├─ switch.jsx
│         ├─ table.jsx
│         ├─ tabs.jsx
│         ├─ textarea.jsx
│         ├─ toast.jsx
│         ├─ toaster.jsx
│         ├─ toggle-group.jsx
│         ├─ toggle.jsx
│         └─ tooltip.jsx
├─ components.json    # Component configuration or metadata
├─ eslint.config.mjs  # ESLint configuration
├─ hooks              # Custom React hooks for common functionality
│  ├─ use-fetch.js
│  ├─ use-mobile.jsx
│  └─ use-toast.js
├─ jsconfig.json      # JavaScript project configuration
├─ lib                # Additional utilities and integrations
│  ├─ checkUser.js
│  ├─ inngest/
│  │     ├─ client.js
│  │     └─ functions.js
│  ├─ prisma.js      # Prisma client integration
│  └─ utils.js
├─ middleware.js      # Custom middleware for request handling
├─ next.config.mjs    # Next.js configuration
├─ package-lock.json
├─ package.json       # Project dependencies and scripts
├─ postcss.config.mjs # PostCSS configuration
├─ prisma             # Database schema and migration files
│  ├─ migrations/
│  │     ├─ 20250207175001_create_models/
│  │     │     └─ migration.sql
│  │     └─ migration_lock.toml
│  └─ schema.prisma   # Prisma schema definition
├─ public             # Static assets (images, fonts, etc.)
├─ README.md          # This file
└─ tailwind.config.mjs# Tailwind CSS configuration
```

---

## Technologies Used

- Next.js: React framework for server-side rendering and static site generation.
- ReactJS & JavaScript/JSX: Core languages for building the user interface and application logic.
- ShadCN: A modern design system for building sleek, reusable UI components.
- Clerk: Secure user authentication and session management.
- Prisma: Modern ORM for efficient database management.
- Neon & PostgreSQL: Scalable cloud database solution with PostgreSQL.
- Tailwind CSS: Utility-first CSS framework for rapid UI development.
- Node & npm: Runtime and package manager for backend services.
- Inngest: Event-driven workflows for integrating asynchronous operations.
- Google Gemini: Advanced AI capabilities powering intelligent features.
- Vercel: Seamless deployment and hosting platform.
- Git & GitHub: Version control and collaborative development.

---

## Installation & Setup

### Prerequisites

- **Node.js** (v16+ recommended)
- **npm** / **yarn** / **pnpm**
- A supported database (configured via Prisma)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/khatrijiraj/mynextjob.git
   cd mynextjob
   ```

2. **Install Dependencies:**

   Using npm:

   ```bash
   npm install --legacy-peer-deps
   ```

   Or with yarn:

   ```bash
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the project root. At a minimum, set your database connection string:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
   NEON_PASSWORD=
   DATABASE_URL=
   GEMINI_API_KEY=
   ```

4. **Set Up the Database:**

   If you are using Prisma, run:

   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

---

## Running the Project

### Development Mode

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

Build and start the production server:

```bash
npm run build
npm start
```

---

## Deployment

The simplest way to deploy is using [Vercel](https://vercel.com). Connect your GitHub repository to Vercel and the platform will handle the rest. For further details, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## Contributing

Contributions are highly welcome! To get started:

1. **Fork the repository.**
2. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit your changes** with clear and descriptive messages:
   ```bash
   git commit -m "Add feature XYZ"
   ```
4. **Push to your branch**:
   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a pull request** for review.

Please adhere to the existing coding style and update tests as necessary.

---

## Contact

For any questions, feedback, or support, please reach out via:

- **GitHub Issues:** [Submit an Issue](https://github.com/khatrijiraj/mynextjob/issues)
- **Email:** khatriraj030@gmail.com
