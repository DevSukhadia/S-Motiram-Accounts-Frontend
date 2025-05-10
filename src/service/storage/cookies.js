// src/utils/storage.js

const token = "token";
const username = "username";
const role = "role";

const save = {
    token: (value) => localStorage.setItem(token, value),
    username: (value) => localStorage.setItem(username, value),
    role: (value) => localStorage.setItem(role, value),
};

const remove = {
    token: () => localStorage.removeItem(token),
    username: () => localStorage.removeItem(username),
    role: () => localStorage.removeItem(role),
};

const get = {
    token: () => localStorage.getItem(token),
    username: () => localStorage.getItem(username),
    role: () => localStorage.getItem(role),
};

const isLoggedIn = () => !!get.token();

export { save, remove, get, isLoggedIn };