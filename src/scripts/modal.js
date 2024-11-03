/* НАСТРОЙКИ */

const cssClassToOpenModal = "popup_is-opened";

/* ФУНКЦИИ ДЛЯ РАБОТЫ С ПОПАПАМИ */

//  функция открывает попап
// принимает в качестве аргрументов сам попап и
// имя класса, который нужно добавить для его открытия
function openModal(popupToOpen) {
  popupToOpen.classList.add(cssClassToOpenModal);
  popupToOpen.addEventListener("keydown", handleEscKeyUp);
}

//  функция закрывает попап
// принимает в качестве аргрументов сам попап и
// имя класса, который нужно удалить для его закрытия
function closeModal(popupToClose) {
  popupToClose.classList.remove(cssClassToOpenModal);
  popupToClose.removeEventListener("keydown", handleEscKeyUp);
}

// функция для обработки закрытия попапа по нажатию Esc
function handleEscKeyUp(evt) {
  if (evt.key === "Escape") {
    const popupToClose = document.querySelector("." + cssClassToOpenModal);
    closeModal(popupToClose);
  }
}

export { openModal, closeModal };
