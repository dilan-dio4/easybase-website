interface QuestionAnswers {
    title: string;
    weights: Record<string, number>;
}

interface Question {
    title: string;
    multiple: boolean;
    options: QuestionAnswers[];
}

window['quizzer'] = function(target: HTMLElement, startingWeights: Record<string, number>, questions: Question[], buttonText: string = "", callback: (_: Record<string, number>) => any = () => {}) {
    const id = "" + Math.floor(Math.random() * 100000);

    window['quizzerCallback'] = function() {
        const aggregateScores: Record<string, number> = Object.assign({}, startingWeights);

        for (let index = 0; index < questions.length; index++) {
            for (const currInput of document.getElementById(`quizzer-${id}-${index}`)!.getElementsByTagName('input')) {
                if (currInput.checked) {
                    const inputWeights = questions[index].options.find(ele => ele.title === currInput.value);
                    Object.keys(aggregateScores).forEach(key => {
                        aggregateScores[key] += inputWeights!.weights[key];
                    });
                }
            }
        }
        callback(aggregateScores);
    };

    let htmlForTarget = "";
    questions.forEach((currentQuestion, index) => {
        htmlForTarget += `
        <div class="quizzer-questionRoot" id="quizzer-${id}-${index}">
            <p class="quizzer-questionTitle">${currentQuestion.title}</p>
            ${currentQuestion.options.map(ele => `
                <div class="quizzer-optionRoot">
                    <label class="quizzer-optionLabel">
                        <input class="quizzer-optionInput" type="${currentQuestion.multiple ? "checkbox" : "radio"}" ${currentQuestion.multiple ? "" : `name="${id}-${index}"`} value="${ele.title}">
                        ${ele.title}
                    </label>
                </div>
            `).join("")}
        </div>
        `
    });

    htmlForTarget += `<div class="quizzer-doneButtonRoot"><button onclick="quizzerCallback()" class="quizzer-doneButton"><p class="quizzer-doneButtonLabel" style="margin: 0">${buttonText}</p></button></div>`

    target.innerHTML = htmlForTarget;
}
