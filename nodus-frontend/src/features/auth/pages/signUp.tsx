import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import SocialButton from '../components/SocialButton';
import Divider from '../components/Divider';
import InputField from '../components/InputField';

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState('Jane Doe');
  const [email, setEmail] = useState('name@company.com');
  const [password, setPassword] = useState('********');
  const [userType, setUserType] = useState<'Client' | 'Solver'>('Client');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ fullName, email, password, userType });
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up');
  };

  return (
    <AuthLayout title="Create an account" subtitle="Join the structural network.">
      <SocialButton onClick={handleGoogleSignUp} />
      <Divider text="OR WITH EMAIL" />

      <form onSubmit={handleSubmit}>
        <InputField
          label="FULL NAME"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
        />

        <InputField
          label="EMAIL ADDRESS"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
        />

        <InputField
          label="PASSWORD"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">I AM JOINING AS</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-black cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="Client"
                checked={userType === 'Client'}
                onChange={() => setUserType('Client')}
                className="w-4 h-4 accent-black"
              />
              <span>A Client</span>
            </label>
            <label className="flex items-center gap-2 text-black cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="Solver"
                checked={userType === 'Solver'}
                onChange={() => setUserType('Solver')}
                className="w-4 h-4 accent-black"
              />
              <span>A Solver</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Get Started →
        </button>
      </form>

      <p className="text-center text-gray-500 text-sm mt-6">
        Already have an account?{' '}
        <a href="/signin" className="text-black hover:underline font-medium">
          Sign In
        </a>
      </p>
    </AuthLayout>
  );
};

export default SignUp;