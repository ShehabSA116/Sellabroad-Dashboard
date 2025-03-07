import React, { useState,useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import GoogleButton from '../../ui/GoogleButton';
import authService from '../../Services/authService';
import { toast } from 'react-toastify';
import InputField from '../../ui/InputField';

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      navigate('/dashboard'); 
    }
  }, []);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      const { authUrl } = await authService.googleLogin();
      
      if (!authUrl) throw new Error('Auth URL not received');
  
      const width = 600, height = 600;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
  
      const popup = window.open(
        authUrl,
        'GoogleLoginPopup',
        `width=${width},height=${height},top=${top},left=${left},resizable=no`
      );
  
      if (!popup) {
        toast.error('Popup blocked! Allow popups in your browser.');
        return;
      }
  
      window.addEventListener('message', (event) => {
        if (event.origin !== window.location.origin) return;
  
        if (event.data.token) {
          localStorage.setItem('authToken', event.data.token);
          navigate('/dashboard');
        }
      });
      
    } catch (error) {
      toast.error('Error fetching Google auth URL:', error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authService.login(formData);
      if (response.token) {
        if (rememberMe) {
          localStorage.setItem('token', response.token);
        } 
        navigate('/dashboard');
      }
      else{
        toast.error('Invalid email or password');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred during Sign In';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  // Define form fields for InputField component
  const formFields = [
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      required: true,
      placeholder: 'your.email@example.com'
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      placeholder: 'Enter your password'
    }
  ];

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Replace the email and password inputs with InputField component */}
        {formFields.map(field => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
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
            disabled={isLoading}
            className={`flex w-full justify-center rounded-md border border-transparent bg-[#0049ac] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#0049ac]/90 focus:outline-none focus:ring-2 focus:ring-[#0049ac] focus:ring-offset-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6">
          <GoogleButton onClick={handleGoogleLogin} label="Sign in with Google" />
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Not a member?{' '}
        <Link to="/auth/signup" className="font-medium text-[#0049ac] hover:text-[#0049ac]/90">
          Sign up now
        </Link>
      </p>
    </div>
  );
} 