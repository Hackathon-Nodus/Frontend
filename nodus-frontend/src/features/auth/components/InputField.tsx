import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  rightElement?: React.ReactNode;
  required?: boolean;  // ← Add this line
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  rightElement,
  required,  // ← Add this line
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-gray-700 text-sm font-medium">{label}</label>
        {rightElement}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
        placeholder={placeholder}
        required={required}  // ← Add this line
      />
    </div>
  );
};

export default InputField;