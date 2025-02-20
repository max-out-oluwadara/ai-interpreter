import { useState, useEffect } from "react";

export const useSummarizer = () => {
  const [text, setText] = useState(""); // Stores input text
  const [result, setResult] = useState(""); // Stores summarized output
  const [mode, setMode] = useState<"translate" | "summarize">("summarize"); // ✅ Mode for summarization
  const [loading, setLoading] = useState(false); // Loading state
  const [isSupported, setIsSupported] = useState(false); // API support check
  const [summarizer, setSummarizer] = useState<SummarizerInstance | null>(null); // Summarizer instance

  useEffect(() => {
    const initSummarizer = async () => {
      const summarizerAPI = window.ai?.summarizer;
      if (!summarizerAPI) {
        console.warn("❌ Summarizer API not available.");
        return;
      }

      setIsSupported(true);
      try {
        const capabilities = await summarizerAPI.capabilities();
        console.log("Summarizer capabilities:", capabilities);

        if (capabilities.available === "readily") {
          console.log("✅ Summarizer API is ready.");
          const summarizerInstance = await summarizerAPI.create({
            type: "key-points",
            format: "plain-text",
            length: "medium",
          });
          setSummarizer(summarizerInstance);
        } else if (capabilities.available === "after-download") {
          console.log("⏳ Model is downloading...");

          const checkDownloadProgress = async () => {
            let available = "after-download";
            while (available === "after-download") {
              await new Promise((res) => setTimeout(res, 2000));
              available = (await summarizerAPI.capabilities()).available;
              console.log(`⏳ Download status: ${available}`);
            }

            console.log("✅ Model is ready!");
            const summarizerInstance = await summarizerAPI.create({
              type: "key-points",
              format: "plain-text",
              length: "medium",
            });

            setSummarizer(summarizerInstance);
          };

          checkDownloadProgress();
        } else {
          console.warn("❌ Summarizer API is not available.");
        }
      } catch (error) {
        console.error("❌ Error initializing Summarizer API:", error);
      }
    };

    initSummarizer();
  }, []);

  const handleSummarize = async () => {
    if (!isSupported) {
      alert("Summarizer API is not available in this browser.");
      return;
    }
    if (!summarizer) {
      alert("Summarizer model is still loading. Please wait.");
      return;
    }
    setLoading(true);
    try {
      const summary = await summarizer.summarize(text, {
        context: "This text is meant to be summarized for clarity.",
      });
      setResult(summary);
    } catch (error) {
      console.error("❌ Error summarizing text:", error);
      alert("Failed to summarize text.");
    } finally {
      setLoading(false);
    }
  };

  return {
    text,
    setText,
    result,
    mode, // ✅ Now returned
    setMode, // ✅ Now returned
    loading,
    handleSummarize,
  };
};
