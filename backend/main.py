from datetime import datetime
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os, numpy as np
from io import BytesIO
try:
    import google.generativeai as genai
except Exception:
    genai = None
from PIL import Image

# --- Load environment variables ---
load_dotenv()
API_KEY = os.getenv('GOOGLE_API_KEY')

# --- Configure Gemini ---
if genai and API_KEY:
    genai.configure(api_key=API_KEY)

# --- FastAPI App Setup ---
app = FastAPI(title='AI Fake News & Deepfake Detector API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
    allow_credentials=True
)

# --- Request Models ---
class NewsRequest(BaseModel):
    text: str

class ChatRequest(BaseModel):
    query: str


# --- Fake News Detection (clean 2–3 sentence plain text) ---
@app.post('/fake-news')
async def fake_news(req: NewsRequest):
    if genai and API_KEY:
        model = genai.GenerativeModel('models/gemini-2.5-flash')

        prompt = f"""
        You are a professional fact-check analyst.

        Today's date: {datetime.now().strftime("%B %d, %Y")}.

        Task:
        - Analyze the following claim and respond in plain text (no HTML, no markdown).
        - Keep the reasoning concise: 2–3 sentences only.
        - Be factual and neutral; include key context (legal, geopolitical, or scientific) if relevant.
        - End with a one-word short verdict in brackets, e.g. [Unverified], [False], [True], [Misleading].

        Claim: {req.text}
        """

        resp = model.generate_content(prompt)
        text_out = (resp.text or "").strip()

        # --- Clean any accidental formatting ---
        for tag in ("<html>", "</html>", "<body>", "</body>", "<p>", "</p>"):
            text_out = text_out.replace(tag, "")
        text_out = text_out.replace("```", "").replace("`", "")

        return {'analysis': text_out}

    # Fallback if Gemini not available
    return {'analysis': 'Model unavailable — [Unverified]'}


# --- Deepfake Detection (Simulated) ---
@app.post('/deepfake')
async def deepfake_image(file: UploadFile = File(...)):
    contents = await file.read()
    try:
        img = Image.open(BytesIO(contents))
    except Exception:
        pass
    confidence = float(np.random.uniform(0.6, 0.95))
    verdict = 'Fake' if confidence > 0.75 else 'Real'
    return {'confidence': confidence, 'verdict': verdict}


# --- Chatbot with live news context ---
import re
import requests
from datetime import datetime

@app.post("/chatbot")
async def chatbot(req: ChatRequest):
    query = req.query.strip()
    NEWSDATA_API_KEY = os.getenv("NEWSDATA_API_KEY")

    # Step 1: Fetch contextual news results
    def fetch_newsdata(topic):
        try:
            url = f"https://newsdata.io/api/1/news?apikey={NEWSDATA_API_KEY}&q={topic}&language=en"
            r = requests.get(url)
            data = r.json()
            articles = data.get("results", [])
            if not articles:
                return None
            headlines = "\n".join(
                [f"- {a['title']} ({a.get('source_id', 'unknown')})" for a in articles[:5]]
            )
            sources = [
                {"name": a.get("source_id", "unknown"), "url": a.get("link", "#")}
                for a in articles[:5]
                if a.get("link")
            ]
            return {"headlines": headlines, "sources": sources}
        except Exception:
            return None

    context_data = fetch_newsdata(query)
    context = context_data["headlines"] if context_data else "No relevant articles found."
    sources = context_data["sources"] if context_data else []

    # Step 2: Generate analysis
    if genai and API_KEY:
        model = genai.GenerativeModel("models/gemini-2.5-flash")

        prompt = f"""
        You are a professional fact-checking journalist.
        Today's date: {datetime.now().strftime("%B %d, %Y")}.
        
        Task:
        - Analyze the following user query using verified sources.
        - Respond in 2–3 sentences maximum.
        - Stay factual and neutral.
        - Do NOT include verdicts like "True", "False", "Unverified", "Misleading", or any classification label.
        - Simply describe the factual status and context.

        Query: "{query}"

        Recent News Context:
        {context}
        """

        try:
            resp = model.generate_content(prompt)
            analysis = (resp.text or "").strip()
        except Exception:
            analysis = "Unable to generate analysis at this time."

        # Step 3: Clean up
        # Remove any verdict-like phrases or labels
        analysis = re.sub(
            r"(?i)(\bverdict\b\s*[:\-]*\s*|\bthis (claim|statement|report|news)\s*(is|appears|seems)\s*(to be)?\s*)?(true|false|unverified|misleading)\b",
            "",
            analysis,
        )
        # Strip HTML/markdown formatting
        for tag in ["<html>", "</html>", "<body>", "</body>", "<p>", "</p>", "`", "```"]:
            analysis = analysis.replace(tag, "")
        # Clean spaces
        analysis = re.sub(r"\s{2,}", " ", analysis).strip()

        # Step 4: Add clickable sources
        if sources:
            sources_text = "\n\nSources:\n" + "\n".join(
                [f"- [{s['name']}]({s['url']})" for s in sources]
            )
            analysis += sources_text

        return {"reply": analysis}

    # Fallback
    return {
        "reply": "AI model unavailable — ensure GOOGLE_API_KEY and NEWSDATA_API_KEY are set."
    }
