"use client"; // ✅ Required for hooks

import { useEffect, useRef } from "react";
import messages from "@/data/message"; // Import messages

const ChatOutput = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // ✅ Auto-scroll to bottom when chat loads (iPhone-safe)
  useEffect(() => {
    if (chatContainerRef.current) {
      requestAnimationFrame(() => {
        chatContainerRef.current!.scrollTop = chatContainerRef.current!.scrollHeight;
      });
    }
  }, []); // ✅ No `messages.length` dependency (Fixes ESLint Warning)

  return (
    <div
      ref={chatContainerRef}
      className="h-full space-y-3 p-4 overflow-y-auto"
    >
      {messages.length > 0 ? (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`
                ${message.sender === "user" ? "bg-[#FFFFFF]" : "bg-[#BAE8D1]"}
                p-2 sm:p-3 rounded-lg text-black max-w-xs 
                text-sm sm:text-base
              `}
            >
              {message.text}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No messages yet.</p>
      )}
    </div>
  );
};

export default ChatOutput;
