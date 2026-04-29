import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import SocialButton from '../components/SocialButton';
import Divider from '../components/Divider';
import InputField from '../components/InputField';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('name@company.com');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
  };

  return (
    <AuthLayout title="Sign In" subtitle="Welcome back to the marketplace">
      <SocialButton onClick={handleGoogleSignIn} />
      <Divider text="OR WITH EMAIL" />

      <form onSubmit={handleSubmit}>
        <InputField
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          rightElement={
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
            >
              Forgot Password?
            </button>
          }
        />

        <button
          type="submit"
          className="w-full bg-black text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-gray-500 text-sm mt-6">
        Don't have an account?{' '}
        <a href="/" className="text-black hover:underline font-medium">
          Sign Up
        </a>
      </p>
    </AuthLayout>
  );
};

export default SignIn;