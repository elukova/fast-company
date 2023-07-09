import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import QualitiesList from "../../ui/qualities/qualitiesList";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import EditUserPage from "../editUserPage/editUserPage";

const UserPage = ({ userId, edit }) => {
  const [user, setUser] = useState();

  // const history = useHistory();

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, [user]);

  // const handleClick = () => {
  //   history.push("/users");
  // };

  return user ? (
    edit ? (
      <EditUserPage user={user} />
    ) : (
      <>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>

        <Link to={`/users/${user._id}/edit`}>
          <button className="btn btn-primary mx-auto">Edit</button>
        </Link>
      </>
    )
  ) : (
    <h1>Loading...</h1>
  );

  //   if (user) {
  //     return (
  //       <>
  //         <h1>{user.name}</h1>
  //         <h2>Профессия: {user.profession.name}</h2>
  //         <QualitiesList qualities={user.qualities} />
  //         <p>completedMeetings: {user.completedMeetings}</p>
  //         <h2>Rate: {user.rate}</h2>
  //         <button>
  //           <Link to={`/users/${user._id}/edit`}>Edit</Link>
  //         </button>
  //       </>
  //     );
  //   } else {
  //     return <h1>Loading...</h1>;
  //   }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
  edit: PropTypes.string,
};

export default UserPage;
