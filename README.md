# AI Fake News & Deepfake Detector - Full Website (React + FastAPI)

## Setup

### Backend
1. cd backend
2. python -m venv .venv
3. source .venv/bin/activate  # or .\\.venv\\Scripts\\activate on Windows
4. pip install -r requirements.txt
5. create a .env file at the project root (see .env.example) with GOOGLE_API_KEY
6. uvicorn main:app --reload --port 8000

### Frontend
1. cd frontend
2. npm install
3. npm run dev

Open http://localhost:5173 for the frontend and http://localhost:8000/docs for backend API docs.

## Notes
- Do NOT commit your real .env with API keys.
- The backend will use Google Gemini if GOOGLE_API_KEY is provided and google-generativeai is installed.
