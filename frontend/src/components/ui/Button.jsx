import clsx from 'clsx';

/**
 * Button component with multiple variants and sizes
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.variant='primary'] - Variant: primary, secondary, ghost, outline, danger
 * @param {string} [props.size='md'] - Size: sm, md, lg
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.loading=false] - Loading state
 * @param {Function} props.onClick - Click handler
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.type='button'] - Button type
 * @returns {React.ReactElement}
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className,
  type = 'button',
  ...props
}) {
  const baseClasses = 'btn font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap';

  const variantClasses = {
    primary: 'btn-primary hover:bg-primary-800 text-white',
    secondary: 'btn-secondary hover:bg-primary-100 text-primary-700',
    ghost: 'btn-ghost hover:bg-primary-50 text-gray-700 border border-gray-300',
    outline: 'btn-outline border-2 border-primary-700 text-primary-700 hover:bg-primary-50',
    danger: 'btn-danger hover:bg-red-200 text-danger-800',
  };

  const sizeClasses = {
    sm: 'btn-sm px-3 py-1 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'btn-lg px-6 py-3 text-lg rounded-xl',
  };

  const disabledClasses = disabled || loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-md hover:-translate-y-0.5';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], disabledClasses, className)}
      {...props}
    >
      {loading && <span className="spinner" />}
      {children}
    </button>
  );
}
