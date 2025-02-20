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
    <div 
      ref={containerRef} 
      className={`flex flex-col h-full min-h-[calc(100vh-64px)] justify-center items-center w-full p-4 ${
        isScrollable ? "overflow-y-auto" : "overflow-y-hidden"
      }`}
    >
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
