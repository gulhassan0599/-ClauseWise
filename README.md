# ⚖️ ClauseWise
> AI-Powered Legal Contract Analyzer & Assistant

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61DAFB.svg?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933.svg?logo=node.js)
![Groq](https://img.shields.io/badge/Groq-AI-f55036.svg)

**ClauseWise** is a modern, intelligent web application designed to help individuals and professionals rapidly analyze dense legal contracts. It automatically extracts text from PDF documents, identifies risky clauses, highlights important terms, and allows you to chat directly with an AI assistant about your specific contract.

🌐 **Live Demo:** https://clause-wise-chatbot.vercel.app/

---

## ✨ Key Features
- **📄 Instant PDF Extraction:** Securely parse and extract text directly from uploaded PDF contracts.
- **🚨 Risk Analysis:** Automatically flags predatory, vague, or high-risk clauses with severity levels and explanations.
- **💬 Interactive AI Chatbot:** Ask specific questions about your uploaded contract and get instant, context-aware answers.
- **🌙 Glassmorphism UI:** A stunning, fully responsive interface featuring seamless Dark/Light mode toggling.
- **⬇️ Downloadable Reports:** Generate professional, color-coded PDF reports of the AI's analysis for your records.

## 🛠️ Technology Stack
- **Frontend:** React 19, Vite, React Router, Bootstrap 5, jsPDF, React-Markdown.
- **Backend:** Node.js, Express, Multer (File Uploads), pdf-parse.
- **AI Integration:** Groq API (`llama-3.1-8b-instant`) for lightning-fast inference.

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A free API key from [Groq Console](https://console.groq.com/keys)

### 2. Clone the Repository
```bash
git clone https://github.com/gulhassan0599/clausewise.git
cd clausewise
```

### 3. Backend Setup
Navigate to the server directory, install dependencies, and configure your environment.
```bash
cd server
npm install
```
Rename the `.env.example` file to `.env` and insert your Groq API key:
```env
PORT=5000
GROQ_API_KEY=your_actual_groq_api_key_here
```
Start the backend server:
```bash
npm start
```
*(The API will run on `http://localhost:5000`)*

### 4. Frontend Setup
Open a new terminal tab, navigate to the client directory, and install dependencies.
```bash
cd client
npm install
```
Start the frontend development server:
```bash
npm run dev
```
*(The React app will run on `http://localhost:5173`)*

---

## 🌍 Deployment

ClauseWise is structured as a monorepo, making it easy to deploy the frontend and backend independently to modern cloud providers.

### Frontend Deployment (Vercel)
1. Push your repository to GitHub.
2. Log into [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your `clausewise` repository.
4. In the "Framework Preset" dropdown, select **Vite**.
5. Set the **Root Directory** to `client`.
6. Click **Deploy**.

### Backend Deployment (Railway)
1. Log into [Railway](https://railway.app/) and click **New Project** -> **Deploy from GitHub repo**.
2. Select your `clausewise` repository.
3. Once created, immediately go to the service **Settings** -> **Build**.
4. Set the **Root Directory** to `/server`. (This tells Railway to ignore the frontend).
5. Go to the **Variables** tab and add your Environment Variables:
   - `PORT` = `5000`
   - `GROQ_API_KEY` = `your_actual_api_key_here`
6. In **Settings** -> **Networking**, click **Generate Domain**.

*(Don't forget to add `VITE_API_BASE_URL` to your Vercel Environment Variables so the frontend knows how to reach your new Railway backend domain!)*

---

## 📂 Project Structure
```text
clausewise/
├── client/                # React Frontend
│   ├── public/
│   └── src/
│       ├── components/    # Reusable UI components (Dashboard, Chatbot, etc.)
│       ├── services/      # Frontend API fetch logic
│       └── utils/         # PDF Generation utility
└── server/                # Node.js/Express Backend
    ├── config/            # External API configurations (Groq)
    ├── controllers/       # Route request handlers
    ├── middlewares/       # Error handling & rate limiting
    ├── prompts/           # LLM System Prompts
    ├── routes/            # Express API routing
    └── services/          # Core Business Logic (PDF parsing, AI orchestration)
```

## ⚖️ Disclaimer
**ClauseWise is built for educational and informational purposes only.** It does not provide certified legal advice. Always consult with a qualified attorney before signing binding legal documents.
