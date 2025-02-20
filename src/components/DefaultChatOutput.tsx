import Image from "next/image";
import IconInterpreterLogo from "@/assets/icon-intepreter-logo.svg"; // Import the new SVG icon

const DefaultChatOutput = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
        {/* Scaled-up icon - Centered */}
        <div className="w-full flex justify-center">
          <Image
            src={IconInterpreterLogo}
            alt="Interpreter Logo"
            className="w-24 h-24 mb-4 block"
          />
        </div>

        {/* Updated meaningful welcome text */}
        <p className="text-black bg-[#F5F5F5] p-4 rounded-lg max-w-xs text-center mx-auto">
          I can detect your language, translate it into any language of your choice, 
          and even summarize the content for you.
        </p>
      </div>
    </div>
  );
};

export default DefaultChatOutput;
