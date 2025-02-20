import Image from 'next/image';
import IconSend from '@/assets/icon-send.svg';
import IconTranslate from '@/assets/icon-translate.svg';
import IconDropDown from '@/assets/icon-dropdown.svg';

const Search = () => {
  return (
    <div >
      {/* Bottom Input - now responsive */}
      <div className="p-2">
        <textarea
          autoFocus
          className="
            w-full
            placeholder:italic
            placeholder:text-slate-400
            bg-inherit
            outline-none
            focus:outline-none
            cursor-text
            caret-black
            text-black /* Ensures typed text is black */
            pl-2 /* Increase left padding for bigger gap */
            resize-none /* Prevent resizing */
          "
          rows={3}
          placeholder="I can translate any language..."
        />
      </div>

      {/* Bottom Sending - now responsive */}
      <div className="bg-[#F7F7F7] p-4">
        {/* Translate and Summarize buttons - now responsive */}
        <div className="flex space-x-4">
          <button
            className="
              w-1/2 
              border 
              border-[#BAE8D1] 
              text-black 
              bg-inherit 
              px-4 
              py-2 
              rounded-[10px]
              hover:bg-[#BAE8D1] 
              hover:border-black
            "
          >
            Translate
          </button>
          <button
            className="
              w-1/2 
              border 
              border-[#BAE8D1] 
              text-black 
              bg-inherit 
              px-4 
              py-2 
              rounded-[10px]
              hover:bg-[#BAE8D1] 
              hover:border-black
            "
          >
            Summarize
          </button>
        </div>

        {/* Translate option and send */}
        <div className="flex items-center mt-2 gap-4">
          {/* LEFT SIDE (50% width) */}
          <div className="w-1/2 flex items-center space-x-2">
            {/* First Select Dropdown */}
            <div className="relative flex-1">
              <select
                className="
                  w-full
                  border border-[#19B667]
                  bg-inherit
                  px-3 py-2
                  pr-8
                  appearance-none
                  text-[#D5D5D5]  /* Text color inside the box */
                "
              >
                <option>English</option>
                <option>French</option>
                <option>Spanish</option>
                <option>German</option>
              </select>
              {/* Dropdown icon on right edge */}
              <Image
                src={IconDropDown}
                alt="Dropdown Icon"
                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  pointer-events-none
                "
              />
            </div>

            {/* Translate icon in the middle */}
            <Image src={IconTranslate} alt="Translate Icon" width={32} height={32} />

            {/* Second Select Dropdown */}
            <div className="relative flex-1">
              <select
                className="
                  w-full
                  border border-[#19B667]
                  bg-inherit
                  px-3 py-2
                  pr-8
                  appearance-none
                  text-[#D5D5D5] /* Text color inside the box */
                "
              >
                <option>English</option>
                <option>French</option>
                <option>Spanish</option>
                <option>German</option>
              </select>
              {/* Dropdown icon on right edge */}
              <Image
                src={IconDropDown}
                alt="Dropdown Icon"
                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  pointer-events-none
                "
              />
            </div>
          </div>

          {/* RIGHT SIDE (icon aligned far right) */}
          <div className="flex-1 flex justify-end">
            <Image src={IconSend} alt="Send Icon" width={32} height={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
