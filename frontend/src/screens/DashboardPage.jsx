import React, { useEffect, useState, useCallback } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newRestaurantName, setNewRestaurantName] = useState('');

  const loadRestaurants = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await manifest.from('Restaurant').find({ include: ['owner'] });
      setRestaurants(response.data);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    } finally {
      setIsLoading(false);
    }
  }, [manifest]);

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  const handleCreateRestaurant = async (evt) => {
    evt.preventDefault();
    if (!newRestaurantName.trim()) return;
    try {
      const newRestaurant = await manifest.from('Restaurant').create({ name: newRestaurantName });
      setRestaurants([newRestaurant, ...restaurants]);
      setNewRestaurantName('');
    } catch (error) {
      console.error('Failed to create restaurant:', error);
      alert('Could not create restaurant.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FlavorFind</h1>
            <p className="text-sm text-gray-500">Welcome, {user.name}!</p>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href={`${config.BACKEND_URL}/admin`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              Admin Panel
            </a>
            <button 
              onClick={onLogout}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Create Restaurant Form */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Your Restaurant</h2>
            <form onSubmit={handleCreateRestaurant} className="flex space-x-4">
              <input
                type="text"
                placeholder="Restaurant Name"
                value={newRestaurantName}
                onChange={(e) => setNewRestaurantName(e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <button type="submit" className="px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                Create
              </button>
            </form>
          </div>

          {/* Restaurants List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Discover Restaurants</h2>
            {isLoading ? (
              <p className="text-gray-500">Loading restaurants...</p>
            ) : restaurants.length === 0 ? (
              <p className="text-gray-500">No restaurants found. Add one to get started!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map(restaurant => (
                  <div key={restaurant.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="p-5">
                      <h3 className="font-semibold text-lg text-gray-900 truncate">{restaurant.name}</h3>
                      {restaurant.owner && <p className="text-sm text-gray-500 mt-1">Owner: {restaurant.owner.name}</p>}
                      <p className="text-sm text-gray-600 mt-2 truncate">{restaurant.description || 'No description available.'}</p>
                      {user.id === restaurant.owner?.id && (
                        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium mt-3 px-2.5 py-0.5 rounded-full">Your Restaurant</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
