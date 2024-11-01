function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("keydown", handleEscKeyUp);
}

function closeModal() {
  const popupToClose = document.querySelector(".popup_is-opened");
  if (popupToClose) {
    popupToClose.classList.remove("popup_is-opened");
    popupToClose.removeEventListener("keydown", handleEscKeyUp);
  }
}

function handleEscKeyUp(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}

export { openModal, closeModal };
