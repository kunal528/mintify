import React from 'react'
import './navbar.css'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Navbar = ({
    onClick,
    user
}) => {
    return (
        <div className='navbar-container'>
            <Link className='navbar-logo remove-link' to={'/'}>
                <img src={logo} alt='logo' className='logo' />
                <div className='navbar-logo-text'>Mintify</div>
            </Link>
            <div className='navbar-links'>
                <img src="https://docs.unstoppabledomains.com/images/default-icon.png" height={40} alt="" onClick={onClick} />
                
            </div>
        </div>
    )
}

export default Navbar