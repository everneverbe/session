const storedToken = localStorage.getItem("session_token");

const state = {
  language: "id",
  user: {
    isAuthenticated: Boolean(storedToken),
    token: storedToken
  },
  listeners: []
};

export function setLanguage(lang) {
  state.language = lang;
  notify();
}

export function setAuth(token) {
  state.user.isAuthenticated = true;
  state.user.token = token;
  localStorage.setItem("session_token", token);
  notify();
}

export function clearAuth() {
  state.user.isAuthenticated = false;
  state.user.token = null;
  localStorage.removeItem("session_token");
  notify();
}

export function subscribe(fn) {
  state.listeners.push(fn);
}

function notify() {
  state.listeners.forEach(fn => fn());
}

export default state;
