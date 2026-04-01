import { useState } from 'react';
import { MdChevronLeft, MdChevronRight, MdFullscreen } from 'react-icons/md';
import Button from '../ui/Button';

export default function ImageGallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  const current = images[currentIndex];
  const goNext = () => setCurrentIndex((current + 1) % images.length);
  const goPrev = () => setCurrentIndex((current - 1 + images.length) % images.length);

  return (
    <>
      <div className="relative rounded-lg overflow-hidden bg-gray-900">
        <img
          src={current}
          alt="Gallery image"
          className="w-full h-96 object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-lg transition-all"
              aria-label="Previous image"
            >
              <MdChevronLeft size={24} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-lg transition-all"
              aria-label="Next image"
            >
              <MdChevronRight size={24} />
            </button>
          </>
        )}

        <button
          onClick={() => setFullscreen(true)}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-lg transition-all"
          aria-label="Fullscreen"
        >
          <MdFullscreen size={20} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex ? 'border-primary-700' : 'border-gray-300'
              }`}
            >
              <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setFullscreen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-lg"
            onClick={() => setFullscreen(false)}
            aria-label="Close fullscreen"
          >
            ✕
          </button>
          <img
            src={current}
            alt="Fullscreen"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
