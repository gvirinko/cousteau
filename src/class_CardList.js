// import {placesSection} from "./script.js";
import {Card} from "./class_Card.js";
import {CardPopup} from "./class_CardPopup.js";


export class CardList {
    constructor(parent, initialCards) {
        this.parent = parent;
        this.initialCards = initialCards;
        this.newArray = [];
        this.onAddCardButton = this.onAddCardButton.bind(this);

        for (let card of initialCards) {
            this.addCard(card.name, card.link);
        }

        // Логика открытия попапа для добавления новой карточки
        const userInfoButton = document.querySelector('.user-info__button');
        userInfoButton.addEventListener('click', this.onAddCardButton);
    }

    addCard(name, link) {
        const newCard = new Card(name, link, this.parent);
        this.newArray.push(newCard);
    }

    renderInitialArray() {
        for (let element of this.newArray) {
            if (element.render() === false) {
                this.newArray.forEach(element => {
                    this.parent.appendChild(element.container);
                });
            }
        }
    }

    renderOneCard() {
        for (let element of this.newArray) {
            if (element.render() === false) {
                this.parent.appendChild(element.container);
            }
        }
    }

    onAddCardButton() {
        const popupCardMenu = document.querySelector('.popup-card');
        let newCardPopup = new CardPopup(popupCardMenu, this);
    }
}