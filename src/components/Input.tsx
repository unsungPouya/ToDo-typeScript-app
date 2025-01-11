import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  type?: string;
  isTextarea?: boolean;
}

// Use forwardRef and change the component definition
const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ 
    label, 
    type = 'text', 
    isTextarea = false, 
    className,
    ...rest 
  }, ref) => {
    return (
      <div className="flex flex-col">
        <label>{label}</label>
        {isTextarea ? (
          <textarea 
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`border p-2 rounded-md${className || ''}`}
            {...rest}
          />
        ) : (
          <input 
            type={type}
            ref={ref as React.Ref<HTMLInputElement>}
            className={`border p-2 rounded-md${className || ''}`}
            {...rest}
          />
        )}
      </div>
    );
  }
);

// Important: Add display name for better debugging
Input.displayName = 'Input';

export default Input;