import { openImageModal } from ".";

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export const createCard = (name, link, cardSettings) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(cardSettings.cardImage);
  cardElement.querySelector(cardSettings.cardTitle).textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardElement.querySelector(cardSettings.cardLikeButton).addEventListener("click", (e) => {
    e.target.classList.toggle(cardSettings.cardLikeButtonActive);
  });

  cardElement.querySelector(cardSettings.cardDeleteButton).addEventListener("click", (e) => {
    e.target.closest(cardSettings.card).remove();
  });

	cardElement.querySelector(cardSettings.cardImage).addEventListener("click", (e) => {
		console.log(cardElement)
		openImageModal(cardElement.querySelector(cardSettings.cardImage).src, cardElement.querySelector(cardSettings.cardTitle).textContent)
	})

  return cardElement;
}

export const renderCards = (placesList, cardSettings) => {
  initialCards.forEach(element => {
    placesList.append(createCard(element.name, element.link, cardSettings));
  });
}