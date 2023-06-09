import axios from 'axios';

export const getChatHistory = async (chatId, idInstance, apiTokenInstance) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`;

    const data = {
        chatId: chatId,
        count: 100,
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
        if (response) {
            const responseData = response.data.map((m) => ({
                textMessage: m.textMessage,
                idMessage: m.idMessage,
                chatId: m.chatId,
                type: m.type,
            }));

            return responseData;
        }
    } catch (error) {
        console.log(error);
    }
};
