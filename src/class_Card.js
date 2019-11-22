import {EnlargedPopup} from "./class_EnlargedPopup.js";


export class Card {
    constructor(name, url, parent) {
        this.container = this.create(name, url);
        this.parent = parent;
        this.url = url;
        this.isRendered = false;
        this.onClick = this.onClick.bind(this);

        this.container.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.container.querySelector('.place-card__delete-icon').addEventListener('click', this.remove.bind(this));
        this.container.querySelector('.place-card__image').addEventListener('click', this.onClick);
    }

    onClick(event) {
        let popupEnlargedContainer = document.querySelector('.popup-enlarged');
        let newPopup = new EnlargedPopup(popupEnlargedContainer, this.url);
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove(event) {
        this.parent.removeChild(this.container);
        event.stopPropagation();
    }

    render() {
        if (this.isRendered === false) {
            this.isRendered = true;
            return false;
        }
        return true;
    }

    create(name, url) {
      const cardContainer = document.createElement('div');
      const cardImage = document.createElement('div');
      const deleteButton = document.createElement('button');
      const cardDescription = document.createElement('div');
      const cardName = document.createElement('h3');
      const cardLike = document.createElement('button');

      cardContainer.classList.add('place-card');

      // HTML для card__image
      cardImage.classList.add('place-card__image');
      cardImage.style.cursor = "pointer";
      cardContainer.appendChild(cardImage);

      deleteButton.classList.add('place-card__delete-icon');
      cardImage.appendChild(deleteButton);

      // HTML для card__description
      cardDescription.classList.add('place-card__description');
      cardContainer.appendChild(cardDescription);

      cardName.classList.add('place-card__name');
      cardDescription.appendChild(cardName);

      cardLike.classList.add('place-card__like-icon');
      cardDescription.appendChild(cardLike);

      // Добавление контента карточки
      cardName.textContent = name;
      cardImage.style.backgroundImage = `url(${url})`;

      return cardContainer;
    }
}
