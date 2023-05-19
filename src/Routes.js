import React from 'react';

import { Routes, Route } from 'react-router-dom';

//components

import LoginForm from './views/LoginForm';
import ChatsGroup from './views/ChatsGroup';
import E404 from './views/E404';

export default function () {
    return (
        <Routes>
            <Route path="/" element={<LoginForm />}></Route>
            <Route path="/chatsGroup" element={<ChatsGroup />}></Route>
            <Route path="*" element={<E404 />}></Route>
        </Routes>
    );
}
