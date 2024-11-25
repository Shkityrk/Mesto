const listPopups = document.querySelectorAll(".popup")
const listPopupButtons = document.querySelectorAll(".popup__button_func_open")
const listCloseButtons = document.querySelectorAll(".popup__close")

// @todo: Темплейт карточки
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

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

listPopupButtons.forEach((item, index) => {
    item.addEventListener("click", function(e){
        openModal(listPopups[index])
    })
})

listCloseButtons.forEach((item, index) => {
    item.addEventListener("click", function(e){
        closeModal(listPopups[index])
    })
})

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки