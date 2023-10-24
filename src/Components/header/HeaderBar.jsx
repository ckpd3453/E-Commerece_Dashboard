import React from "react";
import "./HeaderBar.css";

const HeaderBar = () => {
  const handleSignout = () => {
    alert("You have been signed out");
  };

  return (
    <div className="header">
      <div className="header-actions">
        <button onClick={handleSignout}>Signout</button>
      </div>
    </div>
  );
};

export default HeaderBar;
