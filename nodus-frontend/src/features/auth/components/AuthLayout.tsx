import React from 'react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-semibold tracking-widest text-black">
            NODUS
          </h1>
        </div>

        {/* Content */}
{/* Card Container */}
<div className="bg-white border border-blue-400 rounded-xl shadow-sm px-6 py-8">
  <div className="text-center mb-8">
    <h2 className="text-3xl font-semibold text-gray-900">{title}</h2>
    <p className="text-gray-500 text-sm mt-2">{subtitle}</p>
  </div>

  {children}
</div>
      </div>
    </div>
  );
};

export default AuthLayout;