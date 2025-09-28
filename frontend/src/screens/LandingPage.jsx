import React, { useState } from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthAction = (evt) => {
    evt.preventDefault();
    if (isLoginView) {
      onLogin(email, password);
    } else {
      onSignup(name, email, password);
    }
  };

  const handleDemoLogin = () => {
    // Note: This user might not exist. Create 'demo@example.com' via admin panel first.
    onLogin('demo@example.com', 'password123');
  };

  return (
    <div className="relative min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">FlavorFind</h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLoginView ? 'Sign in to your account' : 'Create a new account'}
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleAuthAction} className="space-y-6">
                {!isLoginView && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <div className="mt-1">
                      <input id="name" name="name" type="text" value={name} onChange={e => setName(e.target.value)} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <div className="mt-1">
                    <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="mt-1">
                    <input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                </div>

                <div>
                  <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {isLoginView ? 'Sign in' : 'Sign up'}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button onClick={handleDemoLogin} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Try Demo
                    </button>
                     <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Admin Panel
                    </a>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-gray-600">
                {isLoginView ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-indigo-600 hover:text-indigo-500">
                  {isLoginView ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" alt="Food" />
      </div>
    </div>
  );
};

export default LandingPage;
