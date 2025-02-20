import Image from "next/image";
import IconInterpreterLogo from "@/assets/icon-intepreter-logo.svg"; // Import the new SVG icon
import { useState, useEffect, useRef } from "react";

const DefaultChatOutput = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  // Check if the content overflows & update state
  useEffect(() => {
    if (containerRef.current) {
      setIsScrollable(containerRef.current.scrollHeight > containerRef.current.clientHeight);
    }
  }, []);

  return (
    <div className="h-full min-h-[calc(100vh-64px)] w-full flex flex-col items-center">
      <div 
        ref={containerRef} 
        className={`flex flex-col flex-grow justify-center items-center w-full p-4 pb-20 ${
          isScrollable ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        {/* Scaled-up icon - Ensures proper spacing */}
        <div className="flex justify-center w-full">
          <Image
            src={IconInterpreterLogo}
            alt="Interpreter Logo"
            className="w-24 h-24 mb-6"
          />
        </div>

        {/* Updated meaningful welcome text */}
        <p className="text-black bg-[#F5F5F5] p-4 rounded-lg max-w-xs text-center">
          I can detect your language, translate it into any language of your choice, 
          and even summarize the content for you.
        </p>
      </div>
    </div>
  );
};

export default DefaultChatOutput;
