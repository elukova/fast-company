import React from "react";

const SearchStatus = ({ length }) => {
  if (!length) {
    return <span class="badge bg-danger">Никто с тобой не тусанет</span>;
  }
  const words = ["человек тусанет", "человека тусанут"];
  const remaiderOfHundred = Math.abs(length) % 100;
  const remaiderOfTen = remaiderOfHundred % 10;
  if (remaiderOfHundred > 10 && remaiderOfHundred < 20) {
    return (
      <span class="badge bg-primary">
        {length} {words[0]} с тобой сегодня
      </span>
    );
  } else if (remaiderOfTen > 1 && remaiderOfTen < 5) {
    return (
      <span class="badge bg-primary">
        {length} {words[1]} с тобой сегодня
      </span>
    );
  } else {
    return (
      <span class="badge bg-primary">
        {length} {words[0]} с тобой сегодня
      </span>
    );
  }
};

export default SearchStatus;
