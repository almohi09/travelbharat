import { useMemo } from 'react';
import PlaceCard from './PlaceCard';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import { MdPlace } from 'react-icons/md';

export default function PlaceGrid({ places, loading = false, error = null }) {
  const skeletons = useMemo(() => Array.from({ length: 6 }), []);

  if (error) {
    return (
      <EmptyState
        icon={<MdPlace size={48} />}
        title="Error Loading Places"
        description="Unable to load places. Please try again later."
      />
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletons.map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden">
            <Skeleton height="h-48" />
            <div className="p-4 space-y-3">
              <Skeleton height="h-4 w-3/4" />
              <Skeleton height="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!places || places.length === 0) {
    return (
      <EmptyState
        icon={<MdPlace size={48} />}
        title="No Places Found"
        description="Try adjusting your filters or search term."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {places.map((place) => (
        <PlaceCard
          key={place.id || place.slug}
          place={place}
        />
      ))}
    </div>
  );
}
