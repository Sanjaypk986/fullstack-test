import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:4500/api/restaurant/get-restaurants');
        console.log(response.data.data);
        setRestaurants(response.data.data);
        setLoading(false); 
      } catch (err) {
        setError('Failed to fetch restaurants');
        setLoading(false); 
      }
    };
  
    fetchRestaurants();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Restaurant List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div key={restaurant._id} className="bg-white shadow-lg cursor-pointer rounded-lg p-6 transition-shadow hover:shadow-xl">
              <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
              <p className="text-gray-700">Rating: <span className="font-semibold text-blue-600">{restaurant.rating}</span></p>
              <p className="text-gray-500">Phone: {restaurant.phone_number}</p>
              <p className="text-gray-500">Address: {restaurant.address}</p>
            </div>
          ))
        ) : (
          <h2 className="text-center text-gray-500">No Restaurants available</h2>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
