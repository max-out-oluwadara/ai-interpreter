import Header from './Header';
import Search from './Search';
import ChatOutput from './ChatOutput';

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
        sm:mx-0
        sm:rounded-none
        lg:rounded-[20px]
      "
    >
      {/* Header section */}
      <Header />

      {/* Chat Output Wrapper */}
      <div className="h-0 flex-grow overflow-hidden">
        <ChatOutput />
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
          mb-[25px]
          sm:mb-0
        "
      >
        <Search />
      </div>
    </div>
  );
};

export default Container;