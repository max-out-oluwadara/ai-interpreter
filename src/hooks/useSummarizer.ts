"use client";

import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

export const useSummarizer = () => {
  const { state, dispatch } = useAppContext();
  const { text } = state;

  useEffect(() => {
    const initSummarizer = async () => {
      const summarizerAPI = window.ai?.summarizer;
      if (!summarizerAPI) {
        console.warn("❌ Summarizer API not available.");
        return;
      }

      try {
        const capabilities = await summarizerAPI.capabilities();
        console.log("Summarizer capabilities:", capabilities);

        if (capabilities.available === "readily") {
          console.log("✅ Summarizer API is ready.");
          await summarizerAPI.create({
            type: "key-points",
            format: "plain-text",
            length: "medium",
          });
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
            await summarizerAPI.create({
              type: "key-points",
              format: "plain-text",
              length: "medium",
            });
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

  const handleSummarize = async (): Promise<string> => {
    if (!window.ai?.summarizer) {
      alert("Summarizer API is not available in this browser.");
      return "";
    }

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const summarizerAPI = window.ai.summarizer;
      const summarizerInstance = await summarizerAPI.create({
        type: "key-points",
        format: "plain-text",
        length: "medium",
      });

      const summarizedText = await summarizerInstance.summarize(text, {
        context: "This text is meant to be summarized for clarity.",
      });

      dispatch({ type: "SET_SUMMARY", payload: summarizedText });

      return summarizedText; // ✅ Only returns summary, no dispatch of AI messages
    } catch (error) {
      console.error("❌ Error summarizing text:", error);
      alert("Failed to summarize text.");
      return "";
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return { handleSummarize };
};
