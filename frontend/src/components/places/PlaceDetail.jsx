import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdShare, MdFavoriteBorder, MdFavorite, MdArrowBack } from 'react-icons/md';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ImageGallery from './ImageGallery';
import NearbyAttractions from './NearbyAttractions';
import Skeleton from '../ui/Skeleton';

export default function PlaceDetail() {
  const { placeSlug } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    // TODO: Fetch place data from API using placeSlug
    setLoading(false);
  }, [placeSlug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: place?.name,
        text: place?.description,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Skeleton height="h-96 mb-8" />
        <div className="space-y-4">
          <Skeleton height="h-8 w-2/3" />
          <Skeleton height="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Place Not Found</h2>
        <Button onClick={() => navigate('/places')}>Back to Places</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
        >
          <MdArrowBack /> Back
        </Button>
      </div>

      {/* Image Gallery */}
      <ImageGallery images={place.images || [place.image]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title & Actions */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{place.name}</h1>
              {place.location && (
                <p className="text-gray-600">{place.location}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
              >
                <MdShare />
              </Button>
            </div>
          </div>

          {/* Rating */}
          {place.rating && (
            <Card>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl font-bold text-primary-700">{place.rating.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">{place.reviewCount} reviews</div>
                </div>
              </div>
            </Card>
          )}

          {/* Description */}
          <Card>
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">
              {place.description}
            </p>
          </Card>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {place.bestTime && (
              <Card>
                <h3 className="font-bold mb-2">Best Time to Visit</h3>
                <p className="text-gray-600">{place.bestTime}</p>
              </Card>
            )}
            {place.entryFee && (
              <Card>
                <h3 className="font-bold mb-2">Entry Fee</h3>
                <p className="text-gray-600">{place.entryFee}</p>
              </Card>
            )}
            {place.timingOpen && (
              <Card>
                <h3 className="font-bold mb-2">Opening Hours</h3>
                <p className="text-gray-600">{place.timingOpen}</p>
              </Card>
            )}
            {place.duration && (
              <Card>
                <h3 className="font-bold mb-2">Duration</h3>
                <p className="text-gray-600">{place.duration}</p>
              </Card>
            )}
          </div>

          {/* Nearby Attractions */}
          {place.nearbyAttractions && place.nearbyAttractions.length > 0 && (
            <Card>
              <h2 className="text-xl font-bold mb-6">Nearby Attractions</h2>
              <NearbyAttractions attractions={place.nearbyAttractions} />
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info Card */}
          <Card>
            <h3 className="font-bold mb-4">Quick Info</h3>
            <div className="space-y-3 text-sm">
              {place.category && (
                <div>
                  <span className="text-gray-600">Category:</span>
                  <p className="font-semibold">{place.category}</p>
                </div>
              )}
              {place.state && (
                <div>
                  <span className="text-gray-600">State:</span>
                  <p className="font-semibold">{place.state}</p>
                </div>
              )}
              {place.city && (
                <div>
                  <span className="text-gray-600">City:</span>
                  <p className="font-semibold">{place.city}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Contact Card */}
          {place.phone || place.email ? (
            <Card>
              <h3 className="font-bold mb-4">Contact</h3>
              {place.phone && <p className="text-sm">{place.phone}</p>}
              {place.email && <p className="text-sm">{place.email}</p>}
            </Card>
          ) : null}

          {/* CTA Button */}
          <Button
            variant="primary"
            className="w-full"
            size="lg"
          >
            Book a Visit
          </Button>
        </div>
      </div>
    </div>
  );
}
