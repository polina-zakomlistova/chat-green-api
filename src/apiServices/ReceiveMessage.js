import axios from 'axios';
import { deleteNotification } from './DeleteNotification';

export const receiveMessage = async (
    idInstance,
    apiTokenInstance,
    addMessage
) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

    const handleMessageReceived = (webhookBody) => {
        const responseData = {
            textMessage: webhookBody.messageData.textMessageData.textMessage,
            sender: webhookBody.senderData.sender,
            idMessage: webhookBody.idMessage,
            chatId: webhookBody.senderData.chatId,
        };
        addMessage(
            responseData.textMessage,
            responseData.sender,
            responseData.idMessage,
            responseData.chatId
        );
        console.log('send');
    };

    const handleNotificationReceived = async (response) => {
        try {
            await deleteNotification(
                idInstance,
                apiTokenInstance,
                response.receiptId
            );
        } catch (error) {}
    };

    const handleStateInstanceChanged = (webhookBody) => {
        console.log('stateInstanceChanged');
        console.log(`stateInstance=${webhookBody.stateInstance}`);
    };

    const handleOutgoingMessageStatus = (webhookBody) => {
        console.log('outgoingMessageStatus');
        console.log(`status=${webhookBody.status}`);
    };

    const handleDeviceInfo = (webhookBody) => {
        console.log('deviceInfo');
        console.log(`status=${webhookBody.deviceData}`);
    };

    const receiveNotificationLoop = async () => {
        try {
            console.log('Waiting incoming notifications...');
            let response;
            while ((response = (await axios.get(url)).data)) {
                console.log('response', response);
                const webhookBody = response.body;

                switch (webhookBody.typeWebhook) {
                    case 'incomingMessageReceived':
                        handleMessageReceived(webhookBody);

                        break;
                    case 'stateInstanceChanged':
                        handleStateInstanceChanged(webhookBody);

                        break;

                    case 'outgoingMessageStatus':
                        handleOutgoingMessageStatus(webhookBody);

                        break;

                    case 'deviceInfo':
                        handleDeviceInfo(webhookBody);

                        break;
                    default:
                        break;
                }

                await handleNotificationReceived(response);
            }

            receiveNotificationLoop();
        } catch (error) {
            console.log(error);
        }
    };

    receiveNotificationLoop();
};
