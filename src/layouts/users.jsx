import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  return (
    <>
      <UserProvider>
        {userId ? <UserPage userId={userId} edit={edit} /> : <UsersListPage />}
      </UserProvider>
    </>
  );
};

Users.propTypes = {
  match: PropTypes.object,
};

export default Users;
