import React from "react";
import "./Impact.css";
import RightTitleSection from "../RightTitleSection/RightTitleSection";

function Impact() {
  return (
    <>
      <div className="impact-title">
        <RightTitleSection title={"Impact Since Inception"} />
      </div>
      <div className="main">
        <div className="row">
          <div className="card">
            <h1>46</h1>
            <p>Organisations</p>
          </div>

          <div className="card">
            <h1>164</h1>
            <p>Members of MSMP</p>
          </div>

          <div className="card">
            <h1>4</h1>
            <p>Campaigns</p>
          </div>

          <div className="card">
            <h1>14</h1>
            <p>Booklets</p>
          </div>
        </div>

        <div className="row">
          <div className="card">
            <h1>3</h1>
            <p>Poster Exhibitions</p>
          </div>

          <div className="card">
            <h1>7</h1>
            <p>Regions</p>
          </div>

          <div className="card">
            <h1>33</h1>
            <p>Districts</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Impact;
