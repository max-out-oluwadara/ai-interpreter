"use client"; // ✅ Ensure this runs as a Client Component

import { useEffect, useRef, useState } from "react";
import messages from "@/data/message"; // Import messages

const ChatOutput = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false); // ✅ Track when the component is fully mounted

  // ✅ Ensure scrolling works properly on iPhone Safari
  useEffect(() => {
    setLoaded(true); // ✅ Set loaded to true after the first render

    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 200); // ✅ Delay ensures iPhone Safari renders messages before scrolling
  }, []);

  return (
    <div
      ref={chatContainerRef}
      className="h-full space-y-3 p-4 overflow-y-auto"
    >
      {loaded && messages.length > 0 ? (
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
