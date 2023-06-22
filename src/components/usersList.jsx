/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import UserTable from "./usersTable";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import API from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import SearchString from "./searchString";

// eslint-disable-next-line react/prop-types
const UsersList = () => {
  const pageSize = 8;

  const [users, setUsers] = useState();
  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    setUsers(newArray);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [searchName, setSearchName] = useState("");
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };
  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchName]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setSearchName("");
  };

  const handleUserSearch = (searchText) => {
    setSearchName(searchText);
    setSelectedProf();
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : searchName
      ? users.filter((user) =>
          user.name.toLowerCase().includes(searchName.toLowerCase())
        )
      : users;
    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };
    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-2">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <SearchString
            searchName={searchName}
            onUserSearch={handleUserSearch}
          />
          {users.length > 0 && (
            <UserTable
              users={userCrop}
              selectedSort={sortBy}
              onSort={handleSort}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};

UsersList.propTypes = {
  filteredUsers: PropTypes.array,
};

export default UsersList;
