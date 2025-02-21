"use client";

import { useEffect, useCallback } from "react";
import { useAppContext } from "@/context/AppContext"; // ✅ Use Global Context
import { DetectedLanguage } from "@/context/appReducer"; // ✅ Import correct type

// ✅ Define API Response Type (Ensure it matches DetectedLanguage)
interface LanguageDetectionResult {
  language: string;
  confidence: number;
  probability?: number; // ✅ Optional field
}

export const useLanguageDetection = () => {
  const { state, dispatch } = useAppContext();
  const { text } = state; // ✅ Get text from global state

  useEffect(() => {
    const initLanguageDetector = async () => {
      const detectorAPI = window.ai?.languageDetector;
      if (!detectorAPI) {
        console.warn("❌ Language Detector API is not available.");
        return;
      }

      try {
        const capabilities = await detectorAPI.capabilities();
        console.log("🔍 Language Detector capabilities:", capabilities);

        if (capabilities.available === "readily") {
          console.log("✅ Language Detector API is ready.");
          dispatch({ type: "SET_DETECTED_LANGUAGES", payload: [] }); // ✅ Ensure payload is an empty array initially
        } else if (capabilities.available === "after-download") {
          console.log("⏳ Language model downloading...");

          const checkDownloadProgress = async () => {
            let availability: "no" | "readily" | "after-download" = "after-download";
            while (availability === "after-download") {
              await new Promise((res) => setTimeout(res, 2000));
              availability = (await detectorAPI.capabilities()).available;
              console.log(`⏳ Download progress: ${availability}`);
            }
            console.log("✅ Model is now ready!");
          };

          checkDownloadProgress();
        } else {
          console.warn("❌ Language Detector API is not available.");
        }
      } catch (error) {
        console.error("❌ Error initializing Language Detector API:", error);
      }
    };

    initLanguageDetector();
  }, [dispatch]); // ✅ Fix: Added dispatch to dependencies

  // ✅ Function to Detect Language
  const handleDetectLanguage = useCallback(async () => {
    if (!window.ai?.languageDetector) {
      alert("Language Detector API is not available.");
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const detector = await window.ai.languageDetector.create();
      const rawResults = await detector.detect(text);

      console.log("🔍 Raw detected languages:", rawResults); // ✅ Debugging log

      // ✅ Ensure results conform to DetectedLanguage[]
      const formattedResults: DetectedLanguage[] = (rawResults as unknown as LanguageDetectionResult[]).map(
        (res) => ({
          language: res.language, // ✅ Ensure 'language' field is included
          confidence: res.confidence,
          probability: res.probability ?? 0, // ✅ Provide default value if missing
        })
      );

      dispatch({ type: "SET_DETECTED_LANGUAGES", payload: formattedResults }); // ✅ Fixed payload type
    } catch (error) {
      console.error("❌ Error detecting language:", error);
      alert("Failed to detect language.");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [text, dispatch]); // ✅ Fix: Added dispatch as dependency

  return { handleDetectLanguage };
};
