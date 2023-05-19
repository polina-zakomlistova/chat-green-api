import React, { useState } from 'react';

//components
import {
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
} from '@material-ui/core';

import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';

export default observer(Chat);

function Chat() {
    const [chatsStore, recipientsStore] = useStore('chats', 'recipients');
    const { currentChat, sendMessage } = chatsStore;
    const { currentRecipient } = recipientsStore;
    const [message, setMessage] = useState('');
    const handleSendMessage = () => {
        if (message) {
            sendMessage(message);
            setMessage('');
        }
    };

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <List>
                {currentChat ? (
                    currentChat.messages.map((message) => (
                        <ListItem key={message.id}>
                            <ListItemText
                                primary={
                                    message.author === currentRecipient
                                        ? message.author
                                        : 'Вы'
                                }
                                secondary={message.text}
                                align={
                                    message.author === currentRecipient
                                        ? 'left'
                                        : 'right'
                                }
                            />
                        </ListItem>
                    ))
                ) : (
                    <></>
                )}
            </List>
            <TextField
                label="Введите сообщение"
                variant="outlined"
                multiline
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                onKeyDown={handleEnterPress}
            >
                Отправить
            </Button>
        </div>
    );
}
