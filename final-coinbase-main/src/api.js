const API = import.meta.env.VITE_API_URL;

const COLORS = [
  "#f7931a", "#627eea", "#26a17b", "#e84142",
  "#0033ad", "#2775ca", "#e6007a", "#00ffa3"
];

const fakeSparkline = () =>
  Array.from({ length: 10 }, (_, i) => 50 + Math.sin(i) * 10 + Math.random() * 5);

export const getCryptos = () =>
  fetch(`${API}/api/crypto`)
    .then(res => res.json())
    .then(data =>
      data.map((coin, i) => ({
        ...coin,
        id: coin._id,
        color: COLORS[i % COLORS.length],
        sparkline: fakeSparkline(),
      }))
    );

export const registerUser = (data) =>
  fetch(`${API}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then(res => res.json());

export const loginUser = (data) =>
  fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  }).then(res => res.json());

export const logoutUser = () =>
  fetch(`${API}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  }).then(res => res.json());

export const getProfile = () =>
  fetch(`${API}/api/auth/profile`, {
    credentials: 'include',
  }).then(res => res.json());