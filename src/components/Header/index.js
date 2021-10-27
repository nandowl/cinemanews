import React, {useContext} from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import avatar from '../../assets/avatar.png'
import logo from '../../assets/logo.png'

import { AuthContext } from '../../contexts/auth'

export default function Header() {
    const { user } = useContext(AuthContext)
    return (
        <div className="menu-area">
            <div className="logo">
             <Link to="/"><img src={logo} alt="Logo do Site" /></Link>             
             <Link className="logo-title" to="/">CinemaNews</Link>
            </div>
            <div className="menu-header">
                <Link className="favoritos" to="/favoritos">Favoritos</Link>
                <div className="profile-avatar">
                    <a href="/profile">
                        <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Avatar Perfil" />
                    </a>
                </div>
            </div>
        </div>
    )
}