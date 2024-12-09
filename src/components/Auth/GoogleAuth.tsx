import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';

export const GoogleAuth: React.FC = () => {
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;

      // Vérifier le token avec votre backend
      const response = await fetch('https://dev-lw8jmojc842ubz12.us.auth0.com/api/v2/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const userData = await response.json();
        login(userData.email, userData.password); // Simuler une connexion
        navigate('/dashboard');
      } else {
        console.error('Google token verification failed');
      }
    } catch (error) {
      console.error('Google authentication failed:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID.apps.googleusercontent.com">
      <div className="w-full flex justify-center my-4">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log('Login Failed')}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
};
