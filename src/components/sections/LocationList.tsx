import { useLocationData } from '@/hooks/useLocationData';
import type { LocationInfo } from '@/data/types';

function LocationCard({ location }: { location: LocationInfo }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{location.name}</h2>
      
      <p className="text-gray-700 mb-4">{location.description}</p>
      
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2">Address</h3>
        <p className="text-gray-700">{location.address}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2">Directions</h3>
        <ul className="list-disc list-inside text-gray-700">
          {location.directions.map((direction, index) => (
            <li key={index}>{direction}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2">Amenities</h3>
        <ul className="list-disc list-inside text-gray-700">
          {location.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </div>
      
      {location.hours && (
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Hours</h3>
          <p className="text-gray-700">{location.hours}</p>
        </div>
      )}
      
      {location.restrictions && (
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Restrictions</h3>
          <ul className="list-disc list-inside text-red-600">
            {location.restrictions.map((restriction, index) => (
              <li key={index}>{restriction}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function LocationList() {
  const { locationData } = useLocationData();

  if (!locationData) return null;

  return (
    <div>
      {locationData.locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
}