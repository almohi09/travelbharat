/**
 * LoadingOverlay component for full-page loading indicator
 * @param {Object} props
 * @param {boolean} [props.isVisible=false] - Show/hide the overlay
 * @param {string} [props.message='Loading...'] - Loading message
 * @returns {React.ReactElement}
 */
export default function LoadingOverlay({
  isVisible = false,
  message = 'Loading...',
}) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-2xl text-center">
        <div className="inline-block mb-4">
          <div className="spinner" style={{ width: '32px', height: '32px' }} />
        </div>
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
}
