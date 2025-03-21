# MyNextJob

**MyNextJob** is a full-featured Next.js application designed to streamline the job preparation and application process. It provides AI based tools for creating cover letters, resumes, mock interviews, quizzes, and industry insights—all in one platform. Built with modern web technologies, this project offers a robust, scalable, and responsive user experience.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Contact](#contact)

## Overview

**MyNextJob** is a Next.js project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It’s structured to support a seamless job search experience—from user authentication to generating personalized job application materials. With its modular file system, the project ensures maintainability and scalability while delivering a clean, user-friendly interface.

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

   Create a `.env` file in the project root

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
   NEON_PASSWORD=
   DATABASE_URL=
   GEMINI_API_KEY=
   ```

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

## Deployment

The simplest way to deploy is using [Vercel](https://vercel.com). Connect your GitHub repository to Vercel and the platform will handle the rest. For further details, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

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

## Contact

For any questions, feedback, or support, please reach out via:

- **GitHub Issues:** [Submit an Issue](https://github.com/khatrijiraj/mynextjob/issues)
- **Email:** [khatriraj030@gmail.com](mailto:khatriraj030@gmail.com)

## Project Structure

```bash
mynextjob
├─ actions
│  ├─ cover-letter.js
│  ├─ insights.js
│  ├─ interview.js
│  ├─ job-application.js
│  ├─ quiz.js
│  ├─ resume.js
│  └─ user.js
├─ app
│  ├─ (auth)
│  │  ├─ layout.js
│  │  ├─ sign-in
│  │  │  └─ [[...sign-in]]
│  │  │     └─ page.jsx
│  │  └─ sign-up
│  │     └─ [[...sign-up]]
│  │        └─ page.jsx
│  ├─ (main)
│  │  ├─ applications
│  │  │  ├─ new
│  │  │  │  └─ page.jsx
│  │  │  ├─ page.jsx
│  │  │  └─ _components
│  │  │     ├─ job-application-generator.jsx
│  │  │     ├─ job-application-list.jsx
│  │  │     └─ job-application-preview.jsx
│  │  ├─ cover
│  │  │  ├─ new
│  │  │  │  └─ page.jsx
│  │  │  ├─ page.jsx
│  │  │  ├─ [id]
│  │  │  │  └─ page.jsx
│  │  │  └─ _components
│  │  │     ├─ cover-letter-generator.jsx
│  │  │     ├─ cover-letter-list.jsx
│  │  │     └─ cover-letter-preview.jsx
│  │  ├─ insights
│  │  │  ├─ layout.jsx
│  │  │  ├─ page.jsx
│  │  │  └─ _components
│  │  │     └─ insights-view.jsx
│  │  ├─ interview
│  │  │  ├─ layout.js
│  │  │  ├─ mock
│  │  │  │  └─ page.jsx
│  │  │  ├─ page.jsx
│  │  │  └─ _components
│  │  │     ├─ interview-list.jsx
│  │  │     ├─ interview-result.jsx
│  │  │     ├─ interview.jsx
│  │  │     ├─ performace-chart.jsx
│  │  │     ├─ SpeechRecorder.jsx
│  │  │     └─ stats-cards.jsx
│  │  ├─ layout.js
│  │  ├─ onboarding
│  │  │  ├─ page.jsx
│  │  │  └─ _components
│  │  │     └─ OnboardingForm.jsx
│  │  ├─ quiz
│  │  │  ├─ layout.js
│  │  │  ├─ mock
│  │  │  │  └─ page.jsx
│  │  │  ├─ page.jsx
│  │  │  └─ _components
│  │  │     ├─ performace-chart.jsx
│  │  │     ├─ quiz-list.jsx
│  │  │     ├─ quiz-result.jsx
│  │  │     ├─ quiz.jsx
│  │  │     └─ stats-cards.jsx
│  │  └─ resume
│  │     ├─ layout.js
│  │     ├─ page.jsx
│  │     └─ _components
│  │        ├─ entry-form.jsx
│  │        └─ resume-builder.jsx
│  ├─ api
│  │  └─ inngest
│  │     └─ route.js
│  ├─ globals.css
│  ├─ layout.js
│  ├─ lib
│  │  ├─ helper.js
│  │  └─ schema.js
│  ├─ not-found.jsx
│  └─ page.js
├─ components
│  ├─ AppLoader.jsx
│  ├─ clerk-theme-provider.jsx
│  ├─ Footer.jsx
│  ├─ Header.jsx
│  ├─ LandingPage.jsx
│  ├─ MenuItems.jsx
│  ├─ theme-provider.jsx
│  ├─ ThemeToggle.jsx
│  └─ ui
│     ├─ accordion.jsx
│     ├─ alert-dialog.jsx
│     ├─ alert.jsx
│     ├─ aspect-ratio.jsx
│     ├─ avatar.jsx
│     ├─ badge.jsx
│     ├─ breadcrumb.jsx
│     ├─ button.jsx
│     ├─ calendar.jsx
│     ├─ card.jsx
│     ├─ carousel.jsx
│     ├─ chart.jsx
│     ├─ checkbox.jsx
│     ├─ collapsible.jsx
│     ├─ command.jsx
│     ├─ context-menu.jsx
│     ├─ dialog.jsx
│     ├─ drawer.jsx
│     ├─ dropdown-menu.jsx
│     ├─ form.jsx
│     ├─ hover-card.jsx
│     ├─ icons.jsx
│     ├─ input-otp.jsx
│     ├─ input.jsx
│     ├─ label.jsx
│     ├─ menubar.jsx
│     ├─ navigation-menu.jsx
│     ├─ pagination.jsx
│     ├─ popover.jsx
│     ├─ progress.jsx
│     ├─ radio-group.jsx
│     ├─ resizable.jsx
│     ├─ scroll-area.jsx
│     ├─ select.jsx
│     ├─ separator.jsx
│     ├─ sheet.jsx
│     ├─ sidebar.jsx
│     ├─ skeleton.jsx
│     ├─ slider.jsx
│     ├─ sonner.jsx
│     ├─ switch.jsx
│     ├─ table.jsx
│     ├─ tabs.jsx
│     ├─ textarea.jsx
│     ├─ toast.jsx
│     ├─ toaster.jsx
│     ├─ toggle-group.jsx
│     ├─ toggle.jsx
│     └─ tooltip.jsx
├─ components.json
├─ data
│  └─ industries.js
├─ eslint.config.mjs
├─ hooks
│  ├─ use-fetch.js
│  ├─ use-mobile.jsx
│  └─ use-toast.js
├─ jsconfig.json
├─ lib
│  ├─ checkUser.js
│  ├─ inngest
│  │  ├─ client.js
│  │  └─ functions.js
│  ├─ prisma.js
│  └─ utils.js
├─ middleware.js
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ prisma
│  ├─ migrations
│  │  ├─ 20250207175001_create_models
│  │  │  └─ migration.sql
│  │  ├─ 20250302171516_updateddb
│  │  │  └─ migration.sql
│  │  ├─ 20250302172937_update_models
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ public
│  ├─ about.txt
│  ├─ android-chrome-192x192.png
│  ├─ android-chrome-512x512.png
│  ├─ apple-touch-icon.png
│  ├─ favicon-16x16.png
│  ├─ favicon-32x32.png
│  ├─ favicon.ico
│  └─ site.webmanifest
├─ README.md
└─ tailwind.config.mjs

```
