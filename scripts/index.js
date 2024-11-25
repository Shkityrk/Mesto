function createCard(name, link){
    const cardTemplate = document.querySelector("#card-template").content
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true)
    cardElement.querySelector('.card__title').textContent = name
    cardElement.querySelector('.card__image').src = link
    return cardElement
}
function renderCards(){
    const placesList = document.querySelector(".places__list")
    initialCards.forEach(element => {
        placesList.append(createCard(element.name, element.link))
    })
}
renderCards();

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
