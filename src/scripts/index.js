import '../pages/index.css'; // добавьте импорт главного файла стилей 
import { enableValidation } from './validation';
import { renderCards, createCard } from './cards';
import { openModal, closeModal, closeModalByOverlay } from './modal';
import { loadCardsFromServer, loadUser, addNewCard, editProfile } from './api';

const placesList = document.querySelector(".places__list");

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const listPopups = [imagePopup, profilePopup, cardPopup];

const profilePopupButton = document.querySelector(".profile__edit-button");
const cardPopupButton = document.querySelector(".profile__add-button");

const listCloseButtons = document.querySelectorAll(".popup__close");

const inputName = profilePopup.querySelector(".popup__input_type_name");
const inputDescription = profilePopup.querySelector(".popup__input_type_description");

const profileFormElement = document.querySelector(".popup__form[name='edit-profile']");
const inputCardName = cardPopup.querySelector(".popup__input_type_card-name");
const inputUrl = cardPopup.querySelector(".popup__input_type_url");

const newCardFormElement = document.querySelector(".popup__form[name='new-place']");

// Создание объекта с настройками валидации
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const cardSettings = {
    cardImage: '.card__image',
    cardTitle: '.card__title',
    cardLikeButton: '.card__like-button',
    cardLikeButtonActive: 'card__like-button_is-active',
    cardDeleteButton: '.card__delete-button',
    card: '.card'
}

const openEditPopup = () => {
    inputName.value = document.querySelector(".profile__title").textContent;
    inputDescription.value = document.querySelector(".profile__description").textContent;
    openModal(profilePopup);
}

export const openImageModal = (src, caption) => {
    document.querySelector(".popup__image").src = src
    document.querySelector(".popup__caption").textContent = caption
    openModal(imagePopup)
}

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    editProfile(inputName.value, inputDescription.value)
    closeModal(profilePopup);
}

const handleNewCardFormSubmit = (evt) => {
    evt.preventDefault();
    addNewCard(inputCardName.value, inputUrl.value)
    closeModal(cardPopup);
}

// Инициализация событий
renderCards(placesList, cardSettings);

enableValidation(validationSettings);

profilePopupButton.addEventListener("click", openEditPopup);

cardPopupButton.addEventListener("click", () => openModal(cardPopup));

listCloseButtons.forEach(button => {
    button.addEventListener("click", () => {
        const popup = button.closest(".popup");
        closeModal(popup);
    });
});

listPopups.forEach(popup => {
    popup.classList.add("popup_is-animated")
    popup.addEventListener("click", closeModalByOverlay)
})

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
newCardFormElement.addEventListener('submit', handleNewCardFormSubmit);

loadCardsFromServer(placesList, cardSettings)
loadUser()
