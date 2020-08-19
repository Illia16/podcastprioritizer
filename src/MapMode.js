import React from 'react'

const MapMode =(props)=>{
 return (
   <div className="transitMap">
     <ul
       className="transit"
       style={{
         display:
           props.transitTime.bicycle &&
           props.transitTime.fastest &&
           props.transitTime.pedestrian
             ? "block"
             : "none",
       }}
     >
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
     </ul>
     <div className="map">
       <img src={props.map} alt="" />
     </div>
   </div>
 );
}

export default MapMode;