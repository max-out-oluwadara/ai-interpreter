// ✅ Declare global interface for AI-related APIs
declare global {
    interface Window {
      ai?: WindowAI;
    }
  
    interface WindowAI {
      summarizer?: {
        capabilities: () => Promise<{ available: "no" | "readily" | "after-download" }>;
        create: (options?: SummarizerOptions) => Promise<SummarizerInstance>;
      };
      translator?: {
        capabilities: () => Promise<TranslatorCapabilities>;
        create: (options: TranslatorOptions) => Promise<TranslatorInstance>;
      };
      languageDetector?: {
        capabilities: () => Promise<LanguageDetectorCapabilities>;
        create: () => Promise<LanguageDetectorInstance>;
      };
    }
  
    interface SummarizerOptions {
      type?: "key-points" | "tl;dr" | "teaser" | "headline";
      format?: "markdown" | "plain-text";
      length?: "short" | "medium" | "long";
    }
  
    interface SummarizerInstance {
      summarize: (text: string, options?: { context?: string }) => Promise<string>;
    }
  
    interface TranslatorOptions {
      sourceLanguage: string;
      targetLanguage: string;
    }
  
    interface TranslatorCapabilities {
      languagePairAvailable: (
        source: string,
        target: string
      ) => "no" | "readily" | "after-download";
    }
  
    interface TranslatorInstance {
      translate: (text: string) => Promise<string>;
    }
  
    interface LanguageDetectorCapabilities {
      available: "no" | "readily" | "after-download";
      languageAvailable: (language: string) => Promise<"no" | "readily" | "after-download">;
    }
  
    interface LanguageDetectorInstance {
      detect: (text: string) => Promise<DetectedLanguage[]>;
    }
  
    interface DetectedLanguage {
      detectedLanguage: string;
      confidence: number;
    }
  }
  
  // ✅ Export nothing, but ensure TypeScript knows this file is a module
  export {};
  