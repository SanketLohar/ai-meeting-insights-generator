# AI Meeting Insights Generator

![AI Meeting Insights Generator Demo](https://via.placeholder.com/700x350.png?text=App+Screenshot+Here)

An intelligent web application built with Next.js and powered by the OpenAI API to automatically transcribe, summarize, and generate actionable insights from recorded meetings. This tool helps users save time and quickly extract the most important information, such as summaries, action items, and follow-up questions.

**Live Demo**: [Link to your Vercel deployment URL]

---

## ## Features

* **Accurate Transcription**: Upload an audio file of your meeting and receive a precise, speaker-separated transcription.
* **AI-Powered Summaries**: Generate concise summaries of long meetings to quickly understand the key discussion points.
* **Action Item Detection**: Automatically identify and list all the tasks and action items assigned during the meeting.
* **Follow-Up Questions**: AI suggests relevant follow-up questions to ensure all topics are thoroughly addressed.
* **Modern & Responsive UI**: A clean and intuitive user interface built with Next.js and Tailwind CSS.

---

## ## Tech Stack

This project is a full-stack application built with a modern technology stack.

* **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
* **Backend**: [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
* **AI & Transcription**: [OpenAI API (GPT-4 & Whisper)](https://openai.com/)
* **Deployment**: [Vercel](https://vercel.com/)

---

## ## Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### ### Prerequisites

You need to have Node.js and npm installed on your computer.

* [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
* [npm](https://www.npmjs.com/)

### ### Installation & Setup

1.  **Clone the repository** to your local machine:
    ```bash
    git clone [https://github.com/SanketLohar/ai-meeting-insights-generator.git](https://github.com/SanketLohar/ai-meeting-insights-generator.git)
    cd ai-meeting-insights-generator
    ```

2.  **Install the dependencies**:
    ```bash
    npm install
    ```

3.  **Set up the environment variables**:
    Create a new file named `.env.local` in the root of your project and add your OpenAI API key:
    ```env
    OPENAI_API_KEY=your_secret_api_key_here
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

The application will now be running at [http://localhost:3000](http://localhost:3000). You can open this URL in your browser to see the app.

---

## ## How to Use

1.  **Upload Your Audio**: On the main page, click the "Upload File" button and select an audio recording of your meeting (e.g., in `.mp3` or `.wav` format).
2.  **Generate Insights**: The application will automatically transcribe the audio and use the OpenAI API to generate a summary, a list of action items, and follow-up questions.
3.  **Copy and Share**: You can easily copy the generated text to share with your team.
