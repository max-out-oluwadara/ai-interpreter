"use client"; // ✅ Ensure this is a Client Component

import Header from './Header';
import Search from './Search';
import ChatOutput from './ChatOutput';
import DefaultChatOutput from './DefaultChatOutput';

const Container = () => {
  // ✅ Hardcoded to `true` or `false`
  const hasMessages = false; // Change this to `false` to see DefaultChatOutput

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
      <div className="h-0 flex min-h-0 flex-grow overflow-y-auto pb-2">
        {/* ✅ Show ChatOutput if `hasMessages` is true, otherwise show DefaultChatOutput */}
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
