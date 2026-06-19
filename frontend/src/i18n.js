import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      app: {
        title: "AI Fake News & Deepfake Detector",
        subtitle: "Fast, explainable detection for misinformation and manipulated media.",
      },
      navbar: {
        language: "Language",
      },
      sidebar: {
        fakeNews: "Fake News",
        deepfake: "Deepfake Image",
        chatbot: "Chatbot",
      },
      news: {
        title: "📜 Fake News Detection",
        description: "Paste an article, headline, or claim to verify authenticity.",
        placeholder: "Paste news text or claim...",
        analyze: "Analyze News",
        analyzing: "Analyzing...",
        clear: "Clear",
        reasoning: "Reasoning:",
        enterText: "Enter text to analyze",
        backendError: "Unable to contact backend. Make sure FastAPI is running.",
      },
      deepfake: {
        title: "🖼️ Deepfake Image Detection",
        chooseImage: "Choose Image",
        changeImage: "Change Image",
        analyze: "Analyze Image",
        analyzing: "Analyzing...",
        confidenceScore: "Confidence Score",
        uploadFirst: "Please upload an image first",
        errorAnalyzing: "Error analyzing image",
        fake: "🚫 Fake",
        real: "✅ Real",
      },
      chatbot: {
        title: "💬 Misinformation Chatbot",
        description: "Ask about viral claims, events, or fact-checkable news.",
        placeholder: "Ask something...",
        ask: "Ask AI",
        thinking: "Thinking...",
        clear: "Clear",
        replyHeader: "AI Reply",
        enterQuestion: "Please enter a question.",
        backendError: "Error contacting backend.",
        sources: "Sources",
      },
      history: {
        title: "📜 History",
        empty: "No history yet.",
      },
      verdict: {
        fake: "Fake",
        real: "Real",
        unverified: "Unverified",
        misleading: "Misleading",
        true: "True",
        false: "False",
      },
      task: {
        fakeNews: "Fake News",
        deepfake: "Deepfake",
        chatbot: "Chatbot",
      },
    },
  },
  es: {
    translation: {
      app: {
        title: "Detector de Fake News y Deepfakes con IA",
        subtitle: "Detección rápida y explicable de desinformación y medios manipulados.",
      },
      navbar: {
        language: "Idioma",
      },
      sidebar: {
        fakeNews: "Fake News",
        deepfake: "Deepfake",
        chatbot: "Chatbot",
      },
      news: {
        title: "📜 Detección de Fake News",
        description: "Pega un artículo, titular o afirmación para verificar su autenticidad.",
        placeholder: "Pega texto de noticias o afirmación...",
        analyze: "Analizar noticias",
        analyzing: "Analizando...",
        clear: "Limpiar",
        reasoning: "Razonamiento:",
        enterText: "Introduce texto para analizar",
        backendError: "No se puede contactar con el backend. Asegúrate de que FastAPI esté en ejecución.",
      },
      deepfake: {
        title: "🖼️ Detección de Deepfake",
        chooseImage: "Seleccionar imagen",
        changeImage: "Cambiar imagen",
        analyze: "Analizar imagen",
        analyzing: "Analizando...",
        confidenceScore: "Puntuación de confianza",
        uploadFirst: "Por favor sube una imagen primero",
        errorAnalyzing: "Error al analizar la imagen",
        fake: "🚫 Falso",
        real: "✅ Real",
      },
      chatbot: {
        title: "💬 Chatbot contra desinformación",
        description: "Pregunta sobre rumores virales, eventos o noticias verificables.",
        placeholder: "Pregunta algo...",
        ask: "Preguntar IA",
        thinking: "Pensando...",
        clear: "Limpiar",
        replyHeader: "Respuesta de IA",
        enterQuestion: "Por favor ingresa una pregunta.",
        backendError: "Error al contactar con el backend.",
        sources: "Fuentes",
      },
      history: {
        title: "📜 Historial",
        empty: "Aún no hay historial.",
      },
      verdict: {
        fake: "Falso",
        real: "Real",
        unverified: "Sin verificar",
        misleading: "Engañoso",
        true: "Verdadero",
        false: "Falso",
      },
      task: {
        fakeNews: "Fake News",
        deepfake: "Deepfake",
        chatbot: "Chatbot",
      },
    },
  },
};

const savedLanguage = localStorage.getItem("preferredLanguage") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
