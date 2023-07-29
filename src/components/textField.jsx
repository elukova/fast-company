import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>&nbsp;
      <div className="input-group has-validation">
        <input
          type={showPassword ? "text" : type}
          id={name}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={getInputClasses()}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}>
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};
TextField.defaultProps = { type: "text" };

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextField;
