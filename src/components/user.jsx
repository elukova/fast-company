import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookMark";
const User = (props) => {
  const {
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
  } = props;
  return (
    <tr>
      <th scope="row">{name}</th>
      <td>
        {qualities.map((qualitie) => (
          <Qualitie key={qualitie._id} {...qualitie} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        <BookMark
          status={bookmark}
          id={_id}
          onToggleBookMark={props.onToggleBookMark}
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => props.onDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
