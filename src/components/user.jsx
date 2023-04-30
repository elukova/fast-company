import React from "react";
import Quality from "./quality";
import BookMark from "./bookMark";
import PropTypes from "prop-types";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToggleBookMark,
}) => {
  return (
    <tr>
      <th scope="row">{name}</th>
      <td>
        {qualities.map((qualitie) => (
          <Quality key={qualitie._id} {...qualitie} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <BookMark status={bookmark} onClick={() => onToggleBookMark(_id)} />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array,
  profession: PropTypes.string,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number,
  onDelete: PropTypes.func,
  bookmark: PropTypes.bool.isRequired,
  onToggleBookMark: PropTypes.func,
};

export default User;
