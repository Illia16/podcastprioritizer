import React from 'react'

const MapMode =(props)=>{
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
       {
         // walk time
         props.transitTime.pedestrian <= 1 ? (
           <li>
             <span className="mode">
               <i class="fas fa-walking"></i>
             </span>{" "}
             {props.transitTime.pedestrian} minute
           </li>
         ) : (
           <li>
             <span className="mode">
               <i className="fas fa-walking"></i>
             </span>{" "}
             {props.transitTime.pedestrian} minutes
           </li>
         )
         // bike time
       }

       {
         props.transitTime.bicycle <= 1 ? (
           <li>
             {" "}
             <span className="mode">
               <i className="fas fa-biking"></i>
             </span>
             {props.transitTime.bicycle} minute
           </li>
         ) : (
           <li>
             <span className="mode">
               <i className="fas fa-biking"></i>
             </span>
             {props.transitTime.bicycle} minutes
           </li>
         )
         // car time
       }

       {props.transitTime.fastest <= 1 ? (
         <li>
           <span className="mode">
             <i className="fas fa-car"></i>
           </span>
           {props.transitTime.fastest} minute
         </li>
       ) : (
         <li>
           <span className="mode">
             <i className="fas fa-car"></i>
           </span>
           {props.transitTime.fastest} minutes
         </li>
       )}
     </div>
     <div className="map">
       <img className="map" src={props.map} />
     </div>
   </div>
 );
}

export default MapMode;