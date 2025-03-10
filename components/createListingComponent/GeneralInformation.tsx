import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 27.7172, // Default to Kathmandu
  lng: 85.3240,
};

export default function GeneralInformation({ formData, handleChange, setFormData }: any) {
  const [marker, setMarker] = useState<{ lat: number; lng: number }>({
    lat: formData.latitude || center.lat,
    lng: formData.longitude || center.lng,
  });

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarker(newLocation);
      handleChange({ target: { name: "latitude", value: newLocation.lat } });
      handleChange({ target: { name: "longitude", value: newLocation.lng } });
    }
  };

  const handleMarkerDragEnd = async(event: google.maps.MapMouseEvent) => {
    console.log(marker)
    if (event.latLng) {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarker(newLocation);
      // handleChange({ target: { name: "latitude", value: newLocation.lat } });
      // handleChange({ target: { name: "longitude", value: newLocation.lng } });
      setFormData((prevState : any) => ({
        ...prevState,
        latitude: newLocation.lat,
        longitude: newLocation.lng,
      }));
      console.log(formData)
    }
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 text-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 text-lg focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 text-lg focus:ring-2 focus:ring-blue-500"
          max="999999999"
          required
        />
      </div>

      {/* Location Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 text-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Google Map Integration for Selecting Location */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Select Location on Map</label>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={marker}
            onClick={handleMapClick}
          >
            <Marker 
              position={marker} 
              draggable={true} 
              onDragEnd={handleMarkerDragEnd}
            />
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}
