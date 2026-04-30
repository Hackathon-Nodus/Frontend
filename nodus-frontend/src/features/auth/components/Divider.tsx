import React from 'react';

interface DividerProps {
  text: string;
}

const Divider: React.FC<DividerProps> = ({ text }) => {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-2 text-[11px] text-gray-400 tracking-widest">
          {text}
        </span>
      </div>
    </div>
  );
};

export default Divider;