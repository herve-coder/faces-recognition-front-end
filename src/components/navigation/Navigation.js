import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn === true) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 dim black link pointer underline pa3"
        >
          Sign out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 dim black link pointer underline pa3"
        >
          Sign in
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="f3 dim black link pointer underline pa3"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
