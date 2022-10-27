import React from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {

    return (
    <header className={styles.header}>
        <div className={styles.icon}>
            <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />
        </div>
        <div className={styles.article}>Social Network</div>
        <div className={styles.loginBlock}>
            {props.isAuth ?
                <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
                : <NavLink to={'/login'}>Login</NavLink>}

        </div>

    </header>


    )
}

export default Header;