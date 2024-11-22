/* ИМПОРТ */

import "../pages/index.css"; // импорт главного файла стилей

import { createCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getProfileDataQuery,
  getInitialCardsQuery,
  addNewCardQuery,
  saveProfileDataQuery,
  updateAvatarQuery,
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
const aboutInput = popupProfileEdit.querySelector("input[name='description']");

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
const popupImageCaption = popupTypeImage.querySelector(".popup__caption");

/* ВЫЗОВЫ ФУНКЦИЙ */

// активация валидации форм
enableValidation(validationConfig);

// получение от сервера и обработка данных профиля и карточек
Promise.all([getProfileDataQuery(), getInitialCardsQuery()])
  .then(([profileData, cardsArrayData]) => {
    const userId = profileData._id;

    document.querySelector(profileConfig.nameSelector).textContent =
      profileData.name;
    document.querySelector(profileConfig.descriptionSelector).textContent =
      profileData.about;
    document.querySelector(
      profileConfig.avatarSelector
    ).style.backgroundImage = `url(${profileData.avatar})`;

    cardsArrayData.forEach((cardData) => {
      const cardElement = createCard(cardData, userId, enlargeCardImage);
      cardContainer.append(cardElement);
    });
    console.log("Данные профиля и карточек успешно загружены с сервера");
  })
  .catch(([err1, err2]) => {
    console.log(err1);
    console.log(err2);
  });

/* ОБРАБОТЧИКИ СОБЫТИЙ */

// вызов попапа редактирования профиля
buttonOpenProfileEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileDescription.textContent;
  clearValidation(popupProfileEdit, validationConfig);
  openModal(popupProfileEdit);
});

// вызов попапа добавления новой карточки
buttonAddCard.addEventListener("click", () => {
  formNewCard.reset();
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
});

// вызов попапа обновления аватара
profileImage.addEventListener("click", () => {
  formUpdateAvatar.reset();
  clearValidation(popupUpdateAvatar, validationConfig);
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
  waitSubmitForm(evt.target, "start");

  saveProfileDataQuery(nameInput.value, aboutInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupProfileEdit);
      evt.target.reset();
      console.log("Данные профиля успешно сохранены");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      waitSubmitForm(evt.target, "end");
    });
}

// функция обрабатывает сабмит формы добавления новой карточки
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  waitSubmitForm(evt.target, "start");

  addNewCardQuery(placeInput.value, srcImageInput.value)
    .then((resultCardData) => {
      const userId = resultCardData.owner._id;

      const cardElement = createCard(resultCardData, userId, enlargeCardImage);
      cardContainer.prepend(cardElement);
      closeModal(popupNewCard);
      evt.target.reset();
      console.log("Карточка успешно добавлена");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      waitSubmitForm(evt.target, "end");
    });
}

// функция обрабатывает сабмит формы редактирования профиля
function handleFormUpdateAvatarSubmit(evt) {
  evt.preventDefault();
  waitSubmitForm(evt.target, "start");

  updateAvatarQuery(srcAvatarInput.value)
    .then((resultData) => {
      profileImage.style.backgroundImage = `url(${resultData.avatar})`;
      closeModal(popupUpdateAvatar);
      evt.target.reset();
      console.log("Аватар успешно добавлен");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      waitSubmitForm(evt.target, "end");
    });
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

// функция открытия увеличенного просмотра изображения выбранной карточки
// она передаётся в качестве параметра функции добавления карточки
function enlargeCardImage(placeName, placeLink) {
  popupImage.src = placeLink;
  popupImageCaption.textContent = placeName;
  popupImage.alt = placeName;
  openModal(popupTypeImage);
}
