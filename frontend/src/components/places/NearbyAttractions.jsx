import { MdLocationOn, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';

export default function NearbyAttractions({ attractions = [] }) {
  if (!attractions || attractions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No nearby attractions found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {attractions.map((attraction, idx) => (
        <Link
          key={idx}
          to={`/places/${attraction.slug}`}
          className="block p-4 border border-gray-200 rounded-lg hover:border-primary-700 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">{attraction.name}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <MdLocationOn size={16} />
                <span>{attraction.distance || 'Distance unknown'} km away</span>
              </div>
              {attraction.category && (
                <Badge variant="accent">{attraction.category}</Badge>
              )}
            </div>
            <MdChevronRight className="text-gray-400 flex-shrink-0 mt-1" />
          </div>
        </Link>
      ))}
    </div>
  );
}
