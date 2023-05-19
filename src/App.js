import React from 'react';
import { Link } from 'react-router-dom';

import LoginForm from './views/LoginForm';
import RouterView from './Routes';

export default function App() {
    return (
        <>
            <header></header>

            <main className="col col-9">
                <div className="container">
                    <RouterView />
                </div>
            </main>

            <footer className="mt-1"></footer>
        </>
    );
}
