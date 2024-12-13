import '../pages/index.css'; // добавьте импорт главного файла стилей 
import { enableValidation } from './validation';
import { openModal, closeModal, closeModalByOverlay } from './modal';
import { loadCardsFromServer, loadUser, addNewCard, editProfile, loadPage, setAvatar } from './api';

const placesList = document.querySelector(".places__list");

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar")

const listPopups = [imagePopup, profilePopup, cardPopup, avatarPopup];

const profilePopupButton = document.querySelector(".profile__edit-button");
const cardPopupButton = document.querySelector(".profile__add-button");
const avatarPopupButton = document.querySelector(".profile__image");

const listCloseButtons = document.querySelectorAll(".popup__close");

const inputName = profilePopup.querySelector(".popup__input_type_name");
const inputDescription = profilePopup.querySelector(".popup__input_type_description");
const inputCardName = cardPopup.querySelector(".popup__input_type_card-name");
const inputUrl = cardPopup.querySelector(".popup__input_type_url");
const inputUrlAvatar = avatarPopup.querySelector(".popup__input_type_url");

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
	cardLikes: '.card__likes-num',
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
	addNewCard(inputCardName.value, inputUrl.value, placesList, cardSettings)
  closeModal(cardPopup);
}

const handleEditAvatarSubmit = (evt) => {
  evt.preventDefault();
	setAvatar(inputUrlAvatar.value)
  closeModal(avatarPopup);
}

// Инициализация событий
loadPage(placesList, cardSettings)

enableValidation(validationSettings);

profilePopupButton.addEventListener("click", openEditPopup);

cardPopupButton.addEventListener("click", () => openModal(cardPopup));

avatarPopupButton.addEventListener("click", () => openModal(avatarPopup))

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

document.forms.editProfile.addEventListener('submit', handleProfileFormSubmit)
document.forms.newPlace.addEventListener('submit', handleNewCardFormSubmit);
document.forms.editAvatar.addEventListener('submit', handleEditAvatarSubmit);