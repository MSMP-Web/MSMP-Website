import React from "react";
import LeftTitleSection from "../../LeftTitleSection/LeftTitleSection";
import "./Dashboard.css";
import Login from "../Login/Login";

function Dashboard() {
  return (
    <>
      <div className="admin">
          <Login />
      </div>
    </>
  );
}

export default Dashboard;
