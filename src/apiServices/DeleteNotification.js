import axios from 'axios';

export const deleteNotification = async (
    idInstance,
    apiTokenInstance,
    receiptId
) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;

    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: url,
        headers: {},
    };
    await axios
        .request(config)
        .then((response) => {
            console.log('end delete', receiptId, response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};
