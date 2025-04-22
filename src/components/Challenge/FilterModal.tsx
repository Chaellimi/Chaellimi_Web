'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const FilterModal = ({
  isOpen,
  onClose,
  title,
  options,
  selectedOption,
  onSelect,
}: BottomSheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100) onClose();
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full px-6 py-2 bg-white h-60 rounded-t-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center w-full h-3 pt-1">
              <div className="w-16 h-1 bg-gray-200 rounded-full" />
            </div>
            <div className="py-[0.53rem] font-semibold text-h3">{title}</div>
            {options.map((option) => (
              <div
                key={option}
                className={`flex items-center justify-between py-[0.87rem] cursor-pointer ${
                  selectedOption === option
                    ? 'text-primary-default'
                    : 'text-gray-600'
                }`}
                onClick={() => onSelect(option)}
              >
                {option}
                {selectedOption === option && (
                  <span className="text-orange-500">✓</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FilterModal;
