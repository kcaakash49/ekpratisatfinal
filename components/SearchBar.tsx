'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [location, setLocation] = useState('Kathmandu');
  const [propertyType, setPropertyType] = useState('House');
  const [price, setPrice] = useState(0);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap items-center gap-4">
      {/* Location Dropdown */}
      <div>
        <label className="block text-gray-700">Location</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option>Kathmandu</option>
          <option>Bhaktapur</option>
          <option>Lalitpur</option>
        </select>
      </div>

      {/* Property Type Dropdown */}
      <div>
        <label className="block text-gray-700">Property Type</label>
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option>House</option>
          <option>Apartment</option>
          <option>Flat</option>
        </select>
      </div>

      {/* Price Range Slider */}
      <div className="flex flex-col">
        <label className="block text-gray-700">Price</label>
        <input
          type="range"
          min="1"
          max="300"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          className="w-40 accent-green-500"
        />
        <span>{price}k</span>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-gray-700">Bedrooms</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={`px-3 py-2 rounded ${bedrooms === num ? 'bg-green-400 text-white' : 'bg-gray-200'}`}
              onClick={() => setBedrooms(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <label className="block text-gray-700">Bathrooms</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={`px-3 py-2 rounded ${bathrooms === num ? 'bg-green-400 text-white' : 'bg-gray-200'}`}
              onClick={() => setBathrooms(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">Search</button>
    </div>
  );
}
