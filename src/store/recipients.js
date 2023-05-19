import { makeAutoObservable } from 'mobx';

export default class Recipients {
    recipients = [
        {
            phone: '9876543210',
        },
        {
            phone: '1111111111',
        },
        {
            phone: '2222222222',
        },
    ];

    _currentRecipient = null;

    get inRecipients() {
        return (phone) => this.recipients.some((item) => item.phone === phone);
    }

    addRecipient = (phone) => {
        // Проверяем, что получатель с таким номером телефона еще не существует в списке

        if (this.inRecipients(phone)) {
            return; // Получатель уже существует, не добавляем дубликат
        }

        const newRecipient = {
            phone,
        };

        this.recipients.push(newRecipient);
    };

    setСurrentRecipient = (recipient) => {
        this._currentRecipient = recipient;
    };

    get currentRecipient() {
        return this._currentRecipient;
    }

    get hasCurrentRecipient() {
        return this._currentRecipient !== null;
    }

    constructor(rootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
}
