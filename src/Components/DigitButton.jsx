import React from 'react';

function DigitButton({ digit, dispatch }) {
    return (

        <button onClick={() => dispatch({ type:"ADD_OPERAND", payload: digit })}>
            {digit}
        </button>
    )
}

export default DigitButton;