/* ФУНКЦИИ ДЛЯ СОЗДАНИЯ КАРТОЧКИ */

// темплейт карточки
function createCardExample() {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardExample = cardTemplate.querySelector(".card").cloneNode(true);

  return cardExample;
}

// функция создания карточки
function createCard(
  cardData,
  userId,
  toggleLikeQuery,
  enlargeCardImage,
  deleteCard
) {
  // создаём экземпляр карточки
  const cardExample = createCardExample();

  // записываем название карточки и изображение к ней в отдельные переменные
  const cardTitle = cardExample.querySelector(".card__title");
  const cardImage = cardExample.querySelector(".card__image");
  const deleteButton = cardExample.querySelector(".card__delete-button");
  const likeButton = cardExample.querySelector(".card__like-button");
  const likesCounter = cardExample.querySelector(".card__like-amount");

  // записываем в переменные данные по карточке,
  // полученные от сервера
  const placeName = cardData.name;
  const placeLink = cardData.link;
  const cardId = cardData._id;
  const ownerId = cardData.owner._id;

  // получаем количество лайков
  const placeLikes = cardData.likes;
  const amountLikes = placeLikes.length;

  // добавляем название карточки
  cardTitle.textContent = placeName;
  // добавляем ссылку на изображение
  cardImage.src = placeLink;
  // добавляем описание изображения в атрибут alt
  cardImage.alt = placeName;

  // добавляем к кнопке удаления обработчик события
  if (ownerId === userId) {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardId, cardExample);
    });
  } else {
    deleteButton.remove();
  }

  // добавляем к кнопке лайка обработчик события
  likeButton.addEventListener("click", (evt) =>
    setLike(evt, cardId, likesCounter, toggleLikeQuery)
  );

  // добавляем обработчик события увеличения изображения карточки
  cardImage.addEventListener("click", () =>
    enlargeCardImage(placeName, placeLink)
  );

  // проверка наличия лайка, поставленного ранее
  const isLiked = placeLikes.some((like) => like._id === userId);

  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // устанавливаем количество лайков
  if (amountLikes) {
    likesCounter.textContent = amountLikes;
  } else {
    likesCounter.textContent = 0;
  }

  return cardExample;
}

// функция проверяющая наличие поставленного лайка у карточки
function hadLiked(target) {
  if (target.classList.contains("card__like-button_is-active")) {
    return true;
  }
  return false;
}

// функция установки/снятия лайка
function setLike(evt, cardId, likesCounter, toggleLikeQuery) {
  toggleLikeQuery(cardId, evt.target, likesCounter, hadLiked(evt.target));
}

export { createCard };
