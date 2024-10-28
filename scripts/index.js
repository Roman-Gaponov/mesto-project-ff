// темплейт карточки
function createCardExample() {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardExample = cardTemplate.querySelector(".card").cloneNode(true);

  return cardExample;
}

// DOM узлы
const cardContainer = document.querySelector(".places__list");

// функция создания карточки
function addCard(initialCardValues, deleteCard) {
  // создаём экземпляр карточки
  const cardExample = createCardExample();
  // добавляем название карточки
  cardExample.querySelector(".card__title").textContent = initialCardValues.name;
  // добавляем ссылку на картинку
  cardExample.querySelector(".card__image").src = initialCardValues.link;
  // добавляем описание картинки в атрибут alt
  cardExample.querySelector(".card__image").alt = initialCardValues.name;
  // добавляем к кнопке удаления обработчик события, с коллбэком, получаемым в качестве параметра
  cardExample
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  cardContainer.append(cardExample);
}

// функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

// выводим карточки на страницу
initialCards.forEach((item) => {
  addCard(item, deleteCard);
});
