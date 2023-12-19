import React from "react";
import PropTypes from "prop-types";
import EditUserPage from "../editUserPage/editUserPage";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { CommentsProvider } from "../../../hooks/useComments";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId, edit }) => {
  const user = useSelector(getUserById(userId));
  return user ? (
    edit ? (
      <EditUserPage user={user} />
    ) : (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard data={user.qualities} />
            <MeetingsCard value={user.completedMeetings} />

            {/* <Link to={`/users/${user._id}/edit`}>
              <button className="btn btn-primary mx-auto">Edit</button>
            </Link> */}
          </div>
          <div className="col-md-8">
            <CommentsProvider>
              <Comments />
            </CommentsProvider>
          </div>
        </div>
      </div>
    )
  ) : (
    <h1>Loading...</h1>
  );
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
  edit: PropTypes.string,
};

export default UserPage;
