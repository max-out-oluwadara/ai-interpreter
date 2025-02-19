import Image from "next/image";
import IconInterpreterLogo from "@/assets/icon-intepreter-logo.svg"; // Import the new SVG icon

const DefaultChatOutput = () => {
  return (
    <div className="h-full flex flex-col justify-end items-center p-4">
      {/* Scaled-up icon (3x in both width & height) and moved up */}
      <Image
        src={IconInterpreterLogo}
        alt="Interpreter Logo"
        className="scale-[3] mb-8 mt-auto"
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
