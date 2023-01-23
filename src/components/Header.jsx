import React from 'react'
import Button from './Button'

function Header({ onAdd }) {

    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            <Button color="black" text="add" onClick={onAdd} />
        </header>
    )
}

export default Header