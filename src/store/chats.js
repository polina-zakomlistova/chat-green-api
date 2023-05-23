import { makeAutoObservable } from 'mobx';
//{
//     id: '7777777777@c.us',
//     participants: ['7777777777@c.us', '9999999999@c.us'],
//     messages: [
//         {
//             id: 1,
//             author: '7777777777@c.us',
//             text: 'Привет, как дела?',
//               type: 'incoming' || 'outgoing';
//         },
//     ],
// },
export default class Chat {
    chats = [];

    get currentChat() {
        const currentRecipient = this.rootStore.recipients.currentRecipient;
        if (currentRecipient) {
            return this.findChat(currentRecipient.id);
        } else {
            return null;
        }
    }

    get inChats() {
        return (id) => {
            this.chats.some((chat) => {
                chat.id === id;
            });
        };
    }

    updateChats = (data) => {
        data.forEach((item) => {
            const { chatId, idMessage, textMessage, type } = item;

            const chat = this.findChat(chatId);
            const senderId = this.getSender(type, chatId);

            if (chat) {
                this.addMessage(type, textMessage, idMessage, chatId);
            } else {
                //создаем новый чат с этим сообщением
                const participants = this.getParticipants(chatId, type);
                const messages = [
                    {
                        id: idMessage,
                        author: senderId,
                        text: textMessage,
                        type: type,
                    },
                ];
                this.addChat(chatId, participants, messages);
            }
        });
    };

    findChat = (chatId) => {
        return this.chats.find((c) => c.id === chatId);
    };

    hasMessage = (chatId, idMessage) => {
        const chat = this.findChat(chatId);
        if (chat) {
            const message = chat.messages.find((m) => (m.id = idMessage));
            if (message) {
                return true;
            }
        }

        return false;
    };
    addChat = (chatId, participants, messages = []) => {
        this.chats.push({
            id: chatId,
            participants: participants,
            messages: messages,
        });
    };

    addMessage = (
        type,
        textMessage,
        idMessage,
        chatId = this.currentChat.id
    ) => {
        const senderId = this.getSender(type, chatId);
        const newMessage = {
            type: type,
            id: idMessage,
            author: senderId,
            text: textMessage,
        };

        const chat = this.findChat(chatId);
        if (chat) {
            chat.messages.push(newMessage);
        } else {
            const participants = this.getParticipants(senderId, chatId);
            this.rootStore.recipients.addRecipient(chatId);
            this.addChat(chatId, participants, [newMessage]);
        }
    };

    getSender = (type, chatId) => {
        if (type === 'incoming') {
            //входящее
            return chatId;
        } else {
            //исходящее
            return this.rootStore.loginForm.id;
        }
    };

    getParticipants(senderId, chatId) {
        if (senderId === chatId) {
            //входящее
            return [senderId, this.rootStore.loginForm.id];
        } else {
            //исходящее
            return [chatId, senderId];
        }
    }

    remove = () => {};

    constructor(rootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
}
