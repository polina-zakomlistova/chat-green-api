import axios from 'axios';

export const getContacts = async (idInstance, apiTokenInstance) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/getContacts/${apiTokenInstance}`;

    const headers = {
        'Content-Type': 'application/json',
    };

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: headers,
    };

    try {
        const response = await axios.request(config);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};
