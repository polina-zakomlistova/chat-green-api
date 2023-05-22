import { makeAutoObservable } from 'mobx';

export default class LoginForm {
    fields = [
        {
            name: 'idInstance',
            label: 'idInstance',
            value: '',
            valid: false,
            pattern: /.*/,
        },
        {
            name: 'apiTokenInstance',
            label: 'apiTokenInstance',
            value: '',
            valid: false,
            pattern: /.*/,
        },
    ];

    _id = '447487676471@c.us';

    setId = (id) => {
        this._id = id;
    };

    get id() {
        return this._id;
    }

    get data() {
        let data = {};
        this.fields.forEach((field) => {
            data[field.name] = field.value;
        });
        data.phone = this.phone;
        return data;
    }

    get formValid() {
        return this.fields.every((f) => f.valid);
    }

    fieldUpdate = (name, value) => {
        let field = this.fields.find((field) => field.name == name);

        if (field !== undefined) {
            field.value = value.trim();
            field.valid = field.pattern.test(value);
        }
    };

    send = () => {
        //let form = {....data,
        //cart: this.rootStore.cart.products}
    };

    constructor(rootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
}
