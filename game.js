function newState() {
    return {
        gamepads: [],
        activeGamepadIndex: null,
        vocabulary: [
            {question: "rabbit", answer: "🐇"},
            {question: "fox", answer: "🦊"},
            {question: "wolf", answer: "🐺"},
            {question: "snake", answer: "🐍"},
            {question: "elephant", answer: "🐘"},
            {question: "dragon", answer: "🐲"},
            {question: "bear", answer: "🐻"},
            {question: "cat", answer: "🐈"},
            {question: "dog", answer: "🐕"},
            {question: "tiger", answer: "🐅"},
            {question: "cow", answer:"🐄"},
            {question: "lion", answer: "🦁"},
            {question: "pig", answer: "🐖"},
            {question: "sheep", answer: "🐑"},
            {question: "goat", answer: "🐐"},
            {question: "seal", answer: "🦭"},
            {question: "whale", answer: "🐋"},
            {question: "dolphin", answer: "🐬"},
            {question: "spider", answer: "🕷️"},
            {question: "ant", answer: "🐜"},
            {question: "bee", answer: "🐝"},
            {question: "snail", answer: "🐌"},
            {question: "giraffe", answer: "🦒"},
            {question: "monkey", answer: "🐒"},
            {question: "bird", answer: "🐦"},
            {question: "eagle", answer: "🦅"},
            {question: "fish", answer: "🐟"},
            {question: "shark", answer: "🦈"},
            {question: "squirrel", answer: "🐿️"},
            {question: "deer", answer: "🦌"},
            {question: "turtle", answer: "🐢"},
            {question: "hedgehog", answer: "🦔"}
        ],
        remainingQuestions: [],
        questionIndex: null,
        score: 0,
        gameOver: false,
        speechSynthesisVoice: null,
        lastButtonState: null
    };
}

let State = newState();

/**
 * Make a copy of the array and shuffle it.
 * @param {Array<T>} array to be shuffled
 * @returns {Array<T>} shuffled items
 * @template T
 */
function shuffle(array) {
    const shuffled = [...array];
    shuffled.sort(() => Math.random() - 0.5);
    return shuffled;
}

function initializeQuestions() {
    const shuffledVocab = shuffle(State.vocabulary);

    if (State.vocabulary.length <= 1) {
        throw new Error("Expected at least two vocabulary cards to shuffle, but got: " + State.vocabulary.length);
    }

    const remainingQuestions = [];
    for (let i = 0; i < shuffledVocab.length; i++) {
        const card = shuffledVocab[i];

        let answers = [
            {text: card.answer, correct: true}
        ];

        let anotherAnswerIndex = i;
        while (anotherAnswerIndex === i) {
            anotherAnswerIndex = Math.floor(Math.random() * shuffledVocab.length);
        }
        answers.push(
            {text: shuffledVocab[anotherAnswerIndex].answer, correct: false}
        )
        answers = shuffle(answers)

        let correctAnswerIndex = -1;
        for (let j = 0; j < answers.length; j++) {
            if (answers[j].correct) {
                correctAnswerIndex = j;
                break;
            }
        }

        remainingQuestions.push(
            {
                question: card.question,
                answers: answers,
                correctAnswerIndex: correctAnswerIndex
            }
        )
    }

    State.remainingQuestions = remainingQuestions;
    State.questionIndex = 0;
}

function initializeSpeechSynthesis() {
    State.speechSynthesisVoice = null;

    if (window.speechSynthesis === undefined) {
        return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices === null || voices === undefined || voices.length === 0) {
        console.log("Speech synthesis voices", voices.length);
        return;
    }

    for (let i = 0; i < voices.length; i++) {
        const lang = voices[i].lang.toLowerCase();
        if (lang === "en" || lang.startsWith("en-")) {
            const voice = voices[i];

            if (State.speechSynthesisVoice !== voice) {
                State.speechSynthesisVoice = voice;
            }
        }
    }
}

/**
 * Initialize the state.
 */
function initialize() {
    State = newState();
    initializeQuestions();
    initializeSpeechSynthesis();

    askTheQuestion();
}

/**
 * Update the inner text of the element if it differs from the given text.
 * @param {HTMLElement} element
 * @param {string} text
 */
