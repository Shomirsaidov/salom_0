<template>
    <h1 class="text-green-600 text-lg">В чатe: {{ membersQuantity }}</h1>
    <input class="border-2 outline-none p-2" v-model="value" @keyup.enter="send"/>
    <button class="rounded-lg bg-blue-500 text-white font-bold outline-none p-2" type="submit" @click="send" :disabled="isLoading">
      Send
    </button>
    <div>
      <h2 v-for="(message, index) in messages" :key="index">
        {{ message[0] }}
      </h2>
      <i>{{ typingStatus }}</i>
    </div>
</template>

<script>
import { socket, state } from "@/socket";

export default {
  name: "MyForm",

  data() {
    return {
      isLoading: false,
      value: ""
    }
  },

  methods: {
    send() {
      this.isLoading = true;

      socket.timeout(200).emit("message", this.value, () => {
        this.isLoading = false;
        console.log('sent')

        state.messages.push([this.value])
        this.value = ''
        socket.emit('stopped-typing')
      });
    },
  },
  watch: {
    messages(actual, prev) {
      console.log(actual)
    },
    value() {
      if(this.value !== '') {
        socket.emit('typing')
      } else {
        socket.emit('stopped-typing')
      }
    }
  },
  computed: {
    messages() {
      return state.messages
    },
    typingStatus() {
      return state.typing
    },
    membersQuantity() {
      return state.membersQuantity
    }
  },
 
}
</script>






