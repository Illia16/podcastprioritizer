import React from "react";

const MapMode = (props) => {
  return (
    <div
      className="transitMap"
      style={{
        display:
          props.transitTime.bicycle &&
          props.transitTime.fastest &&
          props.transitTime.pedestrian
            ? "flex"
            : "none",
      }}
    >
      <div className="transit">
        <li>
          <span className="mode">
            <i aria-label="walking time" className="fas fa-walking"></i>
          </span>
          {props.transitTime.pedestrian <= 1
            ? `${props.transitTime.pedestrian} minute`
            : `${props.transitTime.pedestrian} minutes`}
        </li>
        <li>
          <span className="mode">
            <i aria-label="biking time" className="fas fa-biking"></i>
          </span>
          {props.transitTime.bicycle <= 1
            ? `${props.transitTime.bicycle} minute `
            : `${props.transitTime.bicycle} minutes `}
        </li>

        <li>
          <span className="mode">
            <i aria-label="driving time" className="fas fa-car"></i>
          </span>
          {props.transitTime.fastest <= 1
            ? `${props.transitTime.fastest} minute`
            : `${props.transitTime.fastest} minutes`}
        </li>
      </div>
      <div className="map">
        <img src={props.map} />
      </div>
    </div>
  );
};

export default MapMode;
