import axios from 'axios';

export const sendMessageApi = async (
    message,
    chatId,
    idInstance,
    apiTokenInstance
) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const data = {
        chatId: chatId,
        message: message,
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: headers,
        data: data,
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
