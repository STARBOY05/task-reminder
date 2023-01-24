import React from 'react'

function Header({ onAdd, showAdd }) {

    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            <button style={{ backgroundColor: `${showAdd ? "red" : "black"}` }} className='btn' onClick={onAdd}>{showAdd ? "Close" : "Add"}</button>
        </header>
    )
}

export default Header