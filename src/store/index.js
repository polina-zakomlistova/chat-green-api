import Chats from './chats';
import LoginForm from './loginForm';
import Recipients from './recipients';

export default class RootStore {
    constructor() {
        this.localStorage = window.localStorage;
        this.chats = new Chats(this);
        this.loginForm = new LoginForm(this);
        this.recipients = new Recipients(this);
    }
}
