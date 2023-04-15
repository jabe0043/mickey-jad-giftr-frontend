import React from "react";

const Gift = ({ gift }) => {
  return (
    <div>
      <h3>{gift.txt}</h3>
      <p>{gift.store}</p>
      <p>{gift.url}</p>
    </div>
  );
};

export default Gift;
