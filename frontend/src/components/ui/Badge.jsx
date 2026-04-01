import clsx from 'clsx';

export default function Badge({ children, variant = 'primary', className, ...props }) {
  const variants = {
    primary: 'badge bg-primary-100 text-primary-800',
    accent: 'badge-accent bg-amber-100 text-amber-900',
    danger: 'badge-danger bg-red-100 text-red-800',
    gray: 'badge bg-gray-200 text-gray-800',
  };

  return (
    <span
      className={clsx(variants[variant], 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold', className)}
      {...props}
    >
      {children}
    </span>
  );
}
