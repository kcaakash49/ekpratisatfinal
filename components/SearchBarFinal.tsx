"use client";

import { searchBarAction } from "@/action/searchBarAction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [location, setLocation] = useState("Kathmandu");
  const [category, setCategory] = useState("House");
  const [price, setPrice] = useState(10);
  const [bedrooms, setBedrooms] = useState<number | null>(1);
  const [bathrooms, setBathrooms] = useState<number | null>(1);
  const [type, setType] = useState("rent");
  const [landArea, setLandArea] = useState<number | null>(null);
  
  const [landUnit, setLandUnit] = useState("aana");
  const [area, setArea] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  
  const showLandArea = category === "Land" || category === "House";
  const showArea = ["Apartment", "Flat", "Business"].includes(category);
  const hideBedroomsBathrooms = [
    "Land",
    "Hostel Boys",
    "Hostel Girls",
    "House",
    "Business",
  ].includes(category);
  const isHostel = ["Hostel Boys", "Hostel Girls"].includes(category);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    if (showLandArea && !landArea) newErrors.landArea = "Land area is required";
    
    if (showArea && !area) newErrors.area = "Area is required";
    if (!hideBedroomsBathrooms && bedrooms === null)
      newErrors.bedrooms = "Bedrooms are required";
    if (!hideBedroomsBathrooms && bathrooms === null)
      newErrors.bathrooms = "Bathrooms are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = async () => {
    if (!validateFields()) return;
    const finalPrice = price * 1000;
    const finalCategory = category.replace(' ', '_')
    const response = await searchBarAction(
      location,
      finalCategory,
      finalPrice,
      bedrooms,
      bathrooms,
      type,
      landArea,
      
      area
    );
    console.log(response);
    // router.push("/about")
  };

  useEffect(() => {
    if (category === "House") {
      setArea(null);
    } else if (
      category === "Apartment" ||
      category === "Business" ||
      category === "flat"
    ) {
      setLandArea(null);
    } else if (category === "Land") {
      setArea(null);
    } else if (category === "Room") {
      setArea(null);
      setLandArea(null);
    } else if (category === "Hostel Boys" || category === "Hostel Girls") {
      setLandArea(null);
      setArea(null);
    }
  }, [category]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col mb-10 md:flex-wrap md:flex-row items-center gap-4 w-full">
      <div className="w-full md:w-auto">
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

      <div className="w-full md:w-auto">
        <label className="block text-gray-700">Property Type</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          {[
            "House",
            "Apartment",
            "Flat",
            "Hostel Boys",
            "Hostel Girls",
            "Room",
            "Land",
            "Business",
          ].map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col w-full md:w-auto">
        <label className="block text-gray-700">Price</label>
        <input
          type="range"
          min="10"
          max="30000"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          className="w-full accent-green-500"
        />
        <span>{price}k</span>
      </div>

      {showLandArea && (
        <div className="w-full md:w-auto">
          <label className="block text-gray-700">Land Area</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={landArea || ""}
              onChange={(e) => setLandArea(Number(e.target.value) || null)}
              className="border rounded px-3 py-2 w-32"
              placeholder="Area"
            />
            <select
              value={landUnit}
              onChange={(e) => setLandUnit(e.target.value)}
              className="border rounded px-3 py-2"
            >
              {["aana", "ropani", "dhur", "kattha", "bigha"].map((unit) => (
                <option key={unit}>{unit}</option>
              ))}
            </select>
          </div>
          {errors.landArea && (
            <p className="text-red-500 text-sm">{errors.landArea}</p>
          )}
        </div>
      )}

      {showArea && (
        <div className="w-full md:w-auto">
          <label className="block text-gray-700">Area (Sq ft)</label>
          <input
            type="number"
            value={area || ""}
            onChange={(e) => setArea(Number(e.target.value) || null)}
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter area"
          />
          {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
        </div>
      )}

      {!hideBedroomsBathrooms && (
        <div className="w-full md:w-auto">
          <label className="block text-gray-700">Bedrooms</label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className={`px-3 py-2 rounded ${
                  bedrooms === num ? "bg-green-400 text-white" : "bg-gray-200"
                }`}
                onClick={() => setBedrooms(num)}
              >
                {num}
              </button>
            ))}
          </div>
          {errors.bedrooms && (
            <p className="text-red-500 text-sm">{errors.bedrooms}</p>
          )}
        </div>
      )}

      {!hideBedroomsBathrooms && (
        <div className="w-full md:w-auto">
          <label className="block text-gray-700">Bathrooms</label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className={`px-3 py-2 rounded ${
                  bathrooms === num ? "bg-green-400 text-white" : "bg-gray-200"
                }`}
                onClick={() => setBathrooms(num)}
              >
                {num}
              </button>
            ))}
          </div>
          {errors.bathrooms && (
            <p className="text-red-500 text-sm">{errors.bathrooms}</p>
          )}
        </div>
      )}

      {!isHostel && (
        <div className="w-full md:w-auto">
          <label className="block text-gray-700">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option>Rent</option>
            <option>Sell</option>
          </select>
        </div>
      )}

      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 w-full md:w-auto"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
