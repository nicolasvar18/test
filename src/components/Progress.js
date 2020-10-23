import React from 'react';
//indica el progreso de en que numero de pregunta va 
function Progress(props) {
    return (
        <h2>
            Pregunta {props.current} de {props.total}
        </h2>
    );
}

export default Progress;
