import '../pages/index.css'; // добавьте импорт главного файла стилей 

import {initialCards} from "./cards"

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

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardElement.querySelector(".card__like-button").addEventListener("click", (e) => {
    e.target.classList.toggle("card__like-button_is-active");
  });

  cardElement.querySelector(".card__delete-button").addEventListener("click", (e) => {
    e.target.closest(".card").remove();
  });

	cardElement.querySelector(".card__image").addEventListener("click", (e) => {
		console.log(cardElement)
		openImageModal(cardElement.querySelector(".card__image").src, cardElement.querySelector(".card__title").textContent)
	})

  return cardElement;
}

function renderCards() {
  initialCards.forEach(element => {
    placesList.append(createCard(element.name, element.link));
  });
}

function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

function openEditPopup() {
  inputName.value = document.querySelector(".profile__title").textContent;
  inputDescription.value = document.querySelector(".profile__description").textContent;
  openModal(profilePopup);
}

function openImageModal(src, caption){
	document.querySelector(".popup__image").src = src
	document.querySelector(".popup__caption").textContent = caption

	openModal(imagePopup)
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = inputName.value;
  document.querySelector(".profile__description").textContent = inputDescription.value;
  closeModal(profilePopup);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  placesList.prepend(createCard(inputCardName.value, inputUrl.value));
  closeModal(cardPopup);
}

// Инициализация событий
renderCards();

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
})

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
newCardFormElement.addEventListener('submit', handleNewCardFormSubmit);
