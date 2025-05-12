import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowIcon } from '@public/icons/shared';

interface DropdownSelectorProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  placeholder?: string; // Optional placeholder text
}

const DropdownSelector = ({
  options,
  selectedOption,
  onSelect,
  placeholder = '선택해주세요',
}: DropdownSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 text-b2 bg-gray-white rounded-xl"
        onClick={toggleDropdown}
      >
        {(selectedOption && (
          <div className="text-bn2 text-gray-black">{selectedOption}</div>
        )) ||
          (placeholder && (
            <div className="text-gray-300 text-bn2">{placeholder}</div>
          ))}

        <ArrowIcon location="down" fill="#C9C9C9" width="18" height="18" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 z-20 w-full mt-2 border border-gray-200 shadow-lg bg-gray-white rounded-xl"
          >
            {options.map((option) => (
              <div key={option} className="p-3">
                <li
                  className="p-3 cursor-pointer hover:bg-gray-50 rounded-xl text-bn2"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              </div>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownSelector;
