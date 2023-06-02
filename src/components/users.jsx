import React from "react";
import User from "./user";
import UsersList from "./usersList";
import PropTypes from "prop-types";

const Users = ({ match }) => {
  const userId = match.params.userId;
  return <>{userId ? <User userId={userId} /> : <UsersList />}</>;
};

Users.propTypes = {
  match: PropTypes.object,
};

export default Users;
