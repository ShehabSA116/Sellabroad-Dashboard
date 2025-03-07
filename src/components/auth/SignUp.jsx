// SignUp.jsx
import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import GoogleButton from '../../ui/GoogleButton';
import authService from '../../Services/authService';
import countryService from '../../Services/countryService';
import InputField from '../../ui/InputField'; // Adjust the path as needed
import SelectField from '../../ui/SelectField';
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    companyName: '',
    phoneNumber: '',
    companyWebsite: '',
    residenceCountry: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  const formFields = [
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      required: true,
      placeholder: 'your.email@example.com'
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      required: true,
      placeholder: '+1234567890'
    },
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      required: true,
      placeholder: 'Your Company Inc.'
    },
    {
      name: 'companyWebsite',
      label: 'Company Website',
      type: 'text',
      required: true,
      placeholder: 'https://example.com'
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      placeholder: 'Enter a strong password'
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      required: true,
      placeholder: 'Re-enter your password'
    }
  ];
  const firstLastNameFields = [
    {
      name: 'firstName',
      label: 'First name',
      type: 'text',
      required: true, 
      placeholder: 'John'
    },
    {
      name: 'lastName',
      label: 'Last name',
      type: 'text',
      required: true,
      placeholder: 'Doe'
    }
  ] 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    setIsLoading(true);
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const signupData = {
        email: formData.email,
        password: formData.password,
        fullName,
        companyName: formData.companyName,
        phoneNumber: formData.phoneNumber,
        companyWebsite: formData.companyWebsite,
        residenceCountry: formData.residenceCountry
      };
      
      console.log('Signup data being sent:', signupData);
      const response = await authService.signup(signupData);

      if (response.token) {
        navigate('/dashboard');
      } else {
        navigate('/auth/verify-otp');
      }
      toast.success('You have successfully created an account');
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
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
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred during signup');
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await countryService.getCountries();
        setCountries(response);
      } catch (err) {
        toast.error(err.response?.data?.message || 'An error occurred during signup');
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className="w-[80%] mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/auth/signin')}
            className="font-medium text-[#0049ac] hover:text-[#0049ac]/90"
          >
            sign in
          </button>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
      
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {firstLastNameFields.map(field => (
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
        </div>
 {/* Country Select */}
 <SelectField
  label="Country of Residence"
  name="residenceCountry"
  value={formData.residenceCountry}
  onChange={handleChange}
  required
  options={[
    { value: '', label: 'Select a country' },
    ...countries.map(country => ({ value: country._id, label: country.name }))
  ]}
/>
        {/* Other Form Fields */}
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

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`flex w-full justify-center rounded-md border border-transparent bg-[#0049ac] py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#0049ac]/90 focus:outline-none focus:ring-2 focus:ring-[#0049ac] focus:ring-offset-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Signing up...' : 'Create account'}
          </button>
        </div>

        {/* Google Button */}
        <div className="w-full">
          <GoogleButton onClick={handleGoogleLogin} label="Sign up with Google" />
        </div>
      </form>
    </div>
  );
}
