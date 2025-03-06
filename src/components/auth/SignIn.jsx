import { Link } from 'react-router-dom';
import GoogleButton from "react-google-button";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../Services/authService';
import { toast } from 'react-toastify';
export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      navigate('/dashboard'); // Auto-login if token exists
    }
  }, [navigate]);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleGoogleLogin = async () => {
    try {
      await authService.googleLogin();
    } catch (error) {
      console.error('Google login error:', error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {

      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      // If signup is successful and returns a token, navigate to dashboard
      if (response.token) {
        if (rememberMe) {
          localStorage.setItem('token', response.token);
        }
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during Sign In');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      title="Welcome back"
      subtitle={
        <>
          New to our platform?{' '}
          <Link to="/auth/signup" className="font-medium text-[#0049ac] hover:text-[#0049ac]/90">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={handleChange}
              required
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0049ac] focus:outline-none focus:ring-[#0049ac] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
              required
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0049ac] focus:outline-none focus:ring-[#0049ac] sm:text-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              onChange={handleRememberMe}
              className="h-4 w-4 rounded border-gray-300 text-[#0049ac] focus:ring-[#0049ac]"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link to="/auth/forgot-password" className="font-medium text-[#0049ac] hover:text-[#0049ac]/90">
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-[#0049ac] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#0049ac]/90 focus:outline-none focus:ring-2 focus:ring-[#0049ac] focus:ring-offset-2"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
        <div className='flex justify-center'>
          <GoogleButton onClick={handleGoogleLogin}/>
        </div>
      </form>
    </div>
  );
} 