import React from "react";
import PropTypes from "prop-types";

const SearchString = ({ onUserSearch }) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      aria-label="Search..."
      onChange={(e) => {
        onUserSearch(e.target.value);
        console.log(e.target.value);
      }}
    />
  );
};

SearchString.propTypes = {
  onUserSearch: PropTypes.func.isRequired,
};

export default SearchString;
