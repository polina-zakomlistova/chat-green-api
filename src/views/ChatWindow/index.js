import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sendMessageApi } from '../../apiServices/SendMessage';
import { receiveMessage } from '../../apiServices/ReceiveMessage';
//components
import {
    List,
    ListItem,
    ListItemText,
    Paper,
    IconButton,
    InputBase,
} from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';

import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';

export default observer(Chat);

function Chat() {
    const [chatsStore, recipientsStore, loginFormStore] = useStore(
        'chats',
        'recipients',
        'loginForm'
    );
    const { currentChat, addMessage } = chatsStore;
    const { data, id: userId } = loginFormStore;
    const { currentRecipient } = recipientsStore;

    const [message, setMessage] = useState('');
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message) {
            try {
                const response = await sendMessageApi(
                    'outgoing',
                    message,
                    data.idInstance,
                    data.apiTokenInstance
                );

                if (response) {
                    console.log('1111', response);
                    addMessage(message, userId, response.idMessage);
                    setMessage('');
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleEnterPress = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const handleSendChange = (e) => {
        setMessage(e.target.value);
    };
    useEffect(() => {
        const idInstance = data.idInstance;
        const apiTokenInstance = data.apiTokenInstance;

        const handleReceiveMessage = async () => {
            try {
                await receiveMessage(idInstance, apiTokenInstance, addMessage);
            } catch (error) {
                console.error('Error receiving message:', error);
            }
        };

        handleReceiveMessage();
    }, []);

    const useStyles = makeStyles((theme) => ({
        wrapper: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            borderLeft: '1px solid #b7b4af',
            marginTop: 'auto',
            height: '100%',
        },
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '20ch',
            },
        },
        paper: {
            display: 'flex',
            padding: '5px 5px 5px 10px',
            backgroundColor: '#eae6df',
            border: 'none',
            marginTop: 'auto',
        },
        input: {
            backgroundColor: '#ffff',
            borderRadius: '5px',
            padding: '5px',
            flexGrow: 1,
        },
        recipient: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '10px',
            backgroundColor: '#eae6df',
            height: '50px',
            marginTop: '0px',
        },
        listChat: {
            overflow: 'auto',
            height: 'inherit',
        },
        listItem: {},
    }));

    const classes = useStyles();

    const listRef = useRef(null);

    let messages = currentChat && currentChat.messages;

    // Перемещение скролла вниз при добавлении новых элементов
    useEffect(() => {
        listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [messages]);

    return (
        <div className={classes.wrapper}>
            <h2 className="visually-hidden">Chat</h2>
            <div className={classes.recipient}>
                {currentRecipient ? currentRecipient.phone : ''}
            </div>
            <List className={classes.listChat} ref={listRef}>
                {messages &&
                    messages.map((message) => {
                        return (
                            <ListItem
                                key={message.id}
                                className={classes.listItem}
                            >
                                <ListItemText
                                    primary={
                                        message.type === 'outgoing'
                                            ? 'Вы'
                                            : currentRecipient.name
                                    }
                                    secondary={message.text}
                                    align={
                                        message.type === 'outgoing'
                                            ? 'right'
                                            : 'left'
                                    }
                                />
                            </ListItem>
                        );
                    })}
            </List>
            <Paper
                component="form"
                className={classes.paper}
                onSubmit={handleSendMessage}
            >
                <InputBase
                    multiline
                    className={classes.input}
                    placeholder="Введите сообщение"
                    onChange={handleSendChange}
                    value={message}
                    onKeyPress={handleEnterPress}
                />
                <IconButton type="submit" className={classes.iconButton}>
                    <SendIcon />
                </IconButton>
            </Paper>
        </div>
    );
}
