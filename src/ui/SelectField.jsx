// SelectField.jsx
import React from 'react';

const SelectField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  options = [],
  className = '',
}) => {
  const baseStyles =
    'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0049ac] focus:outline-none focus:ring-[#0049ac] sm:text-sm';

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`${baseStyles} ${className}`}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
