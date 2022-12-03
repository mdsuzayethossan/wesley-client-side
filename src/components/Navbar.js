import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut();
  };
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      {(user && (
        <>
          <h3>{user?.displayName}</h3>{" "}
          <button
            onClick={handleLogout}
            style={{ width: "55px", height: "25px" }}
          >
            Logout
          </button>
        </>
      )) || (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
