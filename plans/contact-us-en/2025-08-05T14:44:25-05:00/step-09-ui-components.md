# Step 9: Create UI Components

## Objective
Create reusable UI components for form elements that will be used in the contact form and other forms throughout the site.

## Actions Required

### 9.1 Create Button Component
Create `src/components/ui/Button.tsx`:

```typescript
import React from 'react';
import { ButtonProps } from '@/data/types';
import { cn } from '@/utils/cn';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  className
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-gray-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
```

### 9.2 Create Input Component
Create `src/components/ui/Input.tsx`:

```typescript
import React from 'react';
import { InputProps } from '@/data/types';
import { cn } from '@/utils/cn';

const Input: React.FC<InputProps> = ({
  name,
  type = 'text',
  label,
  placeholder,
  value,
  error,
  required = false,
  disabled = false,
  maxLength,
  onChange,
  onBlur,
  className
}) => {
  const inputId = `input-${name}`;
  const errorId = `error-${name}`;

  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : '',
          'transition-colors'
        )}
      />
      
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
```

### 9.3 Create Textarea Component
Create `src/components/ui/Textarea.tsx`:

```typescript
import React from 'react';
import { TextareaProps } from '@/data/types';
import { cn } from '@/utils/cn';

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  placeholder,
  value,
  error,
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  onChange,
  onBlur,
  className
}) => {
  const textareaId = `textarea-${name}`;
  const errorId = `error-${name}`;
  const countId = `count-${name}`;

  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        value={value}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={cn(
          error ? errorId : undefined,
          maxLength ? countId : undefined
        )}
        className={cn(
          'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          'resize-vertical',
          error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : '',
          'transition-colors'
        )}
      />
      
      <div className="flex justify-between items-center">
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        
        {maxLength && (
          <p id={countId} className="text-sm text-gray-500 ml-auto">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default Textarea;
```

### 9.4 Create Select Component
Create `src/components/ui/Select.tsx`:

```typescript
import React from 'react';
import { SelectProps } from '@/data/types';
import { cn } from '@/utils/cn';

const Select: React.FC<SelectProps> = ({
  name,
  label,
  placeholder,
  value,
  error,
  required = false,
  disabled = false,
  options,
  onChange,
  onBlur,
  className
}) => {
  const selectId = `select-${name}`;
  const errorId = `error-${name}`;

  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        id={selectId}
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : '',
          'transition-colors'
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
```

### 9.5 Create Checkbox Component
Create `src/components/ui/Checkbox.tsx`:

```typescript
import React from 'react';
import { CheckboxProps } from '@/data/types';
import { cn } from '@/utils/cn';

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  checked,
  error,
  required = false,
  disabled = false,
  children,
  onChange,
  onBlur,
  className
}) => {
  const checkboxId = `checkbox-${name}`;
  const errorId = `error-${name}`;

  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={checkboxId}
            name={name}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            required={required}
            onChange={(e) => onChange(e.target.checked)}
            onBlur={onBlur}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'h-4 w-4 text-blue-600 border-gray-300 rounded',
              'focus:ring-2 focus:ring-blue-500',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error ? 'border-red-300 focus:ring-red-500' : ''
            )}
          />
        </div>
        
        <div className="ml-3">
          {(label || children) && (
            <label
              htmlFor={checkboxId}
              className={cn(
                'text-sm text-gray-700',
                disabled ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer'
              )}
            >
              {children || label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
        </div>
      </div>
      
      {error && (
        <p id={errorId} className="text-sm text-red-600 ml-7" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
```

## Component Features

### Button Component
- **Multiple Variants:** Primary, secondary, outline styles
- **Size Options:** Small, medium, large sizes
- **Loading State:** Built-in spinner for async operations
- **Accessibility:** Proper ARIA attributes and focus management

### Input Component
- **Validation Support:** Error states and messages
- **Required Field Indicators:** Visual asterisk for required fields
- **Character Limits:** Built-in maxLength support
- **Accessibility:** Proper labeling and ARIA attributes

### Textarea Component
- **Character Counter:** Shows current/max character count
- **Resizable:** Vertical resize capability
- **Multi-row Support:** Configurable row height
- **Validation:** Error state handling

### Select Component
- **Placeholder Support:** Optional placeholder text
- **Option Descriptions:** Support for option descriptions
- **Validation:** Error state and required field support
- **Accessibility:** Proper ARIA labeling

### Checkbox Component
- **Flexible Content:** Supports both label prop and children
- **Validation:** Error state handling
- **Required Indicators:** Visual required field markers
- **Accessibility:** Proper association with labels

## Styling Strategy

### Consistent Design System
- **Colors:** Gray scale with blue accent colors
- **Border Radius:** Consistent `rounded-md` throughout
- **Focus States:** Blue ring focus indicators
- **Error States:** Red color for validation errors
- **Disabled States:** Reduced opacity and proper cursors

### Responsive Design
- Full width components that adapt to container
- Appropriate touch targets for mobile devices
- Readable font sizes across devices

### Accessibility Features
- Proper ARIA attributes for screen readers
- Keyboard navigation support
- High contrast focus indicators
- Error announcements for screen readers

## Deliverables
- `src/components/ui/Button.tsx` - Reusable button component
- `src/components/ui/Input.tsx` - Text input component
- `src/components/ui/Textarea.tsx` - Textarea component with counter
- `src/components/ui/Select.tsx` - Select dropdown component
- `src/components/ui/Checkbox.tsx` - Checkbox component
- Comprehensive accessibility features
- Consistent styling and validation support

## Next Step
Proceed to Step 14: Create Contact Section Component