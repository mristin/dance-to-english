const thiefMaxDistance = 5;

// NOTE (mristin):
// We distinguish between two types of states. The one state is the state of the overall
// system such as voice selection and gamepad selection. When the game restarts, the system state
// should not be affected. On the other hand, the other state, the game state, concerns only
// the game logic and is devoid of any system concerns such as buttons pressed *etc.*


const SystemState = {
    gamepads: [],
    activeGamepadIndex: null,
    speechSynthesisVoice: null,
    buttonsPressed: null,
    buttonsPressTimestamps: null
}

const Dialogues = {
    Hello: 0,
    Playing: 1,
    GameOver: 2
}


function newState() {
    return {
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
            {question: "cow", answer: "🐄"},
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
            {question: "hedgehog", answer: "🦔"},
            {question: "leopard", answer: "🐆"},
            {question: "dinosaur", answer: "🦕"},
            {question: "t-rex", answer: "🦖"},
            {question: "zebra", answer: "🦓"},
            {question: "horse", answer: "🐎"},
            {question: "hippopotamus", answer: "🦛"},
            {question: "rhinoceros", answer: "🦏"},
            {question: "bison", answer: "🦬"},
            {question: "bull", answer: "🐂"},
            {question: "kangaroo", answer: "🦘"},
            {question: "frog", answer: "🐸"},
            {question: "badger", answer: "🦡"},
            {question: "duck", answer: "🦆"},
            {question: "goose", answer: "🪿"},
            {question: "cock", answer: "🐓"},
            {question: "chicken", answer: "🐔"},
            {question: "swan", answer: "🦢"},
            {question: "mouse", answer: "🐁"},
            {question: "crab", answer: "🦀"},
            {question: "octopus", answer: "🐙"},
            {question: "bat", answer: "🦇"},
            {question: "lizard", answer: "🦎"},
            {question: "koala", answer: "🐨"},
            {question: "gorilla", answer: "🦍"},
            {question: "sloth", answer: "🦥"},
            {question: "panda", answer: "🐼"},
            {question: "camel", answer: "🐪"},
            {question: "llama", answer: "🦙"},
            {question: "beaver", answer: "🦫"},
            {question: "peacock", answer: "🦚"},
            {question: "owl", answer: "🦉"},
            {question: "crocodile", answer: "🐊"},
            {question: "scorpion", answer: "🦂"},
            {question: "butterfly", answer: "🦋"},
            {question: "caterpillar", answer: "🐛"},
            {question: "ladybug", answer: "🐞"},
            {question: "penguin", answer: "🐧"},
            {question: "hamster", answer: "🐹"},
            {question: "otter", answer: "🦦"},
            {question: "parrot", answer: "🦜"},
            {question: "flamingo", answer: "🦩"},
            {question: "mammoth", answer: "🦣"},
            {question: "pigeon", answer: "🕊️"},
            {question: "wild boar", answer: "🐗"},
            {question: "unicorn", answer: "🦄"},
            {question: "donkey", answer: "🫏"},
            {question: "moose", answer: "🫎"},
            {question: "chick", answer: "🐤"},
            {question: "jellyfish", answer: "🪼"},
            {question: "shell", answer: "🐚"},
            {question: "worm", answer: "🪱"}
        ],
        remainingQuestions: [],
        solvedQuestions: [],
        questionIndex: null,
        thiefDistance: 1,
        thiefDirection: 1,
        thiefTimestamp: 0,
        // NOTE (mristin):
        // Split the state across dialogues in the future.
        dialogue: Dialogues.Hello
    };
}

let GameState = newState();

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
    const shuffledVocab = shuffle(GameState.vocabulary);

    if (GameState.vocabulary.length <= 1) {
        throw new Error("Expected at least two vocabulary cards to shuffle, but got: " + GameState.vocabulary.length);
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

        if (answers.length !== 2) {
            throw new Error(
                "Expected exactly 2 answers, " +
                "but got " + answers.length + " answer(s) for question " + card.question
            )
        }

        remainingQuestions.push(
            {
                question: card.question,
                answers: answers,
                correctAnswerIndex: correctAnswerIndex
            }
        )
    }

    GameState.remainingQuestions = remainingQuestions;
    GameState.questionIndex = 0;
}

function setupSpeechSynthesis() {
    SystemState.speechSynthesisVoice = null;

    if (window.speechSynthesis === undefined) {
        return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices === null || voices === undefined || voices.length === 0) {
        return;
    }

    for (let i = 0; i < voices.length; i++) {
        const lang = voices[i].lang.toLowerCase();
        if (lang === "en" || lang.startsWith("en-")) {
            const voice = voices[i];

            if (SystemState.speechSynthesisVoice !== voice) {
                SystemState.speechSynthesisVoice = voice;
            }
        }
    }
}

