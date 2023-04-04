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
  const handleToggleBookMark = (id) => {};

  if (users.length) {
    return (
      <>
        <h2>
          <SearchStatus length={users.length} onDelete={handleDelete} />
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
