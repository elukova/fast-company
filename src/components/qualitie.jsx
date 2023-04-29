import React from "react";

const Qualitie = ({ color, name, _id }) => {
  return (
    <span>
      <span className={"badge bg-" + color}>{name}</span>
      <span> </span>
    </span>
  );
};

export default Qualitie;
