// import {CardList} from "./class_CardList";
import {resetAllValidationMessages} from './script-validation.js';

export class CardPopup {
    constructor(container, cardList) {
        this.container = container;
        this.closeButton = this.container.querySelector('.popup-edit__close');
        this.submitButton = this.container.querySelector('.popup-card__button');
        this.form = this.container.querySelector('.popup-card__form');
        this.cardList = cardList;

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.addCard = this.addCard.bind(this);

        this.open();

        this.closeButton.addEventListener('click', this.close);
        this.form.addEventListener('submit', this.addCard);

    }
    open() {
        this.container.classList.add('popup_is-opened');
        this.submitButton.disabled = true;

    }
    close() {
        this.container.classList.remove('popup_is-opened');
        resetAllValidationMessages();
        this.form.reset();
    }

    addCard(event) {
        event.preventDefault();
        let name = event.currentTarget.elements.namecard.value;
        let link = event.currentTarget.elements.link.value;
        this.cardList.addCard(name, link);
        this.cardList.renderOneCard();
        this.close();
    }
}