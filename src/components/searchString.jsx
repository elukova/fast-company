import React from "react";
import PropTypes from "prop-types";

const SearchString = ({ onUserSearch }) => {
  // const [searchTerm, setSearchTerm] = useState("");

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
      // onChange={(e) => {
      //   setSearchTerm(e.target.value);
      //   console.log(searchTerm);
      // }}
    />
  );
};

SearchString.propTypes = {
  onUserSearch: PropTypes.func.isRequired,
};

export default SearchString;
