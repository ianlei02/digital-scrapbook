import React from "react";
import "../Lanyard.css";
import profileIMG from "@/assets/formal.png";
const CustomLanyard = () => {
  return (
    <div className="lanyard-container">
      <div className="lanyard-strap"></div>
      <div className="lanyard-clip"></div>
      <div className="lanyard-card">
        <img className="card-photo" src={profileIMG}></img>
        <div className="card-info">
          <h3 className="card-name-id">Ian Lei C. Castillo</h3>
          <p className="card-role">Developer</p>
          <p className="card-project">BSIT 4-C</p>
        </div>
      </div>
    </div>
  );
};

export default CustomLanyard;
