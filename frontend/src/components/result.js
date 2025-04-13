import {UrlManager} from "../utils/url-manager.js";

export class Result {

    constructor() {
        this.answersButtonElement = null;

        this.routeParams = UrlManager.getQueryParams();
        UrlManager.checkUserData(this.routeParams);

        document.getElementById('result-score').innerText = this.routeParams.score +
            '/' + this.routeParams.total;

        this.answersButtonElement = document.getElementById('answers');
        this.answersButtonElement.onclick = () => location.href = '#/answers?name=' +
            this.routeParams.name + '&lastName=' + this.routeParams.lastName + '&email=' +
            this.routeParams.email + '&id=' + this.routeParams.id;
    }
}