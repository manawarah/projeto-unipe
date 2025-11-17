import React from "react";
import "./Input.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div className="input-container">
        {label && <label className="input-label">{label}</label>}
        <input
          ref={ref}
          className="input-field"
          {...rest}
        />
        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
