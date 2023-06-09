import React from "react";
import User from "./user";
import UsersList from "./usersList";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  return <>{userId ? <User userId={userId} /> : <UsersList />}</>;
};

Users.propTypes = {
  match: PropTypes.object,
};

export default Users;
