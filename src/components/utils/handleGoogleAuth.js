import { toast } from 'react-toastify';
import authService from '../../Services/authService'; // adjust path as needed

export const handleGoogleAuth = async (navigate, redirectPath) => {
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
        localStorage.setItem('token', event.data.token);
        navigate(redirectPath);
      }
    });
  } catch (err) {
    toast.error(err.response?.data?.message || 'An error occurred during authentication');
    throw err;
  }
};
