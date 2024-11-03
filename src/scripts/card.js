/* ФУНКЦИИ ДЛЯ СОЗДАНИЯ КАРТОЧКИ */

// темплейт карточки
function createCardExample() {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardExample = cardTemplate.querySelector(".card").cloneNode(true);

  return cardExample;
}

// функция создания карточки
function createCard(initialCardValues, enlargeCardImage) {
  // создаём экземпляр карточки
  const cardExample = createCardExample();

  // записываем название карточки и изображение к ней в отдельные переменные
  const cardTitle = cardExample.querySelector(".card__title");
  const cardImage = cardExample.querySelector(".card__image");

  const placeName = initialCardValues.name;
  const placeLink = initialCardValues.link;

  // добавляем название карточки
  cardTitle.textContent = placeName;
  // добавляем ссылку на изображение
  cardImage.src = placeLink;
  // добавляем описание изображения в атрибут alt
  cardImage.alt = placeName;
  // добавляем к кнопке удаления обработчик события, с коллбэком, получаемым в качестве параметра
  cardExample
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  // добавляем к кнопке лайка обработчик события, с коллбэком, получаемым в качестве параметра
  cardExample
    .querySelector(".card__like-button")
    .addEventListener("click", setLike);

  cardImage.addEventListener("click", () =>
    enlargeCardImage(placeName, placeLink)
  );

  return cardExample;
}

// функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

// функция установки/снятия лайка
function setLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard };
