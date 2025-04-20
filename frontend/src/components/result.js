import {UrlManager} from "../utils/url-manager.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";

export class Result {

    constructor() {
        this.answersButtonElement = null;

        this.routeParams = UrlManager.getQueryParams();

        this.init();

        this.answersButtonElement = document.getElementById('answers');
        this.answersButtonElement.onclick = () => location.href = '#/answers?name=' +
            this.routeParams.name + '&lastName=' + this.routeParams.lastName + '&email=' +
            this.routeParams.email + '&id=' + this.routeParams.id;
    }

    async init() {
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/';
        }

        if (this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id +
                    '/result?userId=' + userInfo.userId);

                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
                    document.getElementById('result-score').innerText = result.score +
                        '/' + result.total;
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
        location.href = '#/';
    }
}