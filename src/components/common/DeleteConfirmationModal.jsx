import React from "react";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = "item",
  title = "Confirm Action", // New prop for modal title
  message = `Are you sure you want to perform this action on this ${itemName}?`, // New prop for message
  confirmButtonText = "Confirm", // New prop for confirm button text
  confirmButtonClassName = "bg-red-500 hover:bg-red-600", // New prop for confirm button class
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
      {" "}
      {/* Consistent background */}
      <div className="p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title} {/* Use title prop */}
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              {message} {/* Use message prop */}
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={onConfirm}
              className={`px-4 py-2 mr-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 sm:w-auto ${confirmButtonClassName}`} // Use confirmButtonClassName
            >
              {confirmButtonText} {/* Use confirmButtonText prop */}
            </button>
            <button
              onClick={onClose}
              className="mt-3 px-4 py-2 bg-white text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
