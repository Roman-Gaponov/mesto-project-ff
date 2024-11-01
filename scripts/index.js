/* ИМПОРТ */

import {addCard, addNewCard} from "./cards.js";
import {openModal, closeModal} from "./modal.js";

/* НАСТРОЙКИ */



/* ЭЛЕМЕНТЫ СТРАНИЦЫ */

const bodyPage = document.querySelector(".page");
const mainContent = document.querySelector(".content");
const popups = document.querySelectorAll(".popup");

// контейнер для карт
const cardContainer = mainContent.querySelector(".places__list");

//кнопки вызова попапов
const buttonOpenProfileEdit = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

// попап редактирования профиля
const popupProfileEdit = document.querySelector(".popup_type_edit");
const formProfileEdit = document.forms["edit-profile"];
// const formProfileEdit = document.forms;
// console.log(formProfileEdit);
const nameInput = popupProfileEdit.querySelector("input[name='name']");
const jobInput = popupProfileEdit.querySelector("input[name='description']");
const buttonSaveEdit = popupProfileEdit.querySelector(".popup__button");

// попап создания новой карточки
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = document.forms["new-place"];
const placeInput = popupNewCard.querySelector("input[name='place-name']");
const srcImageInput =  popupNewCard.querySelector("input[name='link']");
const buttonSaveNewCard = popupNewCard.querySelector(".popup__button");

// попап просмотра избражения выбранной карточки
export const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption =  popupTypeImage.querySelector(".popup__caption");

const popupCloseButtons = bodyPage.querySelectorAll(".popup__close");

/* ВЫЗОВЫ ФУНКЦИЙ */

addCard(cardContainer);


/* ОБРАБОТЧИКИ СОБЫТИЙ */

function handleFormProfileEditSubmit(evt) {
  evt.preventDefault();
  mainContent.querySelector(".profile__title").textContent = nameInput.value;
  mainContent.querySelector(".profile__description").textContent = jobInput.value;
  closeModal();
  evt.target.reset();
}

function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  addNewCard(cardContainer, placeInput.value, srcImageInput.value)
  closeModal();
  evt.target.reset();
}

// function closeFormHandler(evt) {
//   if ([...popupCloseButtons].includes(evt.target) && ![...document.forms].includes(evt.target)) {
//     toggleFormVisibility(evt);
//   }
// }


// function showForm(evt) {
//   popupProfileEdit.classList.add("popup_is-opened");
// }

// function toggleFormVisibility(evt) {
//   console.log(evt.target);
//   // console.log();
//   if ((evt.target === buttonOpenProfileEdit) || (evt.target === formProfileEdit))  {
//     popupProfileEdit.classList.toggle("popup_is-opened");
//   } 

//    if ([...popupCloseButtons].includes(evt.target) && ![...document.forms].includes(evt.target)) {
//     popupProfileEdit.classList.toggle("popup_is-opened");
//    }
// }




// function toggleModalVisibility(popup) {
//   popup.classList.toggle("popup_is-opened");
// }

// function openFormHandler(evt) {
//   if (evt.target === buttonOpenProfileEdit) {
//     openForm(popupProfileEdit);
//   }
// }

// function openModalHandler(evt) {
//   switch (evt.target) {
//     case(buttonOpenProfileEdit): 
//       openModal(popupProfileEdit);
//       break;
//     case(buttonAddCard): 
//       openModal(popupNewCard);
//   }
// }

// function closeModalHandler(evt) {
  // if ([popupProfileEdit, popupNewCard].every((value) => !value.classList.contains("popup_is-opened"))) {
  //   return;
  // };
  
  // console.log(evt.target);
  // if ([...popupCloseButtons].includes(evt.target)) {
  //   closeModal(popupProfileEdit);
  //   closeModal(popupNewCard);
  // }
  // if (![...document.forms].includes(evt.target)) {
  //   closeForm(popupProfileEdit);
  //   closeForm(popupNewCard);
  // }
  // if ([...popupCloseButtons].includes(evt.target) && ![...document.forms].includes(evt.target)) {
  //   popupProfileEdit.classList.remove("popup_is-opened");
  // }
// }

// function alternativeCloseForm(evt) {
//   if (!evt.target.classList.contains("popup_is-opened")) {
//     closeModal();
//   }
// }




buttonOpenProfileEdit.addEventListener("click", () => openModal(popupProfileEdit));
buttonAddCard.addEventListener("click", () => openModal(popupNewCard));

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfileEdit.addEventListener("submit", handleFormProfileEditSubmit); 

formNewCard.addEventListener("submit", handleFormNewCardSubmit); 



// bodyPage.addEventListener('click',  alternativeCloseForm);







// cardContainer.addEventListener("click", openPopupTypeImage);

// function  openPopupTypeImage(evt) {
//   if (evt.target.classList.contains("card__image")) {
//     openModal(popupTypeImage);

//   }

//   if (evt.target.classList.contains("card__like-button")) {
//     setLike(evt);
//   }
// }

function addEventListenersForCloseModal(popup) {
  const crossToClose = popup.querySelector(".popup__close");
  crossToClose.addEventListener("click", () => closeModal());
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal();
    }
  });
}

addEventListenersForCloseModal(popupProfileEdit);
addEventListenersForCloseModal(popupNewCard);
addEventListenersForCloseModal(popupTypeImage);