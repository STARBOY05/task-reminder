import React from 'react'

function Header({ onAdd, showAdd }) {

    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            <button style={{ backgroundColor: "black" }} className='btn' onClick={onAdd}>{showAdd ? "add" : "close"}</button>
        </header>
    )
}

export default Header