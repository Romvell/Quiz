import {UrlManager} from "../utils/url-manager.js";

export class Answers {
    constructor() {
        this.quiz = null;
        this.rightAnswers = null;
        this.groupQuestionsElement = null;
        this.executor = null;
        this.userResult = null;
        this.routeParams = UrlManager.getQueryParams();
        UrlManager.checkUserData(this.routeParams);

        const testId = this.routeParams.id;

        this.executor = this.routeParams.name + ' ' +
            this.routeParams.lastName + ', ' +
            this.routeParams.email;
        if (testId) {
            this.quiz = UrlManager.getDataQuiz('https://testologia.ru/get-quiz?id=', testId);
            this.rightAnswers = UrlManager.getDataQuiz('https://testologia.ru/get-quiz-right?id=', testId);
        } else {
            location.href = '#/';
        }
        this.showQuestions();
    }

    showQuestions() {
        this.groupQuestionsElement = document.getElementById('answers-questions');
        this.groupQuestionsElement.innerHTML = '';
        this.userResult = JSON.parse(sessionStorage.getItem('result'));

        document.getElementById('pre-title').innerText = this.quiz.name;
        document.getElementById('executor').innerText = this.executor;

        this.quiz.questions.forEach((question, index) => {

            const questionElement = document.createElement('div');
            questionElement.className = 'answers-question';
            const questionTitleElement = document.createElement('div');
            questionTitleElement.className = 'answers-question-title';
            questionTitleElement.innerHTML = '<span>Вопрос ' + (+index + 1)
                + ':</span> ' + question.question;
            const optionsElement = document.createElement('div');
            optionsElement.className = 'answers-question-options';
            const optionsId = 'options-' + index;
            optionsElement.setAttribute('id', optionsId);

            questionElement.appendChild(questionTitleElement);
            questionElement.appendChild(optionsElement);
            this.groupQuestionsElement.appendChild(questionElement);

            question.answers.forEach(answer => {
                const optionElement = document.createElement('div');
                optionElement.className = 'answers-question-option';
                const inputId = 'answer-' + answer.id;
                const inputElement = document.createElement('input');
                inputElement.className = 'option-answer';
                inputElement.setAttribute('id', inputId);
                inputElement.setAttribute('type', 'radio');
                inputElement.setAttribute('name', 'answer' + index);
                inputElement.setAttribute('value', answer.id);
                inputElement.setAttribute('disabled', 'disabled');

                const labelElement = document.createElement('label');
                labelElement.setAttribute('for', inputId);
                labelElement.innerText = answer.answer;

                optionElement.appendChild(inputElement);
                optionElement.appendChild(labelElement);
                optionsElement.appendChild(optionElement);

                const chosenAnswerId = this.userResult[index].chosenAnswerId;
                if (chosenAnswerId !== null) {
                    if (chosenAnswerId === this.rightAnswers[index]) {
                        if (chosenAnswerId === answer.id) {
                            inputElement.style.border = '6px solid #5FDC33';
                            labelElement.style.color = '#5FDC33';
                        }
                    } else {
                        if (chosenAnswerId === answer.id) {
                            inputElement.style.border = '6px solid #DC3333';
                            labelElement.style.color = '#DC3333';
                        }
                    }
                }
            });
        });
    };
}