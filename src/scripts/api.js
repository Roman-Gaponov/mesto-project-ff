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

// функция, которая включает весь необходимый набор запросов на сервер
function fetchData(connectionConfig, src = "", method = "GET", body = {}) {
  switch (method) {
    case "GET": {
      return fetch(`${connectionConfig.baseUrl}/${src}`, {
        headers: connectionConfig.headers,
      });
    }
    case "POST": {
      return fetch(`${connectionConfig.baseUrl}/${src}`, {
        method: method,
        headers: connectionConfig.headers,
        body: JSON.stringify(body),
      });
    }
    case "PATCH": {
      return fetch(`${connectionConfig.baseUrl}/${src}`, {
        method: method,
        headers: connectionConfig.headers,
        body: JSON.stringify(body),
      });
    }
    case "PUT": {
      return fetch(`${connectionConfig.baseUrl}/${src}`, {
        method: method,
        headers: connectionConfig.headers,
      });
    }
    case "DELETE": {
      return fetch(`${connectionConfig.baseUrl}/${src}`, {
        method: method,
        headers: connectionConfig.headers,
      });
    }
  }
}

// функция получающая данные профиля и карточек от сервера
function getProfileAndCards(
  profileConfig,
  cardContainer,
  createCard,
  toggleLikeQuery,
  enlargeCardImage,
  deleteCard
) {
  const srcProfile = "users/me";
  const srcCards = "cards";
  Promise.all([
    fetchData(connectionConfig, srcProfile),
    fetchData(connectionConfig, srcCards),
  ])
    .then((resultArray) => {
      if (resultArray.every((result) => result.ok)) {
        console.log("Данные профиля и карточек успешно загружены с сервера");
        return Promise.all(resultArray.map((result) => result.json()));
      }
      return Promise.reject(resultArray.map((result) => result.status));
    })
    .then((resultArrayData) => {
      const profileData = resultArrayData[0];
      const cardsArrayData = resultArrayData[1];

      const userId = profileData._id;

      document.querySelector(profileConfig.nameSelector).textContent =
        profileData.name;
      document.querySelector(profileConfig.descriptionSelector).textContent =
        profileData.about;
      document.querySelector(
        profileConfig.avatarSelector
      ).style.backgroundImage = `url(${profileData.avatar})`;

      cardsArrayData.forEach((cardData) => {
        const cardElement = createCard(
          cardData,
          userId,
          toggleLikeQuery,
          enlargeCardImage,
          deleteCard
        );
        cardContainer.append(cardElement);
      });
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// функция сохранения профиля
function saveProfileData(profileData) {
  const src = "users/me";
  const body = {
    name: profileData.name,
    about: profileData.about,
  };
  fetchData(connectionConfig, src, "PATCH", body)
    .then((result) => {
      if (result.ok) {
        console("Данные профиля успешно сохранены");
      }
      return Promise.reject(result.status);
    })
    .then((resultData) => {
      console.log(resultData);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// функция добавляющая карточку на страницу
// и сохраняющая данные по карточке на сервере
function postCard(
  newCardData,
  cardContainer,
  createCard,
  toggleLikeQuery,
  enlargeCardImage,
  deleteCard
) {
  const src = "cards";
  const body = {
    name: newCardData.name,
    link: newCardData.link,
  };
  fetchData(connectionConfig, src, "POST", body)
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(result.status);
    })
    .then((resultCardData) => {
      const userId = resultCardData.owner._id;

      const cardElement = createCard(
        resultCardData,
        userId,
        toggleLikeQuery,
        enlargeCardImage,
        deleteCard
      );
      cardContainer.prepend(cardElement);
      console.log("Карточка успешно добавлена");
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// функция запроса на снятие/установку лайка
function toggleLikeQuery(cardId, likeButton, likesCounter, isLiked) {
  const src = "cards/likes/" + cardId;
  if (!isLiked) {
    fetchData(connectionConfig, src, "PUT")
      .then((result) => {
        if (result.ok) {
          console.log("Лайк успешно поставлен");
          return result.json();
        }
        return Promise.reject(result.status);
      })
      .then((resultData) => {
        likesCounter.textContent = resultData.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  } else {
    fetchData(connectionConfig, src, "DELETE")
      .then((result) => {
        if (result.ok) {
          likeButton.classList.remove("card__like-button_is-active");
          let amountLikes = Number(likesCounter.textContent);
          amountLikes -= 1;
          likesCounter.textContent = String(amountLikes);
          console.log("Лайк успешно удалён");
          return;
        }
        return Promise.reject(result.status);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}

// функция удаления карточки
function deleteCard(cardId, cardExample) {
  const src = "cards/" + cardId;
  fetchData(connectionConfig, src, "DELETE")
    .then((result) => {
      if (result.ok) {
        cardExample.remove();
        console.log("Карточка успешно удалена");
        return;
      }
      return Promise.reject(result.status);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// функция обновления аватара
function updateAvatar(avatarSrc, profileImage) {
  const src = "users/me/avatar";
  const body = {
    avatar: avatarSrc,
  };
  fetchData(connectionConfig, src, "PATCH", body)
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(result.status);
    })
    .then((resultData) => {
      console.log(resultData.avatar);
      profileImage.style.backgroundImage = `url(${resultData.avatar})`;
      console.log("Аватар успешно добавлен");
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

export {
  getProfileAndCards,
  saveProfileData,
  updateAvatar,
  postCard,
  toggleLikeQuery,
  deleteCard,
};