function updateInnerTextIfNeeded(element, text) {
    if (element.innerText !== text) {
        element.innerText = text;
    }
}

/**
 * Update the display style property if it differs from the given display value.
 * @param {HTMLElement} element
 * @param {string} display
 */
function updateDisplayIfNeeded(element, display) {
    if (element.style.display !== display) {
        element.style.display = display;
    }
}

function refreshQuestion() {
    const answerContainer = document.getElementById("answer-container");

    if (State.remainingQuestions.length > 0) {
        const question = State.remainingQuestions[State.questionIndex];

        updateInnerTextIfNeeded(
            document.getElementById("left-answer"),
            question.answers[0].text
        );
        updateInnerTextIfNeeded(
            document.getElementById("right-answer"),
            question.answers[1].text
        );

        updateDisplayIfNeeded(answerContainer, "");
    } else {
        updateDisplayIfNeeded(answerContainer, "none");
    }
}

function refreshScore() {
    /**
     * @type {Array<string>}
     */
    const diamonds = [];
    for (let i = 0; i < State.score; i++) {
        diamonds.push("💎");
    }

    const text = diamonds.join("");
    updateInnerTextIfNeeded(
        document.getElementById("score"),
        text
    );
}

function refreshBravo() {
    const bravoContainer = document.getElementById("bravo-container");
    const answerContainer = document.getElementById("answer-container");

    if (State.remainingQuestions.length === 0) {
        updateDisplayIfNeeded(bravoContainer, "");
        updateDisplayIfNeeded(answerContainer, "none");
    } else {
        updateDisplayIfNeeded(bravoContainer, "none");
        updateDisplayIfNeeded(answerContainer, "");
    }
}


function refreshGamepads() {
    /**
     * @type {HTMLSelectElement}
     */
    const gamepadSelect = document.getElementById("gamepad-select");
    gamepadSelect.innerHTML = "";

    for (let i = 0; i < State.gamepads.length; i++) {
        const gamepad = State.gamepads[i];

        /**
         * @type {HTMLOptionElement}
         */
        let option = document.createElement("option");

        if (gamepad.index === State.activeGamepadIndex) {
            option.selected = true;
        }
        option.text = gamepad.id;
        option.value = gamepad.index.toString();

        gamepadSelect.add(option);
    }
}


function refresh() {
    refreshGamepads();
    refreshQuestion();
    refreshBravo();
    refreshScore();
}

function changeActiveGamepad() {
    /**
     * @type {HTMLSelectElement}
     */
    const gamepadSelect = document.getElementById("gamepad-select");
    State.activeGamepadIndex = parseInt(gamepadSelect.value);
}

function updateGamepads() {
    /**
     * @type {Gamepad[]}
     */
    let gamepads = navigator.getGamepads().filter(gamepad => gamepad !== null);

    gamepads.sort((a, b) => a.index - b.index);

    State.gamepads = gamepads;

    if (State.gamepads.length === 0) {
        State.activeGamepadIndex = null;
    } else {
        let foundActiveAgain = false;

        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i].index === State.activeGamepadIndex) {
                foundActiveAgain = true;
                break;
            }
        }

        if (!foundActiveAgain) {
            State.activeGamepadIndex = State.gamepads[0].index;
        }
    }
}

function reactOnButtonPress(buttonIndex) {
    if (!State.gameOver) {
        if (buttonIndex === 0) {
            answer(0);
        } else if (buttonIndex === 3) {
            answer(1);
        } else {
            // Pass.
        }
    } else {
        if (buttonIndex === 9) {
            initialize()
        }
    }
}

function reactOnActiveGamepad() {
    if (State.gamepads.length === 0) {
        return;
    }

    if (State.activeGamepadIndex === null) {
        throw new Error("Unexpected null for active gamepad index when gamepads are not empty")
    }

    /**
     * @type Gamepad
     */
    const gamepad = State.gamepads[State.activeGamepadIndex];

    const newState = gamepad.buttons.map(button => button.pressed);

    if (State.lastButtonState === null || State.lastButtonState.length !== newState.length) {
        for (let i = 0; i < newState.length; i++) {
            if (newState[i]) {
                reactOnButtonPress(i);
            }
        }
    } else {
        for (let i = 0; i < newState.length; i++) {
            if (newState[i] && !State.lastButtonState[i]) {
                reactOnButtonPress(i);
            }
        }
    }

    State.lastButtonState = newState;
}

