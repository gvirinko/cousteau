import {CardList} from "./class_CardList";
import {placesSection} from "./script.js";

export class Api {
    constructor(baseUrl, headers, cohortId) {
      this.baseUrl = baseUrl;
      this.headers = {authorization: '8fadaf07-e3e6-4019-aca9-05f9a137f449', 'Content-Type': 'application/json'};
    //   this.authorization = token;
    //   this.token = token;
      this.cohortId = cohortId;
    }

    httpGet(urlSuffix) {
        let url = this.baseUrl + urlSuffix;
        return fetch(url, {
            headers: this.headers,
        })
        .then (result => {
            if (result.ok) {
                return result.json();
            }
            return Promise.reject(`Ошибка: ${result.status}`);
        })
    }

    httpPatch(urlSuffix, body) {
        let url = this.baseUrl + urlSuffix;
        return fetch(url, {
            method: 'PATCH',
            headers: this.headers,
            body: body
        })
        .then (result => {
            if (result.ok) {
                return result.json();
            }
            return Promise.reject(`Ошибка: ${result.status}`);
        })
    }

    loadProfile() {
        this.httpGet(`/${this.cohortId}/users/me`)
            .then(result => {
                document.querySelector('.user-info__name').textContent = result.name;
                document.querySelector('.user-info__job').textContent = result.about;
                document.querySelector('.user-info__photo').style.backgroundImage = result.avatar;
                })
            .catch(error => {
                console.log(error);
            });
    }

    loadInitialCards() {
        this.httpGet(`/${this.cohortId}/cards`)
            .then((result) => {
                let cards = [];
                for (let i = 0; i < result.length; i++) {
                    let cardObject = {name: result[i].name, link: result[i].link};
                    cards.push(cardObject);
                }
                const cardList = new CardList(placesSection, cards);
                cardList.renderInitialArray();
            })
            .catch(error => {
                console.log(error);
            });
        }

    submitProfile(name, job) {
        this.httpPatch(`/${this.cohortId}/users/me`, JSON.stringify({name: name, about: job}))
            .catch(error => {
                console.log(error);
            });
        }
}