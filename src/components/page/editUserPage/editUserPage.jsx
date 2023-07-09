/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import TextField from "../../common/form/textField";
import API from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import { validator } from "../../../utils/validator";
import MultiSelectField from "../../common/form/multiSelectField";

const EditUserPage = ({ user }) => {
  const [data, setData] = useState({
    _id: user._id,
    name: user.name,
    email: user.email,
    password: "",
    profession: user.profession,
    sex: user.sex,
    qualities: user.qualities,
    license: false,
  });
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState({});

  const history = useHistory();

  useEffect(() => {
    API.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id,
      }));
      setProfessions(professionsList);
    });
    API.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((qulityName) => ({
        label: data[qulityName].name,
        value: data[qulityName]._id,
        color: data[qulityName].color,
      }));
      setQualities(qualitiesList);
    });
  }, []);

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) return;

    data.profession =
      typeof data.profession === "object"
        ? data.profession
        : getProfessionById(data.profession);

    data.qualities = data.qualities.map((quality) =>
      quality.label
        ? {
            name: quality.label,
            _id: quality.value,
            color: quality.color,
          }
        : quality
    );

    API.users.update(data._id, data).then((data) => {
      history.push(`/users/${data._id}`);
    });
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    name: {
      isRequired: { message: "Name is required" },
      isName: { message: "Name is incorrect" },
    },
    email: {
      isRequired: { message: "Email is required" },
      isEmail: { message: "Email is incorrect" },
    },
    profession: {
      isRequired: { message: "Profession is required" },
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

  const defaultQualitiesArray = user.qualities.map((quality) => ({
    label: quality.name,
    value: quality._id,
    color: quality.color,
  }));

  if (user) {
    // const filteredProfessions = professions.filter(
    //   (profession) => profession.value !== user.profession._id
    // );
    return (
      <>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Имя"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <TextField
                  label="Электронная почта"
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <SelectField
                  label="Профессия"
                  value={data.profession.name}
                  defaultOption={data.profession.name}
                  onChange={handleChange}
                  options={professions}
                  name="profession"
                  disabled=""
                  error={errors.profession}
                />
                <RadioField
                  options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                  ]}
                  value={data.sex}
                  name="sex"
                  onChange={handleChange}
                  label="Пол"
                />
                <MultiSelectField
                  options={qualities}
                  onChange={handleChange}
                  defaultValue={defaultQualitiesArray}
                  name="qualities"
                  label="Choose your qualities"
                />
                <button
                  type="submit"
                  disabled={!isValid}
                  className="btn btn-primary w-100 mx-auto">
                  Обновить
                </button>
              </form>
            </div>
          </div>
        </div>
        <h1>EditUserPage</h1>
        <h2>{user._id}</h2>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

EditUserPage.propTypes = {
  user: PropTypes.object.isRequired,
};

export default EditUserPage;
