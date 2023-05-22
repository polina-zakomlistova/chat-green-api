const axios = require('axios');
let data = JSON.stringify({
    chatId: '79528952227@c.us',
    count: 100,
});

import axios from 'axios';

export const getChatHistoryApi = async (
    recipient,
    idInstance,
    apiTokenInstance
) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`;

    const data = {
        chatId: `${recipient}@c.us`,
        count: 100,
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios
        .request(config)
        .then((response) => {
            return JSON.stringify(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};
