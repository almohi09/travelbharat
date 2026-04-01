import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import clsx from 'clsx';

/**
 * Modal component with backdrop blur and animation
 */
const Modal = React.memo(function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  footer,
  className = '',
  overlayClassName = '',
  closeOnOverlay = true,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={clsx(
              'fixed inset-0 bg-black/40 backdrop-blur-sm z-40',
              overlayClassName
            )}
            onClick={closeOnOverlay ? onClose : undefined}
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={clsx(
                'bg-white rounded-lg shadow-2xl pointer-events-auto',
                sizes[size] || sizes.md,
                'w-full max-h-[90vh] overflow-y-auto',
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 sticky top-0 bg-white">
                  {title && (
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                  )}
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="ml-auto text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-md"
                      aria-label="Close modal"
                    >
                      <FiX size={20} />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="px-6 py-4">
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end bg-gray-50">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
});

Modal.displayName = 'Modal';
export default Modal;
