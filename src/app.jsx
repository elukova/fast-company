import React, { useState, useEffect } from "react";
import API from "./api";

import Users from "./components/users";

function App() {
  // const [users, setUsers] = useState([]);
  const [users, setUsers] = useState([]);
  // console.log(users);
  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);
  // const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

  return (
    <div>
      <Users
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
        users={users}
      />
    </div>
  );
}

export default App;
