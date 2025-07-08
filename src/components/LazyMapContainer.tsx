
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { ActivityData, ActivityType } from '@/types/forestActivity';
import 'leaflet/dist/leaflet.css';

interface LazyMapProps {
  activities: ActivityData[];
}

const LazyMapContainer = ({ activities }: LazyMapProps) => {
  // Color mapping for different activity types
  const getActivityColor = (type: ActivityType, severity: string) => {
    const colors = {
      'poaching': severity === 'high' ? '#FF0000' : '#FF4444',
      'animal-movement': '#39FF6A',
      'illegal-logging': '#FF8C00',
      'vehicle-intrusion': '#8B5FFF',
      'fire-detection': '#FF0000',
      'conservation-patrol': '#00D4FF'
    };
    return colors[type] || '#FFFFFF';
  };

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {activities.map((activity) => (
          <CircleMarker
            key={activity.id}
            center={[activity.latitude, activity.longitude]}
            radius={activity.severity === 'high' ? 8 : activity.severity === 'medium' ? 6 : 4}
            color={getActivityColor(activity.type, activity.severity)}
            fillColor={getActivityColor(activity.type, activity.severity)}
            fillOpacity={0.7}
            weight={2}
          >
            <Popup>
              <div className="p-2 min-w-48">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {activity.type.replace('-', ' ').toUpperCase()}
                </h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Location:</strong> {activity.location}</p>
                  <p><strong>Severity:</strong> 
                    <span className={`ml-1 px-2 py-1 rounded text-xs ${
                      activity.severity === 'high' ? 'bg-red-100 text-red-800' :
                      activity.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {activity.severity}
                    </span>
                  </p>
                  <p><strong>Time:</strong> {new Date(activity.timestamp).toLocaleString()}</p>
                  {activity.description && (
                    <p><strong>Details:</strong> {activity.description}</p>
                  )}
                  {activity.confidence && (
                    <p><strong>Confidence:</strong> {(activity.confidence * 100).toFixed(1)}%</p>
                  )}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LazyMapContainer;
