import Image from 'next/image';
import LogoInterpreter from '@/assets/icon-intepreter-logo.svg';
import IconHistory from '@/assets/icon-history.svg';

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full pb-2 ">
      <div className="flex items-center space-x-2">
        <Image src={LogoInterpreter} alt="Interpreter Logo" width={32} height={32} />
        <p className="text-lg font-bold text-black">AI interpreter</p>
      </div>
      <Image src={IconHistory} alt="History Icon" width={32} height={32} />
    </div>
  );
};

export default Header;