function announce(text) {
    if (SystemState.speechSynthesisVoice === null) {
        return new Promise((resolve, reject) => {resolve()});
    }

    let utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = SystemState.speechSynthesisVoice;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance)

    return new Promise((resolve, reject) => {
        utterance.onend = resolve;
        utterance.onerror = reject
    })
}

const hiMessages = [
    "Hello! Let's start!",
    "Hi! Let's get ready!",
    "Ready. Steady. Go!"
]

function sayHi() {
    const messageIndex = Math.floor(Math.random() * hiMessages.length);
    return announce(hiMessages[messageIndex]);
}

const bravoMessages = [
    "Bravo!",
    "Well done!",
    "Good job!",
    "Great job!",
    "Congratulations!"
]

function sayBravo() {
    const messageIndex = Math.floor(Math.random() * bravoMessages.length);
    return announce(bravoMessages[messageIndex]);
}

/**
 * Initialize the state.
 */
function initialize() {
    GameState = newState();

    GameState.dialogue = Dialogues.Hello;
    sayHi()
        .then(() => {
            GameState.dialogue = Dialogues.Playing;

            initializeQuestions();
            askTheQuestion();
        })
        .catch((err) => console.error("Failed to say hi", err))
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
    if (GameState.remainingQuestions.length === 0) {
        throw new Error(
            "Unexpected no remaining questions when answer container is refreshed."
        )
    }

    if (GameState.questionIndex === null) {
        throw new Error(
            "Expected question index to be set when there are " + GameState.remainingQuestions.length +
            " remaining questions still available."
        )
    }
    if (GameState.questionIndex >= GameState.remainingQuestions.length) {
        throw new Error(
            "Unexpected question index " + GameState.questionIndex +
            " when there are " + GameState.remainingQuestions.length + " remaining question(s)."
        )
    }

    const question = GameState.remainingQuestions[GameState.questionIndex];

    if (question === undefined) {
        throw new Error(
            "Unexpected undefined question for question index " + GameState.questionIndex + " and when there are " +
            GameState.remainingQuestions.length + " remaining question(s)."
        )
    }

    if (question.answers === undefined) {
        console.error("question", question)
        throw new Error("Unexpected undefined answers for a question, see error log.")
    }

    updateInnerTextIfNeeded(
        document.getElementById("left-answer"),
        question.answers[0].text
    );
    updateInnerTextIfNeeded(
        document.getElementById("right-answer"),
        question.answers[1].text
    );
}

function refreshScore() {
    /**
     * @type {Array<string>}
     */
    const diamonds = [];
    for (let i = 0; i < GameState.solvedQuestions.length; i++) {
        diamonds.push("💎");
    }

    const text = diamonds.join("");
    updateInnerTextIfNeeded(
        document.getElementById("score"),
        text
    );
}

function refreshGamepads() {
    /**
     * @type {HTMLSelectElement}
     */
    const gamepadSelect = document.getElementById("gamepad-select");
    gamepadSelect.innerHTML = "";

    for (let i = 0; i < SystemState.gamepads.length; i++) {
        const gamepad = SystemState.gamepads[i];

        /**
         * @type {HTMLOptionElement}
         */
        let option = document.createElement("option");

        if (gamepad.index === SystemState.activeGamepadIndex) {
            option.selected = true;
        }
        option.text = gamepad.id;
        option.value = gamepad.index.toString();

        gamepadSelect.add(option);
    }
}

function refreshThief() {
    const parts = [];
    for (let i = 0; i < GameState.thiefDistance; i++) {
        parts.push("&nbsp;");
    }
    document.getElementById("thief-distance").innerHTML = parts.join("");
}

function refresh() {
    refreshGamepads();

    const helloContainer = document.getElementById("hello-container");
    const answerContainer = document.getElementById("answer-container");
    const terrain = document.getElementById("terrain");
    const bravoContainer = document.getElementById("bravo-container");

    if (GameState.dialogue === Dialogues.Hello) {
        updateDisplayIfNeeded(helloContainer, "");
        updateDisplayIfNeeded(answerContainer, "none");
        updateDisplayIfNeeded(terrain, "none");
        updateDisplayIfNeeded(bravoContainer, "none");
    } else if (GameState.dialogue === Dialogues.Playing) {
        refreshQuestion();
        refreshScore();
        refreshThief();

        updateDisplayIfNeeded(helloContainer, "none");
        updateDisplayIfNeeded(answerContainer, "");
        updateDisplayIfNeeded(terrain, "");
        updateDisplayIfNeeded(bravoContainer, "none");
    } else if (GameState.dialogue === Dialogues.GameOver) {
        updateDisplayIfNeeded(helloContainer, "none");
        updateDisplayIfNeeded(answerContainer, "none");
        updateDisplayIfNeeded(terrain, "none");
        updateDisplayIfNeeded(bravoContainer, "");
    } else {
        throw new Error("Unhandled dialogue: " + GameState.dialogue)
    }
}

