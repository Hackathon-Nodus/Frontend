import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import SocialButton from '../components/SocialButton';
import Divider from '../components/Divider';
import InputField from '../components/InputField';

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'Client' | 'Solver'>('Client');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!fullName || !email || !password) {
      setError('Name, email and password are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: fullName,
          email, 
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      console.log('Registration successful:', data);
      alert('Registration successful! Please sign in.');
      window.location.href = '/signin';
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up');
  };

  return (
    <AuthLayout title="Create an account" subtitle="Join the structural network.">
      <SocialButton onClick={handleGoogleSignUp} />
      <Divider text="OR WITH EMAIL" />

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-2 text-red-500 text-sm text-center bg-red-50 rounded">
            {error}
          </div>
        )}

        <InputField
          label="FULL NAME"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
          required
        />

        <InputField
          label="EMAIL ADDRESS"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          required
        />

        <InputField
          label="PASSWORD"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required
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
          disabled={loading}
          className="w-full bg-black text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account...' : 'Get Started →'}
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