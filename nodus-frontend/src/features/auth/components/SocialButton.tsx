import React from 'react';
import { FcGoogle } from 'react-icons/fc';

interface SocialButtonProps {
  onClick?: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white py-3 rounded-md text-gray-700 hover:bg-gray-50 transition mb-6"
    >
      <FcGoogle className="w-5 h-5" />
      <span className="text-sm">Continue with Google</span>
    </button>
  );
};

export default SocialButton;