"use client";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 27.7172, // Default center (Kathmandu)
  lng: 85.3240,
};

interface MapProps {
  lat: number | null;
  lng: number | null;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
}

const GoogleMapComponent = ({ lat, lng, setLat, setLng }: MapProps) => {
  const mapCenter = lat && lng ? { lat, lng } : defaultCenter;

  // Handle map click event to update coordinates
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();
      setLat(newLat);
      setLng(newLng);
    }
  };

  // Handle marker drag event to update coordinates
  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();
      setLat(newLat);
      setLng(newLng);
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={14}
        onClick={handleMapClick}
      >
        {/* Render marker and make it draggable */}
        {lat && lng && (
          <Marker
            position={{ lat, lng }}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
