export {handleValidate, validate, validateLink, activateError, resetError, resetAllValidationMessages, validateEditOnInput, validateCardOnInput};

const errorMessages = {
    requiredField: 'Это обязательное поле',
    requiredLength: 'Должно быть от 2 до 30 символов',
    requiredReference: 'Здесь должна быть ссылка',
}

// Функция, распределяющая реакции в зависимости от типа валидируемого поля
function handleValidate(event) {
    resetError(event.target);

    switch(event.target.name) {
        case 'name':
        case 'namecard':
        case 'job':
            validate(event.target);
            break;
        case 'link': // не происходит сверка результата валидации обоих полей
            validateLink(event.target);
            break;
    }
}

// Общая функция валидации (не включая правила для ссылки)
function validate(element) {
    const errorElement = document.querySelector(`.validation-error__${element.name}`);
    const popupCardButton = document.querySelector('.popup-card__button');
    const popupEditButton = document.querySelector('.popup-edit__button');
    popupEditButton.disabled = true;
    popupCardButton.disabled = true;
    if (!element.checkValidity()) {
        if (element.value.length === 0) {
            errorElement.textContent = errorMessages.requiredField;
            activateError(errorElement);
            return false;
        }
        if (element.value.length < 2 || element.value.length > 30) {
            errorElement.textContent = errorMessages.requiredLength;
            activateError(errorElement);
            return false;
        }
    }
    popupEditButton.disabled = false;
    popupCardButton.disabled = false;
    return true;
}

// Функция валидации ссылки
function validateLink(element) {
    const errorElement = document.querySelector('.validation-error__link');
    const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (!pattern.test(element.value)) {
        errorElement.textContent = errorMessages.requiredReference;
        activateError(errorElement);
        return false;
    }

    return true;
}

function activateError(element) {
    element.classList.add('.validation');
}

function resetError(element) {
    const errorElement = document.querySelector(`.validation-error__${element.name}`);
    errorElement.textContent='';
}

// Функция сброса всех сообщений об ошибках
function resetAllValidationMessages() {
    const errorMessages = document.querySelectorAll('.validation');
    errorMessages.forEach((element) => {element.textContent = '';});
}

// Функция для валидации формы попапа редактирования профиля
function validateEditOnInput() {
    const form = event.currentTarget;
    const name = form.elements.name.value;
    const job = form.elements.job.value;
    const popupEditButton = document.querySelector('.popup-edit__button');

    const isNotValid = name.length < 2 || job.length < 2;
    popupEditButton.disabled = isNotValid;
  }

// Функция для валидации формы попапа добавления карточки
function validateCardOnInput() {
    const form = event.currentTarget;
    const namecard = form.elements.namecard.value;
    const link = form.elements.link.value;
    const popupCardButton = document.querySelector('.popup-card__button');
    const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    const isNotValid = namecard.length < 2 || (!pattern.test(link));
    popupCardButton.disabled = isNotValid;
  }

