import Image from "next/image";
import IconInterpreterLogo from "@/assets/icon-intepreter-logo.svg"; // Import the new SVG icon

const DefaultChatOutput = () => {
  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-64px)] justify-center items-center w-full p-4">
      {/* Scaled-up icon - Ensures proper spacing */}
      <div className="flex justify-center w-full">
        <Image
          src={IconInterpreterLogo}
          alt="Interpreter Logo"
          className="w-24 h-24 mb-4"
        />
      </div>

      {/* Updated meaningful welcome text */}
      <p className="text-black bg-[#F5F5F5] p-4 rounded-lg max-w-xs text-center">
        I can detect your language, translate it into any language of your choice, 
        and even summarize the content for you.
      </p>
    </div>
  );
};

export default DefaultChatOutput;
