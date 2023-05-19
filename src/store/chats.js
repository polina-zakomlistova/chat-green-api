import { makeAutoObservable } from 'mobx';

export default class Chat {
    chats = [
        {
            id: 1,
            participants: ['1234567890', '9876543210'],
            messages: [
                { id: 1, author: '1234567890', text: 'Привет, как дела?' },
                {
                    id: 2,
                    author: '9876543210',
                    text: 'Привет, все отлично! А у тебя?',
                },
                {
                    id: 3,
                    author: '1234567890',
                    text: 'У меня тоже все хорошо, спасибо!',
                },
            ],
        },
        {
            id: 2,
            participants: ['1234567890', '1111111111'],
            messages: [
                { id: 1, author: '1234567890', text: 'Привет, как дела?' },
                {
                    id: 2,
                    author: '1111111111',
                    text: 'Привет, все отлично! А у тебя?',
                },
                {
                    id: 3,
                    author: '1234567890',
                    text: 'У меня тоже все хорошо, спасибо!',
                },
            ],
        },
    ];

    get currentChat() {
        const currentRecipient = this.rootStore.recipients.currentRecipient;

        if (currentRecipient) {
            return this.chats.find((chat) =>
                chat.participants.includes(currentRecipient)
            );
        } else {
            return null;
        }
    }

    addMessage = (messageText, author) => {
        if (this.currentChat) {
            const newMessage = {
                id: this.currentChat.messages.length + 1,
                author: author,
                text: messageText,
            };

            this.currentChat.messages.push(newMessage);
            console.log(this.currentChat);
        }
    };

    sendMessage = (messageText) => {
        const author = this.rootStore.loginForm.phone;
        this.addMessage(messageText, author);
    };

    getMessage = (messageText) => {
        const author = this.rootStore.recipients.currentRecipient;
        this.addMessage(messageText, author);
    };

    remove = () => {};

    constructor(rootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
}
