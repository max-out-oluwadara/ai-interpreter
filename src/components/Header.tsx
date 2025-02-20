import Image from 'next/image';
import LogoInterpreter from '@/assets/icon-intepreter-logo.svg';
import IconHistory from '@/assets/icon-history.svg';

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full bg-[#EEEEEE] flex items-center justify-between px-4 py-3 z-10">
      <div className="flex items-center space-x-2">
        <Image src={LogoInterpreter} alt="Interpreter Logo" width={32} height={32} />
        <p className="text-lg font-bold text-black">AI Interpreter</p>
      </div>
      <Image src={IconHistory} alt="History Icon" width={32} height={32} />
    </div>
  );
};

export default Header;
