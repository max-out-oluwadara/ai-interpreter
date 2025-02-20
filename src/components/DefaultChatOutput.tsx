import Image from "next/image";
import IconInterpreterLogo from "@/assets/icon-intepreter-logo.svg"; // Import the new SVG icon

const DefaultChatOutput = () => {
  return (
    <div className="h-full flex flex-col flex-grow min-h-0 justify-end items-center w-full p-4 pb-8">
      {/* Scaled-up icon */}
      <Image
        src={IconInterpreterLogo}
        alt="Interpreter Logo"
        className="w-24 h-24 mb-4"
      />

      {/* Updated meaningful welcome text */}
      <p className="text-black bg-[#F5F5F5] p-4 rounded-lg max-w-xs text-center">
        I can detect your language, translate it into any language of your choice, 
        and even summarize the content for you.
      </p>
    </div>
  );
};

export default DefaultChatOutput;
