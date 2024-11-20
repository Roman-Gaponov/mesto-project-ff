/* ИМПОРТ */

import "../pages/index.css"; // импорт главного файла стилей

import { createCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getProfileAndCards,
  saveProfileData,
  updateAvatar,
  postCard,
  toggleLikeQuery,
  deleteCard,
} from "./api.js";

/* НАСТРОЙКИ */

// настройки валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// настройки профиля
const profileConfig = {
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
};

/* ЭЛЕМЕНТЫ СТРАНИЦЫ */

const mainContent = document.querySelector(".content");

// контейнер для карт
const cardContainer = mainContent.querySelector(".places__list");

// элементы профиля
const profileTitle = mainContent.querySelector(".profile__title");
const profileDescription = mainContent.querySelector(".profile__description");
const profileImage = mainContent.querySelector(".profile__image");

//кнопки вызова попапов
const buttonOpenProfileEdit = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

// попап редактирования профиля
const popupProfileEdit = document.querySelector(".popup_type_edit");
const formProfileEdit = document.forms["edit-profile"];
const nameInput = popupProfileEdit.querySelector("input[name='name']");
const jobInput = popupProfileEdit.querySelector("input[name='description']");

// попап обновления аватара
const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar");
const formUpdateAvatar = document.forms["update-avatar"];
const srcAvatarInput = popupUpdateAvatar.querySelector(
  "input[name='avatar-link']"
);

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

// активация валидации форм
enableValidation(validationConfig);

// добавление карточек, полученных от сервера
addCard(
  cardContainer,
  "get",
  toggleLikeQuery,
  enlargeCardImage,
  deleteCard,
  profileConfig
);

/* ОБРАБОТЧИКИ СОБЫТИЙ */

// вызов попапа редактирования профиля
buttonOpenProfileEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupProfileEdit, validationConfig);
  openModal(popupProfileEdit);
});

// вызов попапа добавления новой карточки
buttonAddCard.addEventListener("click", () => {
  clearValidation(popupNewCard, validationConfig);
  formNewCard.reset();
  openModal(popupNewCard);
});

// вызов попапа обновления аватара
profileImage.addEventListener("click", () => {
  clearValidation(popupUpdateAvatar, validationConfig);
  formUpdateAvatar.reset();
  openModal(popupUpdateAvatar);
});

// прикрепляем обработчики сабмитов к формам:
formProfileEdit.addEventListener("submit", handleFormProfileEditSubmit);
formNewCard.addEventListener("submit", handleFormNewCardSubmit);
formUpdateAvatar.addEventListener("submit", handleFormUpdateAvatarSubmit);

// вешаем обработчики закрытия на все попапы
addEventListenersForCloseModal(popupProfileEdit);
addEventListenersForCloseModal(popupNewCard);
addEventListenersForCloseModal(popupTypeImage);
addEventListenersForCloseModal(popupUpdateAvatar);

/* ФУНКЦИИ ОБРАБОТЧИКОВ СОБЫТИЙ */

// функция обрабатывает сабмит формы редактирования профиля
function handleFormProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  waitSubmitForm(evt.target, "start");
  saveProfileData({
    name: nameInput.value,
    about: jobInput.value,
  });
  closeModal(popupProfileEdit);
  waitSubmitForm(evt.target, "end");
  evt.target.reset();
}

// функция обрабатывает сабмит формы добавления новой карточки
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  waitSubmitForm(evt.target, "start");
  addCard(
    cardContainer,
    "post",
    toggleLikeQuery,
    enlargeCardImage,
    deleteCard,
    profileConfig,
    placeInput.value,
    srcImageInput.value
  );
  closeModal(popupNewCard);
  waitSubmitForm(evt.target, "end");
  evt.target.reset();
}

// функция обрабатывает сабмит формы редактирования профиля
function handleFormUpdateAvatarSubmit(evt) {
  evt.preventDefault();
  waitSubmitForm(evt.target, "start");
  updateAvatar(srcAvatarInput.value, profileImage);
  closeModal(popupUpdateAvatar);
  waitSubmitForm(evt.target, "end");
  evt.target.reset();
}

function waitSubmitForm(form, waitingPosition) {
  const submitButton = form.querySelector(".popup__button");
  switch (waitingPosition) {
    case "start": {
      submitButton.textContent += "...";
      break;
    }
    case "end": {
      submitButton.textContent = submitButton.textContent.replace("...", "");
    }
  }
}

// функция вешает обработчики закрытия попапов
function addEventListenersForCloseModal(popup) {
  const crossToClose = popup.querySelector(".popup__close");
  crossToClose.addEventListener("click", () => closeModal(popup));
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
}

// универсальная функция вывода набора карточек на страницу
// и добавления новой пользовательской карточки
function addCard(
  cardContainer,
  typeToAdd,
  toggleLikeQuery,
  enlargeCardImage,
  deleteCard,
  profileConfig = "",
  nameNewCard = "",
  linkNewCard = ""
) {
  switch (typeToAdd) {
    case "get": {
      getProfileAndCards(
        profileConfig,
        cardContainer,
        createCard,
        toggleLikeQuery,
        enlargeCardImage,
        deleteCard,
      );
      break;
    }
    case "post": {
      const newCardData = { name: nameNewCard, link: linkNewCard };
      postCard(
        newCardData,
        cardContainer,
        createCard,
        toggleLikeQuery,
        enlargeCardImage,
        deleteCard,
      );
    }
  }
}

// функция открытия увеличенного просмотра изображения выбранной карточки
// она передаётся в качестве параметра функции добавления карточки
function enlargeCardImage(placeName, placeLink) {
  popupImage.src = placeLink;
  popupCaption.textContent = placeName;
  popupImage.alt = placeName;
  openModal(popupTypeImage);
}
