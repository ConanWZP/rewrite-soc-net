import React from "react";
import styles from './Preloader.module.css'
import preloader from './../../assets/images/preloader.svg'


const Preloader = (props) => {
    return (
        <div className={styles.block}>
            <img className={styles.image} src={preloader}/>
        </div>

    )

}

export default Preloader;