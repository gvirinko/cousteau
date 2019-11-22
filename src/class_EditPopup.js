import {api} from "./script.js";
// import {Api} from './class_Api.js';
import {resetAllValidationMessages} from './script-validation.js';
export class EditPopup {
    constructor(container) {
        this.container = container;
        this.closeButton = this.container.querySelector('.popup-edit__close');
        this.submitButton = this.container.querySelector('.popup-edit__button');
        this.form = this.container.querySelector('.popup-edit__form');

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.popupEditInputName = document.querySelector('.popup-edit__input_type_name');
        this.popupEditInputJob = document.querySelector('.popup-edit__input_type_job');

        this.userInfoName = document.querySelector('.user-info__name');
        this.userInfoJob = document.querySelector('.user-info__job');

        this.open();

        this.closeButton.addEventListener('click', this.close);
        this.form.addEventListener('submit', this.onSubmit);

    }
    open() {
        this.container.classList.add('popup_is-opened');
        this.popupEditInputName.value = this.userInfoName.textContent;
        this.popupEditInputJob.value = this.userInfoJob.textContent;

        const isNotValid = this.popupEditInputName.value.length === 0 || this.popupEditInputJob.length === 0;
        this.submitButton.disabled = isNotValid;

    }
    close() {
        this.container.classList.remove('popup_is-opened');
        resetAllValidationMessages()
    }

    // Редактирование профиля (непосредственно в html)
    editProfile(name, job) {
        this.userInfoName.textContent = name;
        this.userInfoJob.textContent = job;
        api.submitProfile(name, job);
    }

    // Логика при нажатии на кнопку "Сохранить"
    onSubmit(event) {
        event.preventDefault();
        let name = this.popupEditInputName.value;
        let job = this.popupEditInputJob.value;

        if(name.length >= 2 && job.length >= 2) {
            this.editProfile(name, job);
            this.container.classList.remove('popup_is-opened');
        }
    }
}