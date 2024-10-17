import React, { useState } from "react";
import axios from "axios";

const RestaurantForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rating, setRating] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Validate inputs
    if (!name || !address || !phoneNumber || !rating) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(phoneNumber)) {
      setErrorMessage("Phone number must be a 10-digit number.");
      return;
    }

    // Validate rating (0-5)
    if (isNaN(rating) || rating < 0 || rating > 5) {
      setErrorMessage("Rating must be a number between 0 and 5.");
      return;
    }

    const newRestaurant = {
      name,
      address,
      phone_number: phoneNumber,
      rating: parseFloat(rating),
    };

    try {
      await axios.post(
        "http://localhost:4500/api/restaurant/create",
        newRestaurant
      );
      setSuccessMessage("Restaurant added successfully!");
      setName("");
      setAddress("");
      setPhoneNumber("");
      setRating("");
    } catch (error) {
      setErrorMessage("Failed to add restaurant. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Add New Restaurant
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Rating (0-5)</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            min="0"
            max="5"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default RestaurantForm;
