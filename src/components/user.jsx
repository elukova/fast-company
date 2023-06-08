import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../api";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const User = ({ userId }) => {
  const [user, setUser] = useState();
  const history = useHistory();
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, []);
  const handleBackToUsers = () => {
    history.push("/users");
  };
  // eslint-disable-next-line
  return user ? (
    <>
      <h1>{user.name}</h1>
      <h2>Профессия: {user.profession.name}</h2>
      <QualitiesList qualities={user.qualities} />
      <p>completedMeetings: {user.completedMeetings}</p>
      <h2>Rate: {user.rate}</h2>
      <button
        onClick={() => {
          handleBackToUsers();
        }}
      >
        All Users
      </button>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

User.propTypes = {
  userId: PropTypes.string,
};

export default User;
