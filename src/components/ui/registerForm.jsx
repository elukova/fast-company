/* eslint-disable indent */
import React, { useState, useEffect } from "react";

import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/chechBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false,
  });
  const { signUp } = useAuth();
  const professions = useSelector(getProfessions());
  const qualities = useSelector(getQualities());
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id,
    color: q.color,
  }));
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }));

  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Email is required" },
      isEmail: { message: "Email is incorrect" },
    },
    name: {
      isRequired: { message: "Name is required" },
      min: {
        message: "Name must consist of at least 3 characters",
        value: 3,
      },
    },
    password: {
      isRequired: { message: "Password is required" },
      isCapitalSymbol: {
        message: "Password must contain at least one capital letter",
      },
      isContainDigit: {
        message: "Password must contain at least one digit",
      },
      min: {
        message: "Password must consist of at least 8 characters",
        value: 8,
      },
    },
    profession: {
      isRequired: { message: "Profession is required" },
    },
    license: {
      isRequired: {
        message: "You must agree before submitting.",
      },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
    try {
      await signUp(newData);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
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
        label="Name"
        name="name"
        placeholder="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
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
      <SelectField
        onChange={handleChange}
        options={professionsList}
        defaultOption="Choose..."
        error={errors.profession}
        value={data.profession}
        name="profession"
        label="Profession"
        disabled="disabled"
      />

      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Sex"
      />

      <MultiSelectField
        options={qualitiesList}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Choose your qualities"
      />

      <CheckBoxField
        value={data.license}
        onChange={handleChange}
        name="license"
        error={errors.license}>
        Confirm <a href="#">license agreement</a>
      </CheckBoxField>

      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
