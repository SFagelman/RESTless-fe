import { writable } from 'svelte/store';

export const currentUser = writable({ _id: 'none', user_name: 'None', user_password: 'none' });
