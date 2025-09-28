import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import config from './constants.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const manifest = new Manifest({
    baseURL: config.BACKEND_URL,
    appId: config.APP_ID,
  });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const currentUser = await manifest.from('User').me();
          setUser(currentUser);
          setCurrentScreen('dashboard');
          console.log('✅ [APP] User is logged in:', currentUser.email);
        } catch (error) {
          setUser(null);
          setCurrentScreen('landing');
          console.log('ℹ️ [APP] No active user session.');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', connectionResult.error);
      }
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  const login = async (email, password) => {
    try {
      await manifest.login(email, password);
      const loggedInUser = await manifest.from('User').me();
      setUser(loggedInUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };
  
  const signup = async (name, email, password) => {
    try {
      await manifest.from('User').signup({ name, email, password, role: 'customer' });
      await login(email, password);
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. The email might already be in use.');
    }
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
    setCurrentScreen('landing');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading Application...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 p-2 rounded-full bg-white shadow-md">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm font-medium text-gray-700">{backendConnected ? 'API Connected' : 'API Offline'}</span>
      </div>

      {currentScreen === 'landing' ? (
        <LandingPage onLogin={login} onSignup={signup} />
      ) : user ? (
        <DashboardPage user={user} onLogout={logout} manifest={manifest} />
      ) : (
        <LandingPage onLogin={login} onSignup={signup} />
      )}
    </div>
  );
}

export default App;
