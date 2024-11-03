/* ИМПОРТ */

import "../pages/index.css"; // импорт главного файла стилей

import { createCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";

/* ЭЛЕМЕНТЫ СТРАНИЦЫ */

const mainContent = document.querySelector(".content");

// контейнер для карт
const cardContainer = mainContent.querySelector(".places__list");

// элементы профиля
const profileTitle = mainContent.querySelector(".profile__title");
const profileDescription = mainContent.querySelector(".profile__description");

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

addCard(cardContainer, "set", enlargeCardImage);

/* ОБРАБОТЧИКИ СОБЫТИЙ */

// вызов попапа редактирования профиля
buttonOpenProfileEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupProfileEdit);
});

// вызов попапа добавления новой карточки
buttonAddCard.addEventListener("click", () => openModal(popupNewCard));

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
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupProfileEdit);
  evt.target.reset();
}

// функция обрабатывает сабмит формы добавления новой карточки
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  addCard(
    cardContainer,
    "single",
    enlargeCardImage,
    placeInput.value,
    srcImageInput.value
  );
  closeModal(popupNewCard);
  evt.target.reset();
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
  enlargeCardImage,
  nameNewCard = "",
  linkNewCard = ""
) {
  switch (typeToAdd) {
    case "set": {
      initialCards.forEach((item) => {
        const cardElement = createCard(item, enlargeCardImage);
        cardContainer.append(cardElement);
      });
      break;
    }
    case "single": {
      const initialNewCard = { name: nameNewCard, link: linkNewCard };
      const cardElement = createCard(initialNewCard, enlargeCardImage);
      cardContainer.prepend(cardElement);
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
