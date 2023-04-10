import Messages from './PostsView';

const app = document.querySelector('#app');
const messages = new Messages(app);
messages.render();
