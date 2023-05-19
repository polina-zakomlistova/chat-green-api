import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
    return (
        <div>
            <h1>Page not found</h1>
            <hr />
            <p>Start from {<Link to={'/'}>main</Link>} page</p>
        </div>
    );
}
