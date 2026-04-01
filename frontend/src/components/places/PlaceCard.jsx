import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { MdStar, MdLocationOn } from 'react-icons/md';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

/**
 * PlaceCard component for displaying individual places
 * @param {Object} props
 * @param {Object} props.place - Place data
 * @param {string} props.place.id - Place ID
 * @param {string} props.place.name - Place name
 * @param {string} props.place.image - Image URL
 * @param {number} props.place.rating - Rating (0-5)
 * @param {number} props.place.reviewCount - Number of reviews
 * @param {string} props.place.category - Category
 * @param {string} props.place.location - Location
 * @param {string} props.place.description - Short description
 * @param {string} props.place.slug - URL slug
 * @returns {React.ReactElement}
 */
export default function PlaceCard({ place, className }) {
  if (!place) return null;

  const rating = place.rating || 0;
  const reviewCount = place.reviewCount || 0;

  return (
    <div
      className={clsx(
        'card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-lg h-48 bg-gradient-to-br from-gray-200 to-gray-300">
        <img
          src={place.image}
          alt={place.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {place.category && (
          <div className="absolute top-3 right-3">
            <Badge variant="accent">{place.category}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 flex-shrink-0">
          {place.name}
        </h3>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <MdStar className="text-amber-400" size={16} />
              <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-500">({reviewCount} reviews)</span>
          </div>
        )}

        {/* Location */}
        {place.location && (
          <div className="flex items-start gap-2 mb-3 text-xs text-gray-600">
            <MdLocationOn size={16} className="flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">{place.location}</span>
          </div>
        )}

        {/* Description */}
        {place.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
            {place.description}
          </p>
        )}

        {/* Action Button */}
        <Link
          to={`/places/${place.slug || place.id}`}
          className="mt-auto"
        >
          <Button
            variant="primary"
            size="sm"
            className="w-full"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
