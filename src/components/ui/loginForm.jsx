import React, { useState, useEffect } from "react";

import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/chechBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/users";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });

  const history = useHistory();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    setEnterError(null);
  };
  const validatorConfig = {
    email: {
      isRequired: { message: "Email is required" },
    },
    password: {
      isRequired: { message: "Password is required" },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/";
    dispatch(logIn({ payload: data, redirect }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        placeholder="123@mail.ru"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        placeholder="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Stay On System
      </CheckBoxField>
      {enterError && <p className="text-danger">{enterError}</p>}
      <button
        type="submit"
        disabled={!isValid || enterError}
        className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
