import React from 'react'

import styles from '../styles/Footer.module.css'

const Todo = () => {
    return <footer className={styles.footer}>
        <span>
            © {new Date().getFullYear()} - vincenius.com
        </span>

        <ul className={styles.linkList}>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="https://vincentwill.com">vincentwill.com</a></li>
        </ul>
    </footer>
}

export default Todo
