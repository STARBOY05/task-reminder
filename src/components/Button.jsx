import React from 'react'

function Button({ color, text, onAdd }) {

    return (
        <div>
            <button style={{ backgroundColor: color }} className='btn'>{text}</button>
        </div>
    )
}

export default Button