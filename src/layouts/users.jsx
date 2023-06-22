import React from "react";
import UserPage from "../components/userPage";
import UsersList from "../components/usersList";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>;
  // return <>{userId ? <User userId={userId} /> : <UsersList />}</>;
};

Users.propTypes = {
  match: PropTypes.object,
};

export default Users;
