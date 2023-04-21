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
        gap: "1rem",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1>404</h1>
      <p>Page not found</p>
      <Styled.Button
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
