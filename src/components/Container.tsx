"use client"; // ✅ Ensure this is a Client Component

import { useAppContext } from "@/context/AppContext"; // ✅ Import Context
import Header from "./Header";
import Search from "./Search";
import ChatOutput from "./ChatOutput";
import DefaultChatOutput from "./DefaultChatOutput"; // ✅ Import Default Chat Output

const Container = () => {
  const { state } = useAppContext();
  const hasMessages = state.messages.length > 0; // ✅ Check if messages exist

  return (
    <div
      className="
        bg-[#EEEEEE]
        w-full
        max-w-full
        min-h-screen
        p-[16px]
        flex
        flex-col
        sm:p-[16px]
        sm:max-w-[818px]
        lg:w-[818px]
        lg:mx-auto
        lg:p-[16px]
        sm:mb-16
        overflow-hidden
        sm:mx-0
        sm:rounded-none
        lg:rounded-[20px]
      "
    >
      {/* Header section */}
      <Header />

      {/* Chat Output Wrapper */}
      <div className="h-0 flex-grow overflow-y-auto">
        {/* ✅ Dynamically show ChatOutput if messages exist, otherwise DefaultChatOutput */}
        {hasMessages ? <ChatOutput /> : <DefaultChatOutput />}
      </div>
        
      {/* Bottom div - adjusted for mobile */}
      <div
        className="
          w-full
          bg-white
          overflow-hidden
          rounded-[20px]
          sm:w-full
          max-w-full
          sm:mb-0
        "
      >
        <Search />
      </div>
    </div>
  );
};

export default Container;
