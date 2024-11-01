/* ИМПОРТ */

import { addCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";

/* НАСТРОЙКИ */

export let cssClassToOpenModal = "popup_is-opened";

/* ЭЛЕМЕНТЫ СТРАНИЦЫ */

const mainContent = document.querySelector(".content");

// контейнер для карт
const cardContainer = mainContent.querySelector(".places__list");

//кнопки вызова попапов
const buttonOpenProfileEdit = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

// попап редактирования профиля
const popupProfileEdit = document.querySelector(".popup_type_edit");
const formProfileEdit = document.forms["edit-profile"];
const nameInput = popupProfileEdit.querySelector("input[name='name']");
const jobInput = popupProfileEdit.querySelector("input[name='description']");

// попап создания новой карточки
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = document.forms["new-place"];
const placeInput = popupNewCard.querySelector("input[name='place-name']");
const srcImageInput = popupNewCard.querySelector("input[name='link']");

// попап просмотра избражения выбранной карточки
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

/* ВЫЗОВЫ ФУНКЦИЙ */

addCard(cardContainer, "set");

/* ОБРАБОТЧИКИ СОБЫТИЙ */

// вызов попапа редактирования профиля
buttonOpenProfileEdit.addEventListener("click", () => {
  nameInput.value = mainContent.querySelector(".profile__title").textContent;
  jobInput.value = mainContent.querySelector(
    ".profile__description"
  ).textContent;
  openModal(popupProfileEdit, cssClassToOpenModal);
});

// вызов попапа добавления новой карточки
buttonAddCard.addEventListener("click", () =>
  openModal(popupNewCard, cssClassToOpenModal)
);

// прикрепляем обработчики сабмитов к формам:
formProfileEdit.addEventListener("submit", handleFormProfileEditSubmit);
formNewCard.addEventListener("submit", handleFormNewCardSubmit);

// вешаем обработчики закрытия на все попапы
addEventListenersForCloseModal(popupProfileEdit);
addEventListenersForCloseModal(popupNewCard);
addEventListenersForCloseModal(popupTypeImage);

/* ФУНКЦИИ ОБРАБОТЧИКОВ СОБЫТИЙ */

// функция обрабатывает сабмит формы редактирования профиля
function handleFormProfileEditSubmit(evt) {
  evt.preventDefault();
  mainContent.querySelector(".profile__title").textContent = nameInput.value;
  mainContent.querySelector(".profile__description").textContent =
    jobInput.value;
  closeModal(cssClassToOpenModal);
  evt.target.reset();
}

// функция обрабатывает сабмит формы добавления новой карточки
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  addCard(cardContainer, "single", placeInput.value, srcImageInput.value);
  closeModal(cssClassToOpenModal);
  evt.target.reset();
}

// функция вешает обработчики закрытия попапов
function addEventListenersForCloseModal(popup) {
  const crossToClose = popup.querySelector(".popup__close");
  crossToClose.addEventListener("click", () => closeModal(cssClassToOpenModal));
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(cssClassToOpenModal);
    }
  });
}
