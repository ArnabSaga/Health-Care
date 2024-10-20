# HealthCare Web Application

This project is a healthcare web application built using modern technologies to provide a seamless experience for patients and administrators. It allows users to register, book appointments, and receive SMS notifications, while administrators can manage the application securely through a dashboard.

## Tech Stack

- **React.js**: Front-end library for building user interfaces.
- **Next.js**: React framework with support for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Appwrite**: Backend-as-a-service platform for managing users, databases, and authentication.
- **Twilio**: Service for sending SMS notifications.
- **TypeScript**: Strongly-typed JavaScript for improved code quality.

## Features

- **Intro Page**: A welcoming page that provides an overview of the application.
- **HomePage**: The main page with options for users to register, login, or book appointments.
- **Registration Page**: A page for users to sign up for the healthcare service.
- **Appointment Page**: Allows users to book and manage their appointments.
- **Success Page**: Confirmation page after successful operations like registration or appointment booking.
- **Admin Passcode Verification**: A security layer for admin access, requiring a passcode for entry.
- **Admin Dashboard**: A secure page where admins can view and manage user appointments, registrations, and more.
- **Sentry**: Integrated for error tracking and application security.
- **SMS Notifications**: Users receive SMS alerts for important events like successful appointments or reminders.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Appwrite](https://appwrite.io/) setup with necessary configurations.
- [Twilio Account](https://www.twilio.com/) for sending SMS.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ArnabSaga/Health-Care

2. Navigate to the project directory

    cd healthcare-app

3. Install dependencies

    npm install

4. Set up environment variables. Create a .env.local file and add the following

    - NEXT_PUBLIC_APPWRITE_ENDPOINT=<your-appwrite-endpoint>
    - NEXT_PUBLIC_APPWRITE_PROJECT_ID=<your-appwrite-project-id>
    - NEXT_PUBLIC_TWILIO_SID=<your-twilio-sid>
    - NEXT_PUBLIC_TWILIO_AUTH_TOKEN=<your-twilio-auth-token>
    - NEXT_PUBLIC_TWILIO_PHONE_NUMBER=<your-twilio-phone-number>

5. To start the development server

    npm run dev
