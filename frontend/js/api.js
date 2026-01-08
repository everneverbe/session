const API_BASE = "http://localhost:3001/api";

async function safeFetch(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }
  return res.json();
}

export function fetchCases() {
  return safeFetch(`${API_BASE}/cases`);
}

export function fetchCaseById(id) {
  return safeFetch(`${API_BASE}/cases/${id}`);
}

export function login(email, password) {
  return safeFetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
}

export function saveSessionEntry(token, payload) {
  return safeFetch(`${API_BASE}/session-entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}
