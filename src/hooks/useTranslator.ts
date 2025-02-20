import { useState, useEffect, useCallback } from "react";

export const useTranslator = () => {
  const [text, setText] = useState(""); // Stores input text
  const [translatedText, setTranslatedText] = useState(""); // ✅ Fix: Include this in return
  const [sourceLanguage, setSourceLanguage] = useState("en"); // Default: English
  const [targetLanguage, setTargetLanguage] = useState("fr"); // Default: French
  const [translator, setTranslator] = useState<TranslatorInstance | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const initTranslator = async () => {
      const translatorAPI = window.ai?.translator;
      if (!translatorAPI) {
        console.warn("❌ Translator API is not available.");
        return;
      }

      setIsSupported(true);
      try {
        const capabilities = await translatorAPI.capabilities();
        console.log("Translator capabilities:", capabilities);

        const available = capabilities.languagePairAvailable(sourceLanguage, targetLanguage);

        if (available === "readily") {
          console.log("✅ Translator API is ready.");
          const translatorInstance = await translatorAPI.create({
            sourceLanguage,
            targetLanguage,
          });
          setTranslator(translatorInstance);
        } else if (available === "after-download") {
          console.log("⏳ Language model downloading...");

          const checkDownloadProgress = async () => {
            let availability = "after-download";
            while (availability === "after-download") {
              await new Promise((res) => setTimeout(res, 2000)); // Wait 2s
              availability = (await translatorAPI.capabilities()).languagePairAvailable(
                sourceLanguage,
                targetLanguage
              );
              console.log(`⏳ Download status: ${availability}`);
            }

            console.log("✅ Model is ready!");
            const translatorInstance = await translatorAPI.create({
              sourceLanguage,
              targetLanguage,
            });

            setTranslator(translatorInstance);
          };

          checkDownloadProgress();
        } else {
          console.warn("❌ Translator API is not available for this language pair.");
        }
      } catch (error) {
        console.error("❌ Error initializing Translator API:", error);
      }
    };

    initTranslator();
  }, [sourceLanguage, targetLanguage]);

  // ✅ Function to Translate Text
  const handleTranslate = useCallback(async () => {
    if (!isSupported) {
      alert("Translator API is not available.");
      return;
    }

    if (!translator) {
      alert("Translator model is still loading. Please wait.");
      return;
    }

    setLoading(true);
    try {
      const translation = await translator.translate(text);
      setTranslatedText(translation); // ✅ This is now updated correctly
    } catch (error) {
      console.error("❌ Error translating text:", error);
      alert("Failed to translate text.");
    } finally {
      setLoading(false);
    }
  }, [translator, text, isSupported]);

  return {
    text,
    setText,
    translatedText,
    setTranslatedText, // ✅ Fix: Ensure this is returned
    sourceLanguage,
    setSourceLanguage,
    targetLanguage,
    setTargetLanguage,
    loading,
    handleTranslate,
  };
};
