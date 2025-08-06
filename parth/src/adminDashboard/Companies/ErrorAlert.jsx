import { FiAlertCircle, FiX } from 'react-icons/fi';

export default function ErrorAlert({ error, onDismiss }) {
  if (!error) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-lg">
      <div className="flex items-center">
        <FiAlertCircle className="text-red-500 mr-3 flex-shrink-0" size={20} />
        <div className="flex-1 text-red-700">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="text-red-500 hover:text-red-700 ml-3 p-1 rounded-full hover:bg-red-100"
            aria-label="Dismiss error"
          >
            <FiX size={18} />
          </button>
        )}
      </div>
    </div>
  );
}