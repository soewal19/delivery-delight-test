import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation, MapPin, ArrowRight } from 'lucide-react';

// Fix for default leaflet icons in React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ShopMapProps {
  shopLat: number;
  shopLng: number;
  shopName: string;
}

const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

const ShopMap: React.FC<ShopMapProps> = ({ shopLat, shopLng, shopName }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const shopPos: [number, number] = [shopLat, shopLng];

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  return (
    <Card className="overflow-hidden shadow-lg border-none bg-card/50 backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Shop Location
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] w-full relative">
          <MapContainer center={shopPos} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={shopPos}>
              <Popup>{shopName}</Popup>
            </Marker>
            
            {userLocation && (
              <>
                <Marker position={userLocation}>
                  <Popup>Your Location</Popup>
                </Marker>
                <Polyline 
                  positions={[userLocation, shopPos]} 
                  color="hsl(var(--primary))" 
                  dashArray="10, 10"
                  weight={3}
                />
                {/* Arrow markers along the line */}
                <Marker 
                  position={[
                    (userLocation[0] + shopPos[0]) / 2,
                    (userLocation[1] + shopPos[1]) / 2
                  ]}
                  icon={L.divIcon({
                    className: 'arrow-marker',
                    html: `<div style="transform: rotate(${calculateAngle(userLocation, shopPos)}deg); color: hsl(var(--primary));">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                          </div>`,
                    iconSize: [24, 24],
                    iconAnchor: [12, 12],
                  })}
                />
              </>
            )}
            <MapUpdater center={shopPos} />
          </MapContainer>
          
          {!userLocation && (
            <div className="absolute bottom-4 right-4 z-[1000] bg-background/80 backdrop-blur p-2 rounded-md text-xs border shadow-sm">
              Enable location to see directions
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper to calculate bearing between two points
function calculateAngle(start: [number, number], end: [number, number]) {
  const dy = end[0] - start[0];
  const dx = Math.cos(Math.PI / 180 * start[0]) * (end[1] - start[1]);
  const angle = Math.atan2(dy, dx);
  return angle * 180 / Math.PI;
}

export default ShopMap;