function changeActiveGamepad() {
    /**
     * @type {HTMLSelectElement}
     */
    const gamepadSelect = document.getElementById("gamepad-select");
    SystemState.activeGamepadIndex = parseInt(gamepadSelect.value);
}

function updateGamepads() {
    /**
     * @type {Gamepad[]}
     */
    let gamepads = navigator.getGamepads().filter(gamepad => gamepad !== null);

    gamepads.sort((a, b) => a.index - b.index);

    SystemState.gamepads = gamepads;

    if (SystemState.gamepads.length === 0) {
        SystemState.activeGamepadIndex = null;
    } else {
        let foundActiveAgain = false;

        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i].index === SystemState.activeGamepadIndex) {
                foundActiveAgain = true;
                break;
            }
        }

        if (!foundActiveAgain) {
            SystemState.activeGamepadIndex = SystemState.gamepads[0].index;
        }
    }
}

function reactOnButtonPress(buttonIndex) {
    if (GameState.dialogue === Dialogues.Playing) {
        if (buttonIndex === 0) {
            answer(0);
        } else if (buttonIndex === 3) {
            answer(1);
        } else if (buttonIndex === 9) {
            initialize()
        } else {
            // Pass.
        }
    } else if (GameState.dialogue === Dialogues.GameOver) {
        if (buttonIndex === 9) {
            initialize()
        }
    } else {
        // Pass.
    }
}

/**
 * @param {number} timestamp
 */
function reactOnActiveGamepad(timestamp) {
    if (SystemState.gamepads.length === 0) {
        return;
    }

    if (SystemState.activeGamepadIndex === null) {
        throw new Error("Unexpected null for active gamepad index when gamepads are not empty")
    }

    /**
     * @type Gamepad
     */
    const gamepad = SystemState.gamepads[SystemState.activeGamepadIndex];

    const newButtonsPressed = gamepad.buttons.map(button => button.pressed);

    /**
     * React on the button presses at the end of this function since we are changing the state and this is not
     * a good idea to react on event *before* the state is in a valid shape.
     * @type {Array<number>}
     */
    const buttonPresses = [];

    if (SystemState.buttonsPressed === null || SystemState.buttonsPressed.length !== newButtonsPressed.length) {
        SystemState.buttonsPressTimestamps = newButtonsPressed.map(() => 0);

        for (let i = 0; i < newButtonsPressed.length; i++) {
            if (newButtonsPressed[i]) {
                SystemState.buttonsPressTimestamps[i] = timestamp;
                buttonPresses.push(i);
            }
        }

        SystemState.buttonsPressed = newButtonsPressed;
    } else {
        if (SystemState.buttonsPressTimestamps === null) {
            throw new Error("Buttons press-timestamps must be set when buttons pressed is set.")
        }

        if (SystemState.buttonsPressTimestamps.length !== SystemState.buttonsPressed.length) {
            throw new Error(
                "Expected length of button press-timestamps to match " +
                SystemState.buttonsPressed.left +
                ", i.e., buttons pressed, but got: " +
                SystemState.buttonsPressTimestamps.length
            )
        }


        for (let i = 0; i < newButtonsPressed.length; i++) {
            if (newButtonsPressed[i] && !SystemState.buttonsPressed[i]) {
                const oldTimestamp = SystemState.buttonsPressTimestamps[i]
                const delta = timestamp - oldTimestamp;

                // NOTE (mristin):
                // Debounce after a second
                if (delta > 1000) {
                    SystemState.buttonsPressTimestamps[i] = timestamp;
                    buttonPresses.push(i);
                }
            }
        }

        SystemState.buttonsPressed = newButtonsPressed;
    }

    if (SystemState.buttonsPressed === null) {
        throw new Error("Unexpected unset buttons pressed at the end of react-on-active-gamepad.")
    }

    if (SystemState.buttonsPressTimestamps === null) {
        throw new Error("Unexpected unset buttons press-timestamps at the end of react-on-active-gamepad.")
    }

    for (let i = 0; i < buttonPresses.length; i++) {
        reactOnButtonPress(buttonPresses[i]);
    }
}

function playMistake() {
    const audio = new Audio("negative.mp3");
    audio.volume = 0.1;
    audio.play().catch(reason => console.error("Failed to play negative sound", reason));
}

function playSuccess() {
    const audio = new Audio("positive.mp3");
    audio.volume = 0.1;
    audio.play().catch(reason => console.error("Failed to play positive sound", reason));
}

function playStolen() {
    const audio = new Audio("stone.mp3");
    audio.volume = 0.1;
    audio.play().catch(reason => console.error("Failed to play stolen sound", reason));
}

