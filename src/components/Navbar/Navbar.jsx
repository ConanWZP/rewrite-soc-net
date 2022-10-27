import React from 'react';
import styles from './Navbar.module.css';
import {NavLink} from "react-router-dom";


const activeClass = ({isActive}) => {
    return (
        isActive ? styles.activeLink : ''
    )
}




const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.item}>
                <NavLink to='/profile' className={activeClass}>Profile</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to='/dialogs' className={activeClass}>Dialogs</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to='/users' className={activeClass}>Users</NavLink>
            </div>
            <div className={`${styles.item} ${styles.activeLink}`}>
                <NavLink to='/news' className={activeClass}>News</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to='/music' className={activeClass}>Music</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to='/settings' className={activeClass}>Settings</NavLink>
            </div>


        </nav>
    );
}

export default Navbar;