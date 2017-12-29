import React from 'react';
import './CharComponent.css';

const charComponent = ( props ) => {
    return (
        <div className="CharComponent">
            <p onClick={props.click}>{props.letter} </p>
        </div>
    )
};

export default charComponent;