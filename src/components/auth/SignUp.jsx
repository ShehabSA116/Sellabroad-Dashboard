// SignUp.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from "react-google-button";
import authService from '../../Services/authService';
import countryService from '../../Services/countryService';
import InputField from '../../ui/InputField'; // Adjust the path as needed

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
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  const formFields = [
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      required: true,
      placeholder: ''
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
      placeholder: ''
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
      placeholder: ''
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      required: true,
      placeholder: ''
    }
  ];
  const firstLastNameFields = [
    {
      name: 'firstName',
      label: 'First name',
      type: 'text',
      required: true, 
      placeholder: ''
    },
    {
      name: 'lastName',
      label: 'Last name',
      type: 'text',
      required: true,
      placeholder: ''
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
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
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
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await countryService.getCountries();
        console.log('Countries response:', JSON.stringify(response, null, 2));
        setCountries(response);
      } catch (error) { 
        console.error('Error fetching countries:', error);
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
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
 
 
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
 <div>
          <label htmlFor="residenceCountry" className="block text-sm font-medium text-gray-700">
            Country of Residence
          </label>
          <div className="mt-1">
            <select
              name="residenceCountry"
              id="residenceCountry"
              value={formData.residenceCountry}
              onChange={handleChange}
              required
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0049ac] focus:outline-none focus:ring-[#0049ac] sm:text-sm"
            >
              <option value="">Select a country</option>
              {countries.map(country => (
                <option key={country._id} value={country._id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>


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
          <GoogleButton style={{ width: '100%', borderRadius: '0.375rem' }} />
        </div>
      </form>
    </div>
  );
}
