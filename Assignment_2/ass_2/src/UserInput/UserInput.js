import React from 'react';

const UserIn = ( props ) => {
    return(
        <div className="UserInput">
            <input type="text"
            onChange={props.changed}
            value={props.currentText}
            />
        </div>
    )
}

export default UserIn;