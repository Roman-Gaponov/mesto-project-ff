/* НАСТРОЙКИ */

const loginConfig = {
  cohortId: "wff-cohort-26",
  token: "3030b019-4537-4e11-8fa7-8b770ae8139c",
};

const connectionConfig = {
  baseUrl: `https://nomoreparties.co/v1/${loginConfig.cohortId}`,
  headers: {
    authorization: loginConfig.token,
    "Content-Type": "application/json",
  },
};

/* ФУНКЦИИ */

// функция обработки ответа от сервера
function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// запрос на получение данных профиля
function getProfileDataQuery() {
  return fetch(`${connectionConfig.baseUrl}/users/me`, {
    method: "GET",
    headers: connectionConfig.headers,
  }).then(getResponseData);
}

// запрос на получение данных начального набора карточек
function getInitialCardsQuery() {
  return fetch(`${connectionConfig.baseUrl}/cards`, {
    method: "GET",
    headers: connectionConfig.headers,
  }).then(getResponseData);
}

// запрос на добавление новой карточки
function addNewCardQuery(inputCardNameValue, inputUrlValue) {
  return fetch(`${connectionConfig.baseUrl}/cards`, {
    method: "POST",
    headers: connectionConfig.headers,
    body: JSON.stringify({
      name: inputCardNameValue,
      link: inputUrlValue,
    }),
  }).then(getResponseData);
}

// запрос на удаление карточки
function deleteCardQuery(cardId) {
  return fetch(`${connectionConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: connectionConfig.headers,
  }).then(getResponseData);
}

// запрос на установку лайка карточки
function setLikeQuery(cardId) {
  return fetch(`${connectionConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: connectionConfig.headers,
  }).then(getResponseData);
}

// запрос на удаление лайка
function deleteLikeQuery(cardId) {
  return fetch(`${connectionConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: connectionConfig.headers,
  }).then(getResponseData);
}

// запрос на сохранение данных профиля
function saveProfileDataQuery(nameInputValue, aboutInputValue) {
  return fetch(`${connectionConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: connectionConfig.headers,
    body: JSON.stringify({
      name: nameInputValue,
      about: aboutInputValue,
    }),
  }).then(getResponseData);
}

// запрос на обновление аватара
function updateAvatarQuery(avatarSrc) {
  return fetch(`${connectionConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: connectionConfig.headers,
    body: JSON.stringify({
      avatar: avatarSrc,
    }),
  }).then(getResponseData);
}

export {
  getProfileDataQuery,
  getInitialCardsQuery,
  addNewCardQuery,
  deleteCardQuery,
  setLikeQuery,
  deleteLikeQuery,
  saveProfileDataQuery,
  updateAvatarQuery,
};
