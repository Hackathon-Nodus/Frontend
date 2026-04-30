import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import SocialButton from '../components/SocialButton';
import Divider from '../components/Divider';
import InputField from '../components/InputField';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token from the response
      if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
        console.log('Login successful, token stored');
      }
      
      alert('Login successful!');
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
        {error && (
          <div className="mb-4 p-2 text-red-500 text-sm text-center bg-red-50 rounded">
            {error}
          </div>
        )}

        <InputField
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          required
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
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
          disabled={loading}
          className="w-full bg-black text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign In'}
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