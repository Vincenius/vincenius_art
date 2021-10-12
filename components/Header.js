import React from 'react'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import GitHubIcon from '@material-ui/icons/GitHub'

import styles from '../styles/Header.module.css'
import { title, description } from '../utils/constants'

const Header = () => {
    return <header className={styles.container}>
        <img src="/shape.svg" alt="a background shape" className={styles.shape} />
        <img src="/can.png" alt="a yellow spray can" className={styles.headerImage} />

        <div className={styles.content}>
            <h1 className={styles.headline}>{title}</h1>
            <h2 className={styles.subheadline}>{description}</h2>

            <ul className={styles.iconLinks}>
                <li>
                    <a href="https://www.instagram.com/vincenius_art/" target="_blank" rel="noopener">
                        <span className={styles.screenReader}>Instagram</span>
                        <InstagramIcon width="24px" height="24px" />
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com/vinceniusart" target="_blank" rel="noopener">
                        <span className={styles.screenReader}>Facebook</span>
                        <FacebookIcon width="24px" height="24px" />
                    </a>
                </li>
                <li>
                    <a href="https://github.com/Vincenius/vincenius_art" target="_blank" rel="noopener">
                        <span className={styles.screenReader}>Github</span>
                        <GitHubIcon width="24px" height="24px" />
                    </a>
                </li>
            </ul>
        </div>
    </header>
}

export default Header
