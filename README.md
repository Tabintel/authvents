# Authvents

Authvents is an event booking platform built with [Svelte](https://svelte.dev/) that integrates [FACEIO](https://faceio.net/) for secure, facial-recognition-based authentication. Authvents allows users to log in and access event ticket dashboards with biometric verification.

---

## Features

- **Biometric Authentication**: Facial recognition login with FACEIO.
- **Anti-Spoofing**: Robust measures against spoofing attempts.
- **Event Dashboard**: Accessible only to authenticated users.
  
---

## Prerequisites

1. [Node.js & npm](https://nodejs.org/) (for package management).
2. [FACEIO account](https://console.faceio.net/login) - Sign up to get your app credentials.
3. Basic knowledge of JavaScript and Svelte.

---

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Tabintel/authvents.git
   cd authvents
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the project root and add:
   ```bash
   PUBLIC_FACEIO_PUBLIC_ID=your_faceio_app_id_here
   PUBLIC_FACEIO_PUBLIC_KEY=your_faceio_api_key
   ```
   Replace with your FACEIO credentials.

4. **Install Tailwind CSS** (optional for styling):
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

5. **Run the App**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Usage

1. **Sign Up** with an email and password.
2. **Login**: Access the dashboard and authenticate with FACEIO.
3. **View Tickets**: Authenticated users can view event ticket information.

---

## FACEIO Setup Guide

- **Create a FACEIO Application** in your FACEIO Console.
- Note your **App ID** and **API Key**.
- Choose [PixLab Insight](https://pixlab.io/) as the Facial Recognition Engine for enhanced security.

---

## Project Structure

- **`src/routes/`** - Contains Svelte routes and components.
- **`src/routes/+page.svelte`** - Home page with login functionality.
- **`src/routes/dashboard/+page.svelte`** - Protected dashboard with FACEIO integration.

---

### Resources

- [FACEIO Documentation](https://faceio.net/docs)
- [Svelte Documentation](https://svelte.dev/docs)
  
---