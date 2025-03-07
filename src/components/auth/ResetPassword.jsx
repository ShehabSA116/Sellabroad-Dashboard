import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../Services/authService';
import { toast } from 'react-toastify';
import InputField from '../../ui/InputField';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

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

    // Basic validation
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
      // Get the token that was stored after OTP verification
      const token = localStorage.getItem('resetToken');
      
      if (!token) {
        toast.error('Reset token not found. Please try the forgot password process again.');
        return;
      }

      await authService.resetPassword(token, formData.password);
      
      // Clear the stored tokens
      localStorage.removeItem('resetToken');
      localStorage.removeItem('resetEmail');
      
      toast.success('Password reset successfully');
      // Navigate to login page
      navigate('/auth/signin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      title="Set new password"
      subtitle="Please enter your new password below."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="New password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required={true}
          placeholder="Enter your new password"
        />

        <InputField
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required={true}
          placeholder="Confirm your new password"
        />

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`flex w-full justify-center rounded-md border border-transparent bg-[#0049ac] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#0049ac]/90 focus:outline-none focus:ring-2 focus:ring-[#0049ac] focus:ring-offset-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Resetting password...' : 'Reset password'}
          </button>
        </div>
      </form>
    </div>
  );
} 