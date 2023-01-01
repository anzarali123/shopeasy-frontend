import React from "react";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../redux/slice/authSlice";
import { Link } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectUserEmail);
  if (userEmail === process.env.REACT_APP_ADMIN_USER) {
    return children;
  } else {
    return (
      <section style={{ height: "80vh" }}>
        <div className="container">
          <h2>Permission denied</h2>
          <p>This page can only be viewed by Admin.</p>
          <br />
          <Link to="/">
            <button className="--btn">&larr; Back To Home</button>
          </Link>
        </div>
      </section>
    );
  }
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectUserEmail);
  if (userEmail === process.env.REACT_APP_ADMIN_USER) {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