/**
 * Effectuate an answer.
 * @param {number} direction
 */
function answer(direction) {
    if (direction !== 0 && direction !== 1) {
        throw new Error("Expected only 0 and 1 direction, but got: " + direction);
    }
    if (GameState.remainingQuestions.length === 0) {
        throw new Error("Unexpected call to the answer function when there are no remaining questions.")
    }
    if (GameState.questionIndex === null) {
        throw new Error("Expected question index to be set when remaining questions still available.")
    }
    if (GameState.questionIndex >= GameState.remainingQuestions.length) {
        throw new Error(
            "Unexpected question index " + GameState.questionIndex +
            " when there are " + GameState.remainingQuestions.length + " remaining question(s)."
        )
    }

    const question = GameState.remainingQuestions[GameState.questionIndex];
    if (question.correctAnswerIndex === direction) {
        playSuccess();

        const solvedQuestionAsArray = GameState.remainingQuestions.splice(GameState.questionIndex, 1);
        if (solvedQuestionAsArray.length !== 1) {
            throw new Error(
                "Expected exactly one question to be removed from remaining questions, " +
                "but we removed " + solvedQuestionAsArray.length)
        }

        GameState.solvedQuestions.push(solvedQuestionAsArray[0]);

        GameState.thiefDistance = Math.max(thiefMaxDistance, GameState.thiefDistance + 1);

        if (GameState.remainingQuestions.length === 0) {
            // Finish the game
            GameState.questionIndex = null;
            GameState.dialogue = Dialogues.GameOver;

            sayBravo().catch((err) => {
                console.error("Failed to say bravo", err)
            });

        } else {
            GameState.questionIndex = GameState.questionIndex % GameState.remainingQuestions.length;
            askTheQuestion();
        }
    } else {
        playMistake();
        GameState.questionIndex = (GameState.questionIndex + 1) % GameState.remainingQuestions.length;
        askTheQuestion();
    }

    refresh();
}

function askTheQuestion() {
    if (GameState.remainingQuestions.length === 0) {
        throw new Error("Unexpected asking the question when there are no remaining questions.")
    }
    if (GameState.questionIndex === null) {
        throw new Error("Expected question index to be set when remaining questions still available.")
    }
    if (GameState.questionIndex >= GameState.remainingQuestions.length) {
        throw new Error(
            "Unexpected question index " + GameState.questionIndex +
            " when there are " + GameState.remainingQuestions.length + " remaining question(s)."
        )
    }

    const question = GameState.remainingQuestions[GameState.questionIndex];
    const text = question.question;

    console.log("Asking the question: " + text);

    if (SystemState.speechSynthesisVoice === null) {
        return;
    }

    let utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = SystemState.speechSynthesisVoice;

    // Delay a bit so that we do not conflict with the feedback sounds
    setTimeout(
        () => {
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        },
        500
    );
}

function updateThief(timestamp) {
    const temporalDelta = timestamp - GameState.thiefTimestamp;
    if (GameState.solvedQuestions.length > 0 && temporalDelta > 1000) {
        const spatialDelta = Math.round(temporalDelta / 1000);
        GameState.thiefDistance = Math.min(
            Math.max(
                0,
                GameState.thiefDistance + GameState.thiefDirection * spatialDelta
            ),
            thiefMaxDistance
        );

        if (
            GameState.thiefDistance === 0
            || GameState.thiefDistance === thiefMaxDistance
        ) {
            GameState.thiefDirection = -1 * GameState.thiefDirection;
        }

        if (GameState.thiefDistance === 0) {
            playStolen();
            const stolenQuestion = GameState.solvedQuestions.pop();
            if (stolenQuestion === undefined) {
                throw new Error(
                    "Stolen question was undefined. The question index is " + GameState.questionIndex + ", " +
                    "while there are " + GameState.solvedQuestions.length + " solved question(s) " +
                    "and " + GameState.remainingQuestions + " remaining question(s)."
                )
            }
            GameState.remainingQuestions.push(stolenQuestion);
        }

        GameState.thiefTimestamp = timestamp;
    }
}


/**
 * @param {number} timestamp
 */
function handleFrame(timestamp) {
    updateGamepads();
    reactOnActiveGamepad(timestamp);

    if (GameState.dialogue === Dialogues.Playing) {
        updateThief(timestamp);
    }

    refresh();

    requestAnimationFrame(handleFrame);
}

function main() {
    updateDisplayIfNeeded(
        document.getElementById("container"),
        ""
    );

    setupSpeechSynthesis();
    initialize();
    document.getElementById("left-answer").onclick = () => answer(0);
    document.getElementById("right-answer").onclick = () => answer(1);
    document.getElementById("restart").onclick = initialize;
    if (SystemState.speechSynthesisVoice === null) {
        alert("Currently, your browser does not support speech synthesis.")
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
