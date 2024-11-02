/* ИМПОРТ */

import { cssClassToOpenModal } from "./index.js";
import { initialCards } from "./cards.js";
import { openModal } from "./modal.js";

/* ФУНКЦИИ ДЛЯ СОЗДАНИЯ КАРТОЧКИ */

// темплейт карточки
function createCardExample() {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardExample = cardTemplate.querySelector(".card").cloneNode(true);

  return cardExample;
}

// функция создания карточки
function createCard(initialCardValues, setLike, deleteCard) {
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

  const popupTypeImage = document.querySelector(".popup_type_image");
  cardImage.addEventListener("click", () =>
    popupCardImage(popupTypeImage, placeName, placeLink)
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

// универсальная функция вывода набора карточек на страницу
// и добавления новой пользовательской карточки
function addCard(cardContainer, typeToAdd, nameNewCard = "", linkNewCard = "") {
  switch (typeToAdd) {
    case "set": {
      initialCards.forEach((item) => {
        const cardElement = createCard(item, setLike, deleteCard);
        cardContainer.append(cardElement);
      });
      break;
    }
    case "single": {
      const initialNewCard = { name: nameNewCard, link: linkNewCard };
      const cardElement = createCard(initialNewCard, setLike, deleteCard);
      cardContainer.prepend(cardElement);
    }
  }
}

// функция открытия попапа просмотра изображения выбранной карточки
function popupCardImage(popup, name, link) {
  popup.querySelector(".popup__image").src = link;
  popup.querySelector(".popup__caption").textContent = name;
  openModal(popup, cssClassToOpenModal);
}

export { addCard };
