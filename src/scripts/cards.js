import { openImageModal } from ".";
import { setLike, removeLike, User, removeCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

export const createCard = (cardData, cardSettings) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(cardSettings.cardImage);
    const numLikes = cardElement.querySelector(cardSettings.cardLikes);
    const likeButton = cardElement.querySelector(cardSettings.cardLikeButton);
    cardElement.querySelector(cardSettings.cardTitle).textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    numLikes.textContent = cardData.likes.length;

    let isLiked = false
    if(cardData.likes.some(user => user._id === User._id)){
        isLiked = true
        likeButton.classList.add(cardSettings.cardLikeButtonActive);
    }
    console.log("likes set")
    likeButton.addEventListener("click", (e) => {
        if (!isLiked){
            e.target.classList.add(cardSettings.cardLikeButtonActive);
            setLike(cardData._id, numLikes);
        }else{
            e.target.classList.remove(cardSettings.cardLikeButtonActive);
            removeLike(cardData._id, numLikes);
        }
        isLiked = !isLiked
    });

    cardElement.querySelector(cardSettings.cardDeleteButton).addEventListener("click", (e) => {
        removeCard(cardData._id, e.target)
    });

    cardElement.querySelector(cardSettings.cardImage).addEventListener("click", (e) => {
        console.log(cardElement)
        openImageModal(cardElement.querySelector(cardSettings.cardImage).src, cardElement.querySelector(cardSettings.cardTitle).textContent)
    })

    return cardElement;
}