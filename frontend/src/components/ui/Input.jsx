import clsx from 'clsx';

export default function Input({
  label,
  error,
  required,
  icon,
  disabled,
  className,
  ...props
}) {
  return (
    <div className="form-group">
      {label && (
        <label className="text-sm font-semibold text-gray-900">
          {label}
          {required && <span className="required text-red-600"> *</span>}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3 top-2.5 text-gray-400">{icon}</div>}
        <input
          disabled={disabled}
          className={clsx(
            'input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/10 transition-all',
            icon && 'pl-10',
            error && 'border-red-500 focus:ring-red-500/10 focus:border-red-500',
            disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
            className
          )}
          {...props}
        />
      </div>
      {error && <span className="form-error text-xs mt-1 text-red-600">{error}</span>}
    </div>
  );
}
