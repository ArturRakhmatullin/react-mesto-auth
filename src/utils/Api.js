class Api {
    constructor({link, headers}) {
      this._baseUrl = link;
      this._headers = headers;
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }

    getProfileInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
          "method": "GET",
          "headers": this._headers,
      })
      .then(this._checkResponse)
    }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        "method": "GET",
        "headers": this._headers,
      })
        .then(this._checkResponse);
    }

    editProfile(data) {
      return fetch(`${this._baseUrl}/users/me`, {
          "method": "PATCH",
          "headers": this._headers,
          "body": JSON.stringify({
              name: data.name,
              about: data.about,
          })
      })
      .then(this._checkResponse);
    }

    editAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          "method": "PATCH",
          "headers": this._headers,
          "body": JSON.stringify({
              avatar: data.avatar,
          })
      })
      .then(this._checkResponse)
    }

    addCard(place, link) {
      return fetch(`${this._baseUrl}/cards`, {
          "method": "POST",
          "headers": this._headers,
          "body": JSON.stringify({
              name: place,
              link: link,
          })
      })
      .then(this._checkResponse);
    }

    removeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
          "method": "DELETE",
          "headers": this._headers,
      })
      .then(this._checkResponse)
    }

    addLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          "method": "PUT",
          "headers": this._headers
      })
      .then(this._checkResponse)
    }

    removeLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          "method": "DELETE",
          "headers": this._headers
      })
      .then(this._checkResponse)
    }

    getInitialData() {
      return Promise.all([this.getInitialCards(), this.getProfileInfo()]);
    }

    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        "method": `${isLiked ? 'PUT' : 'DELETE'}`,
        "headers": this._headers,
      }).then(this._checkResponse);
    }
}

export default Api = new Api({
    link: 'https://mesto.nomoreparties.co/v1/cohort-50',
    headers: {
        'authorization': '602fce52-47ee-402a-b2dd-b2ee3d1cac69',
        'Content-Type': 'application/json'
    }
})