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
  return type === 'textarea' ? (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 h-36 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 text-bn2"
    />
  ) : (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 text-bn2"
    />
  );
};

export default Input;
