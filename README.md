# AI Meeting Insights Generator ✨

> An intelligent web application that leverages the OpenAI API to transcribe, summarize, and generate actionable insights from your recorded meetings.

[![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🚀 Live Demo

**[YOUR VERCEL DEPLOYMENT URL HERE]**

---

## 📸 Screenshots

*A few screenshots of the application's user interface.*

**[ADD YOUR SCREENSHOTS HERE, LIKE IN YOUR EXAMPLE]**

---

## 🎯 The Problem

After a long meeting, it can be time-consuming to re-listen to the recording to extract key decisions, action items, and important takeaways. This manual process is inefficient and can lead to missed details. The AI Meeting Insights Generator solves this by automating the entire process, providing clear, concise, and actionable summaries in seconds.

---

## ✨ Features

* **🎙️ Audio Transcription:** Upload meeting audio files (like `.mp3`, `.wav`, `.m4a`) for fast and accurate transcription.
* **🤖 AI-Powered Summaries:** Instantly generate concise summaries to capture the essence of the conversation.
* **✅ Action Item Extraction:** Automatically identify and list all tasks and action items discussed.
* **❓ Suggested Follow-ups:** Generate intelligent follow-up questions to ensure clarity and accountability.
* **Modern Interface:** A clean, responsive, and easy-to-use interface built with Next.js and Tailwind CSS.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js / React
* **Styling:** Tailwind CSS
* **State Management:** React Hooks

### Backend
* **Framework:** Next.js API Routes
* **AI Integration:** OpenAI API (Whisper for transcription, GPT for insights)
* **Deployment**: Vercel

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn

### Setup

1.  Clone the repository:
    ```sh
    git clone [https://github.com/SanketLohar/ai-meeting-insights-generator.git](https://github.com/SanketLohar/ai-meeting-insights-generator.git)
    ```
2.  Navigate to the project directory:
    ```sh
    cd ai-meeting-insights-generator
    ```
3.  Install the necessary packages:
    ```sh
    npm install
    ```
4.  Create a `.env.local` file in the root of the project. You will need to add your OpenAI API key to this file:
    ```env
    OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
    ```
5.  Run the development server:
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

---

## 📄 License

This project is distributed under the MIT License. See `LICENSE` for more information.
