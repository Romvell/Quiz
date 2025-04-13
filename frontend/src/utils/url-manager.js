export class UrlManager {

    static getQueryParams() {
        const qs = document.location.hash.split('+').join(' ');

        let params = {},
            tokens,
            re = /[?&]([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }

        return params;
    }

    static checkUserData(params) {
        if (!params.name || !params.lastName || !params.email) {
            location.href = '#/';
        }
    }

    static getDataQuiz(url, testId){
    const xhr = new XMLHttpRequest();
    let result = null;
    xhr.open('GET', url + testId, false);
    xhr.send();
    if (xhr.status === 200 && xhr.responseText) {
        try {
            result = JSON.parse(xhr.responseText);
        } catch (e) {
            location.href = '#/';
        }
    } else {
        location.href = '#/';
    }
    return result;
}
}