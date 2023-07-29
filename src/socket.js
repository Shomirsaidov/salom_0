import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  messages: [],
  typing: '',
  membersQuantity: 0,
  privateMessages: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL, {autoConnect: true});

socket.on("connect", () => {
  state.connected = true;
  socket.auth = JSON.parse(localStorage.salom_2).auth
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("new", (...args) => {
    state.messages.push(args);
});

socket.on("newPrivate", (args) => {
  console.log('newPrivate')
  state.privateMessages.push(args);
});
  
socket.on("typing", () => {
    state.typing = 'someone is typing';
});

socket.on("stopped-typing", () => {
    state.typing = '';
});

socket.on('newMember', (amount) => {
    state.membersQuantity = amount
})







