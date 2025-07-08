
#  AI Content Generator

An ai based sass application where user can create or share ai templates and generate their desired content using those templates.

## 🌟 Features

- **User Authentication**: Secure sign-in and sign-up functionality using Clerk.
- **AI Content Generation**: Generate content using Google's Gemini Api.
- **Template Management**: Create, edit, and delete custom templates for content generation.
- **Credits System**: Users can purchase credits to use for content generation. For first time sign up users will recive some free credits.
- **Payment Integration**: Seamless payment processing with [SSLCommerz](https://sslcommerz.com/)
- **Content History**: View and manage previously generated content.
- **Dashboard**: A user-friendly dashboard to manage all activities.
- **Responsive Design**: A beautiful and responsive UI built with Tailwind CSS and Shadcn UI.
- **Dark Mode Support**:User can Switch between light or dark modes or select the default system mode.

## 📽️ App Demo
- Desktop view: [Click here](https://youtu.be/1QuXqCW5xP8?si=BlxXUY0EKsEwfDyi) 👈
- Tablet View: (_will be updated soon_)
- Mobile View: (_will be updated soon_)

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **AI**: [Google Gemini](https://ai.google.dev/)
- **Payments**: [SSLCommerz](https://www.sslcommerz.com/)
- **Image Storage**: [Cloudinary](https://cloudinary.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Shadcn](https://ui.shadcn.com/)
- **Linting**: [ESLint](https://eslint.org/)


## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [pnpm](https://pnpm.io/) (optional)
- [PostgreSQL](https://www.postgresql.org/download/) database

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SABBIR-H0SSAIN/ai-content-generator.git
    ```
    ```bash
    cd ai-content-generator
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install #or npm install
    ```

3.  **Set up environment variables:**
    -   Create a `.env` file in the root of the project by copying the `.env.example` file
        
    -   Fill in the required values in the `.env` file. See the [Environment Variables](#-environment-variables) section for more details.

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.


## 📜 Available Scripts

| Script         | Description                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| `dev`     | Starts the development server with Turbopack.                                |
| `build`   | Builds the application for production.                                       |
| `start`   | Starts the production server.                                                |
| `lint`    | Lints the codebase using ESLint.                                             |
| `db:generate` | Generates Drizzle ORM migration files based on schema changes.           |
| `db:migrate`  | Applies pending migrations to the database.                                |
| `db:studio`   | Opens the Drizzle Studio to interact with the database.                    |
| `db:seed`     | Seeds the database with initial data.                                      |
| `db:reset`    | Resets the database by rolling back all migrations.                        |
| `db:all`      | A utility script to reset, generate, migrate, and seed the database.       |
| `tunnel`      | Exposes the local development server to the internet using ngrok.          |


## 🔑 Environment Variables

The following environment variables are required to run the application. You can find them in the `.env.example` file for reference.

| Variable                               | Description                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `BASE_URL`                             | The base URL of your application (e.g., `http://localhost:3000`).                                       |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`    | Your Clerk publishable key.                                                                             |
| `CLERK_SECRET_KEY`                     | Your Clerk secret key.                                                                                  |
| `DATABASE_URL`                         | The connection string for your PostgreSQL database.                                                     |
| `GEMINI_API_KEY`                       | Your API key for the Google Gemini AI.                                                                  |
| `GEMINI_MODEL_NAME`                    | The Gemini model you want to use (e.g., `gemini-1.5-flash`).                                            |
| `GEMINI_SYSTEM_INSTRUCTION`            | System instructions for the Gemini model.                                                               |
| `SSLCOMMERZ_STORE_ID`                  | Your SSLCommerz store ID.                                                                               |
| `SSLCOMMERZ_STORE_PASSWORD`            | Your SSLCommerz store password.                                                                         |
| `SSLCOMMERZ_IPN_URL`                   | The URL for reading SSLCommerz Instant Payment Notification (IPN).                                              |
| `CLOUDINARY_CLOUD_NAME`                | Your Cloudinary cloud name.                                                                             |
| `CLOUDINARY_API_KEY`                   | Your Cloudinary API key.                                                                                |
| `CLOUDINARY_API_SECRET`                | Your Cloudinary API secret.                                                                             |



## ❤️ Support This Project

If you found this project helpful or interesting, please consider giving it a ⭐️ 

![GitHub Repo stars](https://img.shields.io/github/stars/SABBIR-H0SSAIN/ai-content-generator)


