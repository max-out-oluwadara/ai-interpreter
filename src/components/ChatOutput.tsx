"use client"; // ✅ Required for hooks

import { useEffect, useRef } from "react";
import messages from "@/data/message"; // Import messages

const ChatOutput = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ✅ Ensure scrolling works properly on iPhone
  useEffect(() => {
    if (chatContainerRef.current && chatEndRef.current) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Small delay to ensure proper rendering
    }
  }, []); // ✅ Runs only once after component mounts

  return (
    <div ref={chatContainerRef} className="h-full space-y-3 p-4 overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
        >
          <p
            className={`
              ${message.sender === "user" ? "bg-[#FFFFFF]" : "bg-[#BAE8D1]"}
              p-2 sm:p-3 rounded-lg text-black max-w-xs 
              text-sm sm:text-base /* Reduce font size on sm screens */
            `}
          >
            {message.text}
          </p>
        </div>
      ))}
      {/* ✅ Invisible div at the bottom to scroll into view */}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatOutput;
