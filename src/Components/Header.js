import React from 'react'
import {RiArrowGoBackFill} from 'react-icons/ri'
import './Header.css'

export default function Header() {
    return (
        <div className='header'>
            <button className="header-btn"><RiArrowGoBackFill/> Back To Profile</button>
        </div>
    )
}
