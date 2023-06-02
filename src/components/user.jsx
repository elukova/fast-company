import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../api";

const User = ({ userId }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, []);
  return <h1>{user ? user.name : "Loading..."}</h1>;
};

User.propTypes = {
  userId: PropTypes.string,
};

export default User;
