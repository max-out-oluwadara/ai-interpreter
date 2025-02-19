import Header from './Header';
import Search from './Search';
//import ChatOutput from './ChatOutput'; // Import ChatOutput component
import DefaultChatOutput from './DefaultChatOutput'; 

const Container = () => {
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
        sm:mx-0 /* Remove margin on small screens */
        sm:rounded-none /* Remove border-radius on sm and below */
        lg:rounded-[20px] /* Keep rounded corners on large screens */
      "
    >
      {/* Header section */}
      <Header />

      {/* Chat Output Wrapper */}
      <div className="h-0 flex-grow overflow-hidden">
        {/* <ChatOutput /> Importing the new ChatOutput component */}
        <DefaultChatOutput /> 
      </div>

      {/* Bottom div - stays in position */}
      <div
        className="
          w-full
          bg-white
          overflow-hidden
          rounded-[20px]
          sm:w-full
          max-w-full
        "
      >
        <Search />
      </div>
    </div>
  );
};

export default Container;
