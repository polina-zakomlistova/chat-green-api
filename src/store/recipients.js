import { makeAutoObservable } from 'mobx';

export default class Recipients {
    recipients = [
        // {
        //     name: '',
        //     phone: '79138024394',
        //     id: '79138024394@c.us',
        // },
        // {
        //     name: '',
        //     phone: '79528952227',
        //     id: '79528952227@c.us',
        // },
    ];

    _currentRecipient = null;

    get inRecipients() {
        return (phone) => this.recipients.some((item) => item.phone === phone);
    }

    get currentRecipient() {
        return this._currentRecipient;
    }

    addRecipient = (phoneOrId, name = phoneOrId) => {
        const phone = phoneOrId.replace(/[^\d]/g, '');
        if (!this.inRecipients(phone)) {
            const newRecipient = {
                phone: phone,
                id: `${phone}@c.us`,
                name: name,
            };

            this.recipients.push(newRecipient);
        }
    };

    setСurrentRecipient = (phone) => {
        this._currentRecipient = this.recipients.find((r) => r.phone === phone);
    };

    get currentRecipient() {
        return this._currentRecipient;
    }

    get hasCurrentRecipient() {
        return this._currentRecipient !== null;
    }

    findRecipient(id) {
        return this.recipients.find((r) => r.id === id);
    }
    constructor(rootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
}
