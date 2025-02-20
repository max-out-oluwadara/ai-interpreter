"use client"; // ✅ Ensure this runs as a Client Component

import Image from "next/image";
import IconSend from "@/assets/icon-send.svg";
import IconTranslate from "@/assets/icon-translate.svg";
import IconDropDown from "@/assets/icon-dropdown.svg";
import { useSummarizer } from "@/hooks/useSummarizer"; // ✅ Import Summarizer logic
import { useTranslator } from "@/hooks/useTranslator"; // ✅ Import Translator logic

const Search = () => {
  const { text, setText, result: summary, mode, setMode, loading, handleSummarize } = useSummarizer();
  const {
    translatedText,
    setTranslatedText, // ✅ Ensures translation resets when text changes
    sourceLanguage,
    setSourceLanguage,
    targetLanguage,
    setTargetLanguage,
    handleTranslate,
  } = useTranslator();

  // ✅ Reset translation when text changes
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (mode === "translate") {
      setTranslatedText(""); // ✅ Clears previous translation when input changes
    }
  };

  const handleSend = () => {
    if (mode === "translate") {
      handleTranslate();
    } else {
      handleSummarize();
    }
  };

  return (
    <div>
      {/* Bottom Input - now responsive */}
      <div className="p-2">
        <textarea
          autoFocus
          className="
            w-full
            placeholder:italic
            placeholder:text-slate-400
            bg-inherit
            outline-none
            focus:outline-none
            cursor-text
            caret-black
            text-black /* Ensures typed text is black */
            pl-2 /* Increase left padding for bigger gap */
            resize-none /* Prevent resizing */
          "
          rows={3}
          placeholder="I can translate any language..."
          value={text}
          onChange={handleTextChange} // ✅ Ensures translation resets when input changes
        />
      </div>

      {/* Output Display (Summary or Translation) */}
      {(summary || translatedText) && (
        <div className="p-2 mt-2 border border-gray-300 rounded-md">
          <p className="text-sm text-gray-700">
            {mode === "translate" ? translatedText : summary}
          </p>
        </div>
      )}

      {/* Bottom Sending - now responsive */}
      <div className="bg-[#F7F7F7] p-4">
        {/* Translate and Summarize buttons - now responsive */}
        <div className="flex space-x-4">
          <button
            onClick={() => setMode("translate")}
            className={`w-1/2 border px-4 py-2 rounded-[10px] ${
              mode === "translate"
                ? "bg-[#BAE8D1] border-black"
                : "border-[#BAE8D1] text-black bg-inherit hover:bg-[#BAE8D1] hover:border-black"
            }`}
          >
            Translate
          </button>

          <button
            onClick={() => setMode("summarize")}
            className={`w-1/2 border px-4 py-2 rounded-[10px] ${
              mode === "summarize"
                ? "bg-[#BAE8D1] border-black"
                : "border-[#BAE8D1] text-black bg-inherit hover:bg-[#BAE8D1] hover:border-black"
            }`}
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>
        </div>

        {/* Translate option and send */}
        <div className="flex items-center mt-2 gap-4">
          {/* LEFT SIDE (50% width) */}
          <div className="w-1/2 flex items-center space-x-2">
            {/* First Select Dropdown */}
            <div className="relative flex-1">
              <select
                className="w-full border border-[#19B667] bg-inherit px-3 py-2 pr-8 appearance-none text-[#D5D5D5]"
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
              </select>
              <Image
                src={IconDropDown}
                alt="Dropdown Icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>

            {/* Translate icon in the middle */}
            <Image src={IconTranslate} alt="Translate Icon" width={32} height={32} />

            {/* Second Select Dropdown */}
            <div className="relative flex-1">
              <select
                className="w-full border border-[#19B667] bg-inherit px-3 py-2 pr-8 appearance-none text-[#D5D5D5]"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>

          {/* Send Button */}
          <div className="flex-1 flex justify-end">
            <button onClick={handleSend}>
              <Image src={IconSend} alt="Send Icon" width={32} height={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
