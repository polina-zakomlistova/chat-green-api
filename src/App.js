import React from 'react';
import { Link } from 'react-router-dom';

import LoginForm from './views/LoginForm';
import RouterView from './Routes';

import styles from './app.module.css';

export default function App() {
    return (
        <div className={styles.App}>
            <header></header>
            <main>
                <div className="container">
                    <RouterView />
                </div>
            </main>
            <footer></footer>
        </div>
    );
}
