import { createCard } from "./cards"

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

export const loadCardsFromServer = (placesList, cardSettings) => {
    fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        }
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
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        }
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
        console.log("user loaded")
        loadCardsFromServer(placesList, cardSettings)
    }).catch((err) => {
        console.error("Error: " + err)
    })
}

export const addNewCard = (name, link, placesList, cardSettings) => {
    fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
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
    }).catch((err) => {
        console.error("Error: " + err)
    })
}

export const editProfile = (name, about) => {
    fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers:{
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
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
        console.log("update profile success")
    }).catch((err)=>{
        console.error("Error: " + err)
    })
}

export const setLike = (cardId, numLikes) => {
    fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method:"PUT",
        headers:{
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        }
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
        method:"DELETE",
        headers:{
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        }
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