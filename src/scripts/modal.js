export const openModal = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener("keydown", closeByEsc)
}

export const closeModal = (popup) => {
    document.removeEventListener("keydown", closeByEsc)
    popup.classList.remove('popup_is-opened');
}

export const closeModalByOverlay = (e) => {
    closeModal(e.target)
}

function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}