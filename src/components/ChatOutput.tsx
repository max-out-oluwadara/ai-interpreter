"use client"; // ✅ Marks this file as a Client Component

import { useEffect, useRef } from "react";
import messages from "@/data/message"; // Import messages

const ChatOutput = () => {
  // Create a reference to track the chat bottom
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom after render
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []); // ✅ Run only once after the component mounts

  return (
    <div className="h-full space-y-3 px-2 pt-8 overflow-y-auto">
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
      {/* Invisible div at the bottom to scroll into view */}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatOutput;
