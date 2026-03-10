import { X, AlertTriangle } from "lucide-react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", type = "warning" }) => {
  if (!isOpen) return null;

  const colors = {
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: "text-yellow-600",
      button: "bg-yellow-600 hover:bg-yellow-700",
    },
    danger: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "text-red-600",
      button: "bg-red-600 hover:bg-red-700",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
    },
  };

  const selectedColor = colors[type] || colors.warning;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal - Centered */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full transform transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 ${selectedColor.bg} rounded-full flex items-center justify-center`}>
                <AlertTriangle size={24} className={selectedColor.icon} />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600">
                  {message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`px-4 py-2 ${selectedColor.button} text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;