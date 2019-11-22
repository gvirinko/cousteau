
import {handleValidate, validateEditOnInput, validateCardOnInput} from './script-validation.js';
import {Api} from './class_Api.js';
import {EditPopup} from "./class_EditPopup.js";


// Константы
export const placesSection = document.querySelector('.places-list');
const userInfoButtonEdit = document.querySelector('.user-info__button_edit');

export const token = '8fadaf07-e3e6-4019-aca9-05f9a137f449';
const cohortId = 'cohort4';
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk' : 'https://praktikum.tk'

// Открытие формы редактирования профиля
userInfoButtonEdit.addEventListener('click', function(event) {
    const popupEditMenu = document.querySelector('.popup-edit');
    let editPopup = new EditPopup(popupEditMenu);
});

// Функция запуска слушателей для валидации
function startValidationListeners() {
    // для формы редактирования профиля
    const formEdit = document.forms.form_edit;
    formEdit.addEventListener('input', handleValidate);
    formEdit.addEventListener('input', validateEditOnInput);
    // для формы создания карточки
    const formCard = document.forms.form_card;
    formCard.addEventListener('input', handleValidate);
    formCard.addEventListener('input', validateCardOnInput);
}

startValidationListeners();

export let api = new Api (serverUrl, {authorization: token, 'Content-Type': 'application/json', 'Cache-Control': 'no-cache'}, cohortId);

// 1. Загрузка информации о пользователе с сервера
api.loadProfile();

// 2. Загрузка первоначальных карточек с сервера
api.loadInitialCards();