import {createCard} from "./cards"
import {closeModal} from "./modal"

const config = {
    baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
    headers: {
        authorization: 'f3fe2d94-a1e6-48eb-96e3-6b335f937148',
        'Content-Type': 'application/json'
    }
}

export const User = {
    name: '',
    about: '',
    avatar: '',
    _id: '',
    cohort: ''
}

const setLoadingButton = (button, isLoading, loadingText = "Сохранение...", defaultText = "Сохранить") => {
	button.textContent = isLoading ? loadingText : defaultText;
};

const clearInputsInPopup = (popup) => {
	const inputs = popup.querySelectorAll("input")
	inputs.forEach((input) => {
		input.value = ""
	})
}

export const loadCardsFromServer = (placesList, cardSettings) => {
	fetch(`${config.baseUrl}/cards`, {
		method: "GET",
		headers: config.headers
	}).then((res) => {
		if (res.status === 200) {
			return res.json()
		}
		return Promise.reject(res.status)
	}).then((cards) => {
		cards.forEach((card) => {
			placesList.append(createCard(card, cardSettings));
		})
		console.log("cards loaded")
	}).catch((err) => {
		console.error("Error: " + err)
	})
}

export const loadPage = (placesList, cardSettings) => {
	fetch(`${config.baseUrl}/users/me`, {
		method: "GET",
		headers: config.headers
	}).then((res)=>{
		if (res.status === 200) {
			return res.json()
		}
		return Promise.reject(res.status)
	}).then((data) => {
		User.name = data.name
		User.about = data.about
		User.avatar = data.avatar
		User._id = data._id
		User.cohort = data.cohort
		document.querySelector(".profile__title").textContent = User.name;
		document.querySelector(".profile__description").textContent = User.about;
		document.querySelector(".profile__image").style.backgroundImage = `url("${User.avatar}")`;
		loadCardsFromServer(placesList, cardSettings)
	}).catch((err) => {
		console.error("Error: " + err)
	})
}

export const addNewCard = (name, link, placesList, cardSettings, popup) => {
	const submitButton = popup.querySelector(".button")
	setLoadingButton(submitButton, true)

	fetch(`${config.baseUrl}/cards`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			link: link
		})
	}).then((res) => {
		if (res.status === 200) {
			return res.json()
		}
		return Promise.reject(res.status)
	}).then((card) => {
		console.log(card)
		placesList.prepend(createCard(card, cardSettings));
		closeModal(popup)
		clearInputsInPopup(popup)
	}).catch((err) => {
		console.error("Error: " + err)
	}).finally(() => {
		setLoadingButton(submitButton, false)
	})
}

export const editProfile = (name, about, popup) => {
	const submitButton = popup.querySelector(".button")
	setLoadingButton(submitButton, true)

	fetch(`${config.baseUrl}/users/me`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			about: about
		})
	}).then((res) => {
		if (res.status === 200) {
			return res.json()
		}
		return Promise.reject(res.status)
	}).then((user) => {
		User.name = user.name
		User.about = user.about
		document.querySelector(".profile__title").textContent = user.name;
		document.querySelector(".profile__description").textContent = user.about;
		closeModal(popup)
		clearInputsInPopup(popup)
	}).catch((err)=>{
		console.error("Error: " + err)
	}).finally(() => {
		setLoadingButton(submitButton, false)
	})
}

export const setLike = (cardId, numLikes) => {
	fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "PUT",
		headers: config.headers
	}).then((res) => {
		if (res.status === 200) {
			return res.json()
		}
		return Promise.reject(res.status)
	}).then((card) => {
		numLikes.textContent = card.likes.length
	}).catch((err)=>{
		console.error("Error: " + err)
	})
}

export const removeLike = (cardId, numLikes) => {
	fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "DELETE",
		headers: config.headers
	}).then((res) => {
		if (res.status === 200) {
			return res.json()
		}
		return Promise.reject(res.status)
	}).then((card) => {
		numLikes.textContent = card.likes.length
	}).catch((err)=>{
		console.error("Error: " + err)
	})
}

export const removeCard = (cardId, cardElement) => {
	fetch(`${config.baseUrl}/cards/${cardId}`,{
		method: "DELETE",
		headers: config.headers
	}).then((res) => {
		if (res.status === 200) {
			return res.json()
		}
		return Promise.reject(res.status)
	}).then(() => {
		cardElement.closest(".card").remove();
	}).catch((err)=>{
		console.error("Error: " + err)
	})
}

export const setAvatar = (url, popup) => {
	const submitButton = popup.querySelector(".button")
	setLoadingButton(submitButton, true)

	fetch(`${config.baseUrl}/users/me/avatar`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({
			avatar: url
		})
	}).then((res) => {
		if (res.status === 200) {
			return res.json()
		}
		return Promise.reject(res.status)
	}).then((data) => {
		document.querySelector(".profile__image").style.backgroundImage = `url("${data.avatar}")`;
		closeModal(popup)
		clearInputsInPopup(popup)
	}).catch((err)=>{
		console.error("Error: " + err)
	}).finally(() => {
		setLoadingButton(submitButton, false)
	})
}