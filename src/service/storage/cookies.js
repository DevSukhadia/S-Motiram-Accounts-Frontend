// src/utils/storage.js
const EXPIRY_TIME_MS = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

const token = "token";
const username = "username";
const role = "role";
const companyId = "companyId";
const companyName = "companyName";

// Helper to save an item with expiry
function setItemWithExpiry(key, value) {
    const item = {
        value: value,
        expiry: Date.now() + EXPIRY_TIME_MS,
    };
    localStorage.setItem(key, JSON.stringify(item));
}

// Helper to get an item and check expiry
function getItemWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
        const item = JSON.parse(itemStr);
        if (Date.now() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    } catch {
        // In case of corrupted data or old format
        localStorage.removeItem(key);
        return null;
    }
}

const save = {
    token: (value) => setItemWithExpiry(token, value),
    username: (value) => setItemWithExpiry(username, value),
    role: (value) => setItemWithExpiry(role, value),
    companyId: (value) => setItemWithExpiry(companyId, value),
    companyName: (value) => setItemWithExpiry(companyName, value),
};

const remove = {
    token: () => localStorage.removeItem(token),
    username: () => localStorage.removeItem(username),
    role: () => localStorage.removeItem(role),
    companyId: () => localStorage.removeItem(companyId),
    companyName: () => localStorage.removeItem(companyName),
};

const get = {
    token: () => getItemWithExpiry(token),
    username: () => getItemWithExpiry(username),
    role: () => getItemWithExpiry(role),
    companyId: () => getItemWithExpiry(companyId),
    companyName: () => getItemWithExpiry(companyName),
};

const isLoggedIn = () => !!get.token();

export { save, remove, get, isLoggedIn };
