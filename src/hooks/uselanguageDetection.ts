import { useState, useEffect, useCallback } from "react";

export const useLanguageDetection = () => {
  const [text, setText] = useState(""); // Input text
  const [detectedLanguages, setDetectedLanguages] = useState<DetectedLanguage[]>([]); // Detected languages
  const [detector, setDetector] = useState<LanguageDetectorInstance | null>(null); // Detector instance
  const [loading, setLoading] = useState(false); // Loading state
  const [isSupported, setIsSupported] = useState(false); // API support check

  // ✅ Initialize Language Detector API on Mount
  useEffect(() => {
    const initLanguageDetector = async () => {
      const detectorAPI = window.ai?.languageDetector;
      if (!detectorAPI) {
        console.warn("❌ Language Detector API is not available in this browser.");
        return;
      }

      setIsSupported(true);
      try {
        const capabilities = await detectorAPI.capabilities();
        console.log("🔍 Language Detector capabilities:", capabilities);

        if (capabilities.available === "readily") {
          console.log("✅ Language Detector API is ready to use.");
          const detectorInstance = await detectorAPI.create();
          setDetector(detectorInstance);
        } else if (capabilities.available === "after-download") {
          console.log("⏳ Language model downloading...");

          const checkDownloadProgress = async () => {
            let availability: "no" | "readily" | "after-download" = "after-download";
            while (availability === "after-download") {
              await new Promise((res) => setTimeout(res, 2000)); // Wait 2s
              availability = (await detectorAPI.capabilities()).available;
              console.log(`⏳ Download progress: ${availability}`);
            }

            console.log("✅ Model is now ready!");
            const detectorInstance = await detectorAPI.create();
            setDetector(detectorInstance);
          };

          checkDownloadProgress(); // Start polling
        } else {
          console.warn("❌ Language Detector API is not available.");
        }
      } catch (error) {
        console.error("❌ Error initializing Language Detector API:", error);
      }
    };

    initLanguageDetector();
  }, []);

  // ✅ Function to Detect Language
  const handleDetectLanguage = useCallback(async () => {
    if (!isSupported) {
      alert("Language Detector API is not available in this browser.");
      return;
    }

    if (!detector) {
      alert("Language Detector model is still loading. Please wait.");
      return;
    }

    setLoading(true);
    try {
      const results = await detector.detect(text);
      setDetectedLanguages(results);
    } catch (error) {
      console.error("❌ Error detecting language:", error);
      alert("Failed to detect language.");
    } finally {
      setLoading(false);
    }
  }, [detector, text, isSupported]);

  return {
    text,
    setText,
    detectedLanguages,
    loading,
    handleDetectLanguage,
  };
};
