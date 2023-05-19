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
        justifyContent: 'space-between',
    },
}));

function ChatGroup() {
    const classes = useStyles();
    return (
        <>
            <h1>Chats group</h1>
            <div className={classes.root}>
                <ChatSidebar />
                <ChatWindow />
            </div>
        </>
    );
}
