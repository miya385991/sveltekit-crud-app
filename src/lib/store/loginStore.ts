import { writable } from 'svelte/store';

export const loginStore = writable({
  status: false,
  store:{
    username: '',
    email: '',
  }
})