function playMistake() {
    const audio = new Audio("negative.mp3");
    audio.play().catch(reason => console.error("Failed to play negative sound", reason));
}

function playSuccess() {
    const audio = new Audio("positive.mp3");
    audio.play().catch(reason => console.error("Failed to play positive sound", reason));
}

/**
 * Effectuate an answer.
 * @param {number} direction
 */
function answer(direction) {
    if (direction !== 0 && direction !== 1) {
        throw new Error("Expected only 0 and 1 direction, but got: " + direction);
    }
    if (State.remainingQuestions.length === 0) {
        throw new Error("Unexpected call to the answer function when there are no remaining questions.")
    }
    if (State.questionIndex === null) {
        throw new Error("Expected question index to be set when remaining questions still available.")
    }

    const question = State.remainingQuestions[State.questionIndex];
    if (question.correctAnswerIndex === direction) {
        playSuccess();

        State.score++;

        State.remainingQuestions.splice(State.questionIndex, 1);

        if (State.remainingQuestions.length === 0) {
            State.gameOver = true;
            State.questionIndex = null;
        } else {
            State.questionIndex = State.questionIndex % State.remainingQuestions.length;
            askTheQuestion();
        }
    } else {
        playMistake();
        State.questionIndex = (State.questionIndex + 1) % State.remainingQuestions.length;
        askTheQuestion();
    }

    refresh();
}

function askTheQuestion() {
    if (State.remainingQuestions.length === 0) {
        throw new Error("Unexpected asking the question when there are no remaining questions.")
    }
    if (State.questionIndex === null) {
        throw new Error("Expected question index to be set when remaining questions still available.")
    }

    const question = State.remainingQuestions[State.questionIndex];
    const text = question.question;

    console.log("Asking the question: " + text);

    if (State.speechSynthesisVoice === null) {
        return;
    }

    let utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = State.speechSynthesisVoice;

    // Delay a bit so that we do not conflict with the feedback sounds
    setTimeout(() => window.speechSynthesis.speak(utterance), 500);
}

function sayHi() {
    if (State.speechSynthesisVoice === null) {
        return;
    }
    let utterance = new SpeechSynthesisUtterance();

    // Set the text and voice of the utterance
    utterance.text = "Hi!";
    utterance.voice = State.speechSynthesisVoice;
    setTimeout(() => window.speechSynthesis.speak(utterance), 500);
}

function handleFrame() {
    updateGamepads();
    reactOnActiveGamepad();

    refresh();

    requestAnimationFrame(handleFrame);
}

/**
 * @type {SpeechSynthesisVoice|null}
 */
let speechSynthesisVoice = null;

function main() {
    updateDisplayIfNeeded(
        document.getElementById("container"),
        ""
    );

    initialize();
    document.getElementById("left-answer").onclick = () => answer(0);
    document.getElementById("right-answer").onclick = () => answer(1);
    document.getElementById("restart").onclick = initialize;
    if (State.speechSynthesisVoice === null) {
        // TODO: uncomment
        // alert("Currently, your browser does not support speech synthesis.")
    }

    requestAnimationFrame(handleFrame);
}

window.onload = function () {
    // NOTE (mristin): We have to ask for user action first before speech synthesis is initialized.
    updateDisplayIfNeeded(
        document.getElementById("container"),
        "none"
    );

    const pressStart = document.getElementById("press-start");
    updateDisplayIfNeeded(
        pressStart,
        ""
    );
    pressStart.onclick = () => {
        updateDisplayIfNeeded(
            pressStart,
            "none"
        );

        let retries = 3;

        function waitForSpeechSynthesis() {
            retries--;

            if (retries === 0) {
                main()
            }

            if (window.speechSynthesis.getVoices().length > 0) {
                main()
            } else {
                setTimeout(waitForSpeechSynthesis, 1000)
            }
        }

        waitForSpeechSynthesis();
    }
};