import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// Dummy properties around Nagpur
const dummyProperties = [
  {
    id: 1,
    planName: "Sunshine Residency",
    city: "Nagpur",
    state: "Maharashtra",
    price: "₹45,00,000",
    coordinates: { lat: 21.1458, lng: 79.0882 },
  },
  {
    id: 2,
    planName: "Lakeview Villas",
    city: "Nagpur",
    state: "Maharashtra",
    price: "₹75,00,000",
    coordinates: { lat: 21.16, lng: 79.089 },
  },
  {
    id: 3,
    planName: "Green Meadows",
    city: "Nagpur",
    state: "Maharashtra",
    price: "₹52,00,000",
    coordinates: { lat: 21.13, lng: 79.1 },
  },
  {
    id: 4,
    planName: "Hilltop Heights",
    city: "Nagpur",
    state: "Maharashtra",
    price: "₹68,00,000",
    coordinates: { lat: 21.1255, lng: 79.07 },
  },
];

const MapView = () => {
  const center = [21.1458, 79.0882]; // Nagpur center

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100 p-8">
      <h2 className="text-3xl font-bold text-center text-amber-700 mb-6 drop-shadow">
        🗺️ Explore Our Properties in Nagpur
      </h2>

      <div className="rounded-3xl shadow-xl overflow-hidden border border-yellow-300 max-w-6xl mx-auto">
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: "600px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {dummyProperties.map((home) => (
            <Marker
              key={home.id}
              position={[home.coordinates.lat, home.coordinates.lng]}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{home.planName}</strong>
                  <br />
                  {home.city}, {home.state}
                  <br />
                  <span className="text-indigo-600 font-semibold">
                    {home.price}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
