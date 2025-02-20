import Image from 'next/image';
import LogoInterpreter from '@/assets/icon-intepreter-logo.svg';
import IconHistory from '@/assets/icon-history.svg';

const Header = () => {
  return (
    <div className="
      fixed 
      top-0 
      left-0 
      right-0 
      w-full 
      bg-[#EEEEEE] 
      flex 
      items-center 
      justify-between 
      pb-1 
      pt-1 
      sm:pb-2 
      sm:pt-2 
      z-50
      px-4
      sm:static
      sm:px-0
    ">
      <div className="flex items-center space-x-2">
        <Image
          src={LogoInterpreter}
          alt="Interpreter Logo"
          width={32}
          height={32}
          className="w-6 h-6 sm:w-8 sm:h-8"
        />
        <p className="text-sm sm:text-lg font-bold text-black">
          AI Interpreter
        </p>
      </div>
      <Image
        src={IconHistory}
        alt="History Icon"
        width={32}
        height={32}
        className="w-6 h-6 sm:w-8 sm:h-8"
      />
    </div>
  );
};

export default Header;