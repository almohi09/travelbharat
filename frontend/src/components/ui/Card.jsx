import clsx from 'clsx';

export default function Card({ children, className, interactive = true, ...props }) {
  return (
    <div
      className={clsx(
        'card bg-white border border-gray-300 rounded-lg p-4 shadow-sm transition-all duration-200',
        interactive && 'hover:shadow-md hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
