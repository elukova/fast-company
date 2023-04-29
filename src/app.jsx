import React, { useState } from "react";
import api from "./api";
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";

function App() {
  // const [users, setUsers] = useState([]);
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };
  const handleToggleBookMark = (id) => {
    const markedUser = users.find((user) => user._id === id);
    const markedUserIndex = users.indexOf(markedUser);
    markedUser.bookmark = !markedUser.bookmark;
    setUsers((prevState) =>
      prevState.map((user, index) => {
        if (index === markedUserIndex) {
          user = markedUser;
          return user;
        } else {
          return user;
        }
      })
    );
  };

  if (users.length) {
    return (
      <>
        <h2>
          <SearchStatus length={users.length} />
        </h2>
        <Users
          users={users}
          onToggleBookMark={handleToggleBookMark}
          onDelete={handleDelete}
        />
      </>
    );
  } else {
    return (
      <>
        <h2>
          <SearchStatus length={users.length} />
        </h2>
      </>
    );
  }
}

export default App;
