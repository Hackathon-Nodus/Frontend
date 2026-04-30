import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface AvatarProps {
  src?: string;
  alt: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  userName?: string;
}

export function Avatar({ src, alt, fallback, size = 'md', onClick, userName }: AvatarProps) {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const getInitial = () => {
    if (fallback) return fallback.toUpperCase();
    if (userName && userName.length > 0) return userName.charAt(0).toUpperCase();
    return alt.charAt(0).toUpperCase();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Avatar clicked!');
    
    if (onClick) {
      onClick();
    } else {
      // Direct navigation - this WILL work
      
      navigate('/profile');
    }
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity duration-200`}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
    );
  }

  return (
    <div 
      className={`${sizes[size]} rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-200`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {getInitial()}
    </div>
  );
}