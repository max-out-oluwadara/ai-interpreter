export interface Message {
    id: number;
    text: string;
    sender: "user" | "ai";
  }
  
  export interface DetectedLanguage {
    language: string;
    confidence: number;
  }
  
  export interface AppState {
    text: string;
    translatedText: string;
    summary: string;
    sourceLanguage: string;
    targetLanguage: string;
    mode: "translate" | "summarize";
    loading: boolean;
    messages: Message[]; // ✅ Chat messages
    detectedLanguages: DetectedLanguage[]; // ✅ Detected languages state
  }
  
  // ✅ Define Action Types
  export type AppAction =
    | { type: "SET_TEXT"; payload: string }
    | { type: "SET_TRANSLATED_TEXT"; payload: string }
    | { type: "SET_SUMMARY"; payload: string }
    | { type: "SET_SOURCE_LANGUAGE"; payload: string }
    | { type: "SET_TARGET_LANGUAGE"; payload: string }
    | { type: "SET_MODE"; payload: "translate" | "summarize" }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "ADD_MESSAGE"; payload: Message }
    | { type: "SET_DETECTED_LANGUAGES"; payload: DetectedLanguage[] }; // ✅ Added detected languages action
  
  // ✅ Initial State
  export const initialState: AppState = {
    text: "",
    translatedText: "",
    summary: "",
    sourceLanguage: "en",
    targetLanguage: "fr",
    mode: "summarize",
    loading: false,
    messages: [],
    detectedLanguages: [], // ✅ Initialize empty array
  };
  
  // ✅ Reducer Function
  export const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
      case "SET_TEXT":
        return { ...state, text: action.payload };
      case "SET_TRANSLATED_TEXT":
        return { ...state, translatedText: action.payload };
      case "SET_SUMMARY":
        return { ...state, summary: action.payload };
      case "SET_SOURCE_LANGUAGE":
        return { ...state, sourceLanguage: action.payload };
      case "SET_TARGET_LANGUAGE":
        return { ...state, targetLanguage: action.payload };
      case "SET_MODE":
        return { ...state, mode: action.payload };
      case "SET_LOADING":
        return { ...state, loading: action.payload };
      case "ADD_MESSAGE":
        return { ...state, messages: [...state.messages, action.payload] };
      case "SET_DETECTED_LANGUAGES": // ✅ Handle detected languages update
        return { ...state, detectedLanguages: action.payload };
      default:
        return state;
    }
  };
  