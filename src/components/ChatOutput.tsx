import messages from "@/data/message"; // Import messages

const ChatOutput = () => {
  return (
    <div className="h-full space-y-3 p-4">
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
    </div>
  );
};

export default ChatOutput;
