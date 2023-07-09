import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  if (!length) {
    return (
      <h2>
        <span className="badge bg-danger">Никто с тобой не тусанет</span>
      </h2>
    );
  }
  const words = ["человек тусанет", "человека тусанут"];
  const remaiderOfHundred = Math.abs(length) % 100;
  const remaiderOfTen = remaiderOfHundred % 10;
  if (remaiderOfHundred > 10 && remaiderOfHundred < 20) {
    return (
      <h2>
        <span className="badge bg-primary">
          {length} {words[0]} с тобой сегодня
        </span>
      </h2>
    );
  } else if (remaiderOfTen > 1 && remaiderOfTen < 5) {
    return (
      <h2>
        <span className="badge bg-primary">
          {length} {words[1]} с тобой сегодня
        </span>
      </h2>
    );
  } else {
    return (
      <h2>
        <span className="badge bg-primary">
          {length} {words[0]} с тобой сегодня
        </span>
      </h2>
    );
  }
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
};

// const SearchStatus = ({ length }) => {
//   const renderPhrase = (number) => {
//     const lastOne = Number(number.toString().slice(-1));
//     if (number > 4 && number < 15) {
//       return "человек тусанет";
//     }
//     if (lastOne === 1) return "человек тусанет";
//     if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
//     return "человек тусанет";
//   };
//   return (
//     <h2>
//       <span className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}>
//         {length > 0
//           ? `${length + " " + renderPhrase(length)}   с тобой сегодня`
//           : "Никто с тобой не тусанет"}
//       </span>
//     </h2>
//   );
// };

export default SearchStatus;
