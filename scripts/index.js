// темплейт карточки
function createCardExample() {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardExample = cardTemplate.querySelector(".card").cloneNode(true);

  return cardExample;
}

// DOM узлы
const cardContainer = document.querySelector(".places__list");

// функция создания карточки
function createCard(initialCardValues, deleteCard) {
  // создаём экземпляр карточки
  const cardExample = createCardExample();

  // записываем название карточки и изображение к ней в отдельные переменные
  const cardTitle = cardExample.querySelector(".card__title");
  const cardImage = cardExample.querySelector(".card__image");

  // добавляем название карточки
  cardTitle.textContent = initialCardValues.name;
  // добавляем ссылку на изображение
  cardImage.src = initialCardValues.link;
  // добавляем описание изображения в атрибут alt
  cardImage.alt = initialCardValues.name;
  // добавляем к кнопке удаления обработчик события, с коллбэком, получаемым в качестве параметра
  cardExample
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  return cardExample;
}

// функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

// выводим карточки на страницу
initialCards.forEach((item) => {
  const cardElement = createCard(item, deleteCard);
  cardContainer.append(cardElement);
});
