import axios from 'axios';

export const getRecipients = async (idInstance, apiTokenInstance) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/getChats/${apiTokenInstance}`;

    const headers = {
        'Content-Type': 'application/json',
    };

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
    };

    try {
        const response = await axios.request(config);
        if (response) {
            const responseData = response.data.map((c) => ({
                id: c.id,
            }));

            return responseData;
        }
    } catch (error) {
        console.log(error);
    }
};
