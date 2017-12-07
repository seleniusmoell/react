import React from 'react';

const inputStyle = {
    border: '2px solid blue',
}
const userIn = ( props ) => {
    return(
        <div className="UserInput">
            <input type="text" 
            style={inputStyle}
            onChange={props.changed} 
            value={props.currentname}/>
        </div>
    )
;}

export default userIn;