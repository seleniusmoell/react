import React from 'react';


let validationComponent = ( props ) => {
    let output = null;

    if(props.len < 5){
        output = (
            <p>Text too short!</p>
        )
    } else {
        output = (
            <p>Text long enough </p>
        )
    }
    return(
        <div className="ValidationComponent">
            {output}
        </div>
    )
}

export default validationComponent;