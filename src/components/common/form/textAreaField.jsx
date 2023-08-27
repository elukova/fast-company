import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  error,
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>&nbsp;
      <div className="input-group has-validation">
        <textarea
          id={name}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
        />

        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};
TextAreaField.defaultProps = { type: "text" };

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextAreaField;
