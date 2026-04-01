import { MdInfoOutline } from 'react-icons/md';

/**
 * EmptyState component for displaying empty content
 * @param {Object} props
 * @param {React.ReactNode} [props.icon] - Icon to display
 * @param {string} props.title - Empty state title
 * @param {string} [props.description] - Empty state description
 * @param {React.ReactNode} [props.action] - Action button or element
 * @returns {React.ReactElement}
 */
export default function EmptyState({
  icon = <MdInfoOutline size={48} />,
  title,
  description,
  action,
}) {
  return (
    <div className="flex items-center justify-center min-h-[300px] py-12 px-6">
      <div className="text-center">
        <div className="inline-flex justify-center mb-4 text-gray-400">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        {description && (
          <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
            {description}
          </p>
        )}
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  );
}
