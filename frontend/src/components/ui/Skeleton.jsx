import clsx from 'clsx';
import React from 'react';

/**
 * Skeleton component for loading placeholders with animated shimmer
 */
const Skeleton = React.memo(function Skeleton({ 
  count = 1, 
  height = 'h-4', 
  width = 'w-full',
  className = '',
  variant = 'text',
  circle = false,
  ...props 
}) {
  const variants = {
    text: 'rounded-md',
    card: 'rounded-lg',
    avatar: 'rounded-full',
    button: 'rounded-md'
  };

  const skeletonClass = clsx(
    'bg-gray-200 animate-pulse',
    'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100',
    'motion-safe:animate-pulse',
    height,
    width,
    circle ? 'rounded-full' : variants[variant] || variants.text,
    className
  );

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={skeletonClass}
          {...props}
        />
      ))}
    </>
  );
});

Skeleton.displayName = 'Skeleton';
export default Skeleton;
