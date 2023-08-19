import React from 'react';

function OperatorButton({ operator, dispatch }) {
    return (

        <button onClick={() => dispatch({ type:"ADD_OPERATOR", payload: operator })}>
            {operator}
        </button>
    )
}

export default OperatorButton;