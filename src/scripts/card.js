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

  const placeName = cardData.name;
  const placeLink = cardData.link;
  const cardId = cardData._id;
  const ownerId = cardData.owner._id;

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
    // deleteButton.addEventListener("click", deleteCard);
    deleteButton.addEventListener("click", () =>
      deleteCard(cardId, cardExample)
    );
  } else {
    deleteButton.remove();
  }

  // ownerId !== userId && deleteButton.remove();

  // добавляем к кнопке лайка обработчик события
  likeButton.addEventListener("click", (evt) =>
    setLike(evt, cardId, likesCounter, toggleLikeQuery)
  );

  cardImage.addEventListener("click", () =>
    enlargeCardImage(placeName, placeLink)
  );

  // console.log(placeLikes);
  // console.log(userId);
  const isLiked = placeLikes.some((like) => like._id === userId);
  // console.log(isLiked);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (amountLikes) {
    likesCounter.textContent = amountLikes;
  } else {
    likesCounter.textContent = 0;
  }

  return cardExample;
}

// функция удаления карточки
// function deleteCard(evt) {
//   evt.target.closest(".card").remove();
// }

function hadLiked(target) {
  if (target.classList.contains("card__like-button_is-active")) {
    return true;
  }
  return false;
}

// функция установки/снятия лайка
function setLike(evt, cardId, likesCounter, toggleLikeQuery) {
  // evt.target.classList.toggle("card__like-button_is-active");

  toggleLikeQuery(cardId, evt.target, likesCounter, hadLiked(evt.target));
}

export { createCard };
