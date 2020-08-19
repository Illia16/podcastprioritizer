import React from 'react';
import './App.scss';


const Error = (props) => {
    return(
        <div className="popupBack">
            <div className="popup">
                <p>One of the input fields is not valid or distance is too huge</p>
                <button onClick={props.hideErrorWindow} >CLOSE</button>
            </div>
        </div>
    )
}

export default Error;