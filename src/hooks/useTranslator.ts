"use client";

import { useCallback } from "react";
import { useAppContext } from "@/context/AppContext";

export const useTranslator = () => {
  const { state, dispatch } = useAppContext();
  const { text, sourceLanguage, targetLanguage } = state;

  // ✅ Function to Translate Text (Only Returns the Text, No Dispatch Here)
  const handleTranslate = useCallback(async (): Promise<string> => {
    if (!window.ai?.translator) {
      alert("Translator API is not available.");
      return "";
    }

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const translatorInstance = await window.ai.translator.create({
        sourceLanguage,
        targetLanguage,
      });

      const translation = await translatorInstance.translate(text);

      return translation; // ✅ Only returning translated text, not dispatching message
    } catch (error) {
      console.error("❌ Error translating text:", error);
      alert("Failed to translate text.");
      return "";
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [text, sourceLanguage, targetLanguage, dispatch]);

  return { handleTranslate };
};
