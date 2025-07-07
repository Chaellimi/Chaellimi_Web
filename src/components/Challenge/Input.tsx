import React from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'textarea';
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Input = ({
  type = 'text',
  value = '',
  onChange,
  placeholder = '입력해주세요',
}: InputProps) => {
  const baseClasses =
    'w-full px-4 py-3 border border-gray-300 rounded-xl text-bn2 focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-200';

  return type === 'textarea' ? (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${baseClasses} h-36`}
    />
  ) : (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={baseClasses}
    />
  );
};

export default Input;
