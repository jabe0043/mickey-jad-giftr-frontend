import React from "react";
import * as Styled from "../../styled/components";

const FourOFour = () => {
  return (
    <main
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        height: "80vh",
        textAlign: "center",
      }}
    >
      <h1>404</h1>
      <p>Page not found</p>
      <Styled.Button
        style={{
          width: "50%",
        }}
        onClick={() => {
          window.location = "/people";
        }}
      >
        Go back to home
      </Styled.Button>
    </main>
  );
};

export default FourOFour;
