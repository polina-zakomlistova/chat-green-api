import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//components
import ChatSidebar from '../ChatSidebar';
import ChatWindow from '../ChatWindow';

//context
import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';

export default observer(ChatGroup);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#ffffff',
        width: '1000px',
        height: '90vh',
        '@media(max-width: 1540px)': {
            width: '100vw',
            height: '100vh',
            margin: 0,
        },
    },
}));

function ChatGroup() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h2 className="visually-hidden">Chats group</h2>
            <ChatSidebar />
            <ChatWindow />
        </div>
    );
}
