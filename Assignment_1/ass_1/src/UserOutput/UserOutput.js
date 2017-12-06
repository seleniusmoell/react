import React from 'react';
import './UserOutput.css'

const userOut = (props) => {
    return (
        <div className="UserOutput">
            <p> Tell me {props.username}, dost thou live by thine tabour?</p>
            <p> Nay sir, I live by the church. </p>
        </div>
    )
};

export default userOut;