import { makeAutoObservable } from 'mobx';

export default class Chat {
    chats = [
        // {
        //     id: '79138024394@c.us',
        //     participants: ['447487676471@c.us', '79138024394@c.us'],
        //     messages: [
        //         {
        //             id: 1,
        //             author: '447487676471@c.us',
        //             text: 'Привет, как дела?',
        //         },
        //         {
        //             id: 2,
        //             author: '79138024394@c.us',
        //             text: 'Привет, все отлично! А у тебя?',
        //         },
        //         {
        //             id: 3,
        //             author: '447487676471@c.us',
        //             text: 'У меня тоже все хорошо, спасибо!',
        //         },
        //     ],
        // },
        // {
        //     id: '79528952227@c.us',
        //     participants: ['447487676471@c.us', '79528952227@c.us'],
        //     messages: [
        //         {
        //             id: 1,
        //             author: '447487676471@c.us',
        //             text: 'Привет, Игорь, как дела?',
        //         },
        //         {
        //             id: 2,
        //             author: '79528952227@c.us',
        //             text: 'Привет, все отлично! А у тебя?',
        //         },
        //         {
        //             id: 3,
        //             author: '447487676471@c.us',
        //             text: 'У меня тоже все хорошо, спасибо!',
        //         },
        //     ],
        // },
    ];

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
        const currentUser = this.rootStore.loginForm.id;
        // Перебираем сообщения, присланные из Api
        data.forEach((item) => {
            const {
                chatId,
                idMessage,
                textMessage,
                senderId = currentUser,
            } = item;

            const chat = this.findChat(chatId);

            if (chat) {
                //если нет такого сообщения, то добавляем
                if (!this.hasMessage(chatId, idMessage)) {
                    this.addMessage(textMessage, senderId, idMessage, chat);
                }
            } else {
                //создаем новый чат с этим сообщением
                const participants = [chatId, senderId];
                const messages = [
                    {
                        id: idMessage,
                        author: senderId,
                        text: textMessage,
                    },
                ];
                this.addChat(chatId, participants, messages);
            }
        });
    };

    //chatId = recipientId;
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
        textMessage,
        author,
        idMessage,
        chatId = this.currentChat.id
    ) => {
        const newMessage = {
            id: idMessage,
            author: author,
            text: textMessage,
        };

        const chat = this.findChat(chatId);
        if (chat) {
            chat.messages.push(newMessage);
        } else {
            const participants = this.getParticipants(author, chatId);
            this.rootStore.recipients.addRecipient(chatId);
            this.addChat(chatId, participants, [newMessage]);
        }
    };

    getParticipants(author, chatId) {
        if (author === chatId) {
            //входящее
            return [author, this.rootStore.loginForm.id];
        } else {
            //исходящее
            return [chatId, author];
        }
    }

    remove = () => {};

    constructor(rootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
}
