import React from "react";
import PropTypes from "prop-types";
import ArrowUp from "./arrowUp";
import ArrowDown from "./arrowDown";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
    console.log(item);
  };
  const checkOrder = () => {
    if (selectedSort.order === "asc") {
      return <ArrowUp />;
    } else if (selectedSort.order === "desc") {
      return <ArrowDown />;
    }
    return undefined;
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && "button" }}
            scope="col">
            {columns[column].name}
            {columns[column].path === selectedSort.path
              ? checkOrder()
              : undefined}
          </th>
        ))}
        <th />
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableHeader;
