import { makeAutoObservable } from 'mobx';
// {
//     name: '',
//     phone: '7777777777',
//     id: '7777777777@c.us',
// },
export default class Recipients {
    recipients = [];

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

    setСurrentRecipient = (id) => {
        this._currentRecipient = this.recipients.find((r) => r.id === id);
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
