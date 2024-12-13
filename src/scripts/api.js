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
            placesList.prepend(createCard(card.name,  card.link, cardSettings));
        })
        console.log("cards loaded")
    }).catch((err) => {
        console.error("Error: " + err)
    })
}

export const loadUser = () => {
    fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        }
    }).then((res)=>{
        return res.json()
    }).then((data) => {
        User.name = data.name
        User.about = data.about
        User.avatar = data.avatar
        User._id = data._id
        User.cohort = data.cohort
        console.log(User)
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
        placesList.prepend(createCard(card.name,  card.link, cardSettings));
    }).catch((err) => {
        console.error("Error: " + err)
    })
}