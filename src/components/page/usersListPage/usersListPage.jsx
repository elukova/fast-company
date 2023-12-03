/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
  getProfessions,
  getProfessionsLoadingStatus,
} from "../../../store/professions";
// import SearchString from "../../common/form/searchString";

// eslint-disable-next-line react/prop-types
const UsersListPage = () => {
  const pageSize = 8;

  const { users } = useUser();
  const { currentUser } = useAuth();

  const handleDelete = (userId) => {
    // setUsers(users.filter((user) => user._id !== userId));
    console.log("delete user", userId);
  };

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    // setUsers(newArray);
    console.log(newArray);
  };

  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    if (searchQuery !== "") setSearchQuery("");
  };

  const handleSearchQuery = ({ target }) => {
    setSearchQuery(target.value);
    setSelectedProf(undefined);
  };

  if (users) {
    function filterUsers(data) {
      const filteredUsers = searchQuery
        ? data.filter(
            (user) =>
              user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
          )
        : selectedProf
        ? data.filter(
            (user) =>
              JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          )
        : data;
      return filteredUsers.filter((u) => u._id !== currentUser._id);
    }

    const filteredUsers = filterUsers(users);

    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };
    return (
      <div className="d-flex">
        {professions && !professionsLoading && (
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
          <input
            type="text"
            name="searchQuery"
            className="form-control"
            placeholder="Search..."
            aria-label="Search..."
            onChange={handleSearchQuery}
            value={searchQuery}
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

UsersListPage.propTypes = {
  filteredUsers: PropTypes.array,
};

export default UsersListPage;
