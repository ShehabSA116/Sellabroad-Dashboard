import { useEffect } from 'react';

const AuthCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      window.opener.postMessage({ token }, window.opener.location.origin);
      window.close(); 
    }
  }, []);
};

export default AuthCallback;
