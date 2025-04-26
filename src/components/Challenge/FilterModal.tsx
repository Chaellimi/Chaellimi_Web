'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import classNames from 'classnames';
import { CheckIcon } from '@public/icons/Challenge';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  filterKey: '정렬' | '기간' | '난이도';
}

const FilterModal = ({
  isOpen,
  onClose,
  title,
  options,
  selectedOption,
  onSelect,
  filterKey,
}: FilterModalProps) => {
  const [period, setPeriod] = useState<[number, number]>([30, 90]);

  useEffect(() => {
    if (isOpen && filterKey === '기간') {
      if (selectedOption && selectedOption.includes('~')) {
        const [start, end] = selectedOption
          .replace(/일/g, '')
          .split('~')
          .map((s) => parseInt(s.trim(), 10));
        setPeriod([start, end]);
      } else {
        setPeriod([30, 90]);
      }
    }
  }, [isOpen, filterKey, selectedOption]);

  const handleApply = () => {
    onSelect(`${period[0]}일~${period[1]}일`);
    onClose();
  };

  // 정렬 렌더링
  const renderSortList = () => (
    <div className="flex flex-col gap-2 mt-2 min-h-52">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => {
            onSelect(option);
            onClose();
          }}
          className={`flex items-center justify-between px-4 py-[0.88rem] text-b1 transition-all ${
            selectedOption === option ? 'text-primary-default' : 'text-gray-600'
          }`}
        >
          <span>{option}</span>
          {selectedOption === option && (
            <span>
              <CheckIcon />
            </span>
          )}
        </button>
      ))}
    </div>
  );

  // 난이도 렌더링
  const renderDifficultyList = () => (
    <div className="flex flex-col gap-2 mt-2 min-h-52">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => {
            onSelect(option);
            onClose();
          }}
          className={classNames(
            'flex items-center justify-between px-1 py-2 text-lg transition-all',
            {
              'text-[#FF7A00] font-semibold': selectedOption === option,
              'text-gray-700': selectedOption !== option,
            }
          )}
        >
          <span className="flex items-center">
            <span
              className={`inline-block w-5 h-5 rounded-full border mr-3 items-center justify-center
                ${selectedOption === option ? 'border-[#FF7A00]' : 'border-gray-300'}
                ${selectedOption === option ? 'bg-[#FF7A00]' : 'bg-white'}
              `}
            >
              {selectedOption === option ? (
                <span className="w-2.5 h-2.5 bg-white rounded-full block" />
              ) : null}
            </span>
            {option}
          </span>
        </button>
      ))}
    </div>
  );

  // 기간 슬라이더 렌더링
  const renderPeriod = () => (
    <div className="flex flex-col items-center w-full gap-6 mt-6 min-h-50">
      <div className="flex gap-4 px-1 mb-6 text-h2 flexw-full text-gray-black">
        <span>{period[0]}일</span>
        <div>~</div>
        <span>{period[1]}일</span>
      </div>
      <RangeSlider
        min={30}
        max={90}
        step={1}
        value={period}
        onInput={(val: number[] | undefined) =>
          setPeriod([val?.[0] ?? 30, val?.[1] ?? 90])
        }
        className="w-full"
        thumbsDisabled={[false, false]}
        rangeSlideDisabled={false}
      />
      <button
        onClick={handleApply}
        className="self-end px-6 py-[0.62rem] mt-8 text-white rounded-lg text-bn2 bg-primary-default"
      >
        적용
      </button>
    </div>
  );

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
            className="w-full max-w-xl px-6 pt-3 pb-6 bg-white rounded-t-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center w-full h-3 mb-4">
              <div className="w-16 h-1 bg-gray-200 rounded-full" />
            </div>
            <div className="px-4 mb-2 text-h3">{title}</div>
            {filterKey === '기간' && renderPeriod()}
            {filterKey === '정렬' && renderSortList()}
            {filterKey === '난이도' && renderDifficultyList()}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FilterModal;
