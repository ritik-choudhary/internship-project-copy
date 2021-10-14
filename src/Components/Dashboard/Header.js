import React from 'react'
import { RiArrowGoBackFill } from 'react-icons/ri'
import './Header.css'

export default function Header() {
  return (
    <div className='header'>
      <div className='header-btn'>
        <RiArrowGoBackFill /> Back To Profile
      </div>
    </div>
  )
}
