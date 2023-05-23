import axios from 'axios';

export const getContactInfo = async (chatId, idInstance, apiTokenInstance) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/GetContactInfo/${apiTokenInstance}`;

    const data = {
        chatId: chatId,
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
            const responseData = {
                chatId: response.data.chatId,
                name: response.data.name,
            };

            return responseData;
        }
    } catch (error) {
        console.log(error);
    }
};
