export const baseLink = "https://auth.nomoreparties.co";

function _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${baseLink}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  }).then(_checkResponse);
};

export const login = (email, password) => {
  return fetch(`${baseLink}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  }).then(_checkResponse);
};

export const checkToken = (token) => {
  return fetch(`${baseLink}/users/me`, {
    method: "GET",
    headers: {
      'authorization': `Bearer ${token}`,
    },
  }).then(_checkResponse);
};