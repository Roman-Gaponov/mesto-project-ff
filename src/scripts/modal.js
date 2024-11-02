/* ИМПОРТ */

import { cssClassToOpenModal } from "./index.js";

/* ФУНКЦИИ ДЛЯ РАБОТЫ С ПОПАПАМИ */

//  функция открывает попап
// принимает в качестве аргрументов сам попап и
// имя класса, который нужно добавить для его открытия
function openModal(popup, cssClassToOpenModal) {
  popup.classList.add(cssClassToOpenModal);
  popup.addEventListener("keydown", handleEscKeyUp);
}

//  функция закрывает попап
// принимает в качестве аргрументов сам попап и
// имя класса, который нужно удалить для его закрытия
function closeModal(cssClassToOpenModal) {
  const popupToClose = document.querySelector("." + cssClassToOpenModal);
  if (popupToClose) {
    popupToClose.classList.remove(cssClassToOpenModal);
    popupToClose.removeEventListener("keydown", handleEscKeyUp);
  }
}

// функция для обработки закрытия попапа по нажатию Esc
function handleEscKeyUp(evt) {
  if (evt.key === "Escape") {
    closeModal(cssClassToOpenModal);
  }
}

export { openModal, closeModal };
