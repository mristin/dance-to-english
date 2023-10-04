const thiefMaxDistance = 5;

/**
 * @typedef {Object} Card
 * @property {string} question to be asked
 * @property {string} answer to be expected
 */

/**
 * @typedef {Object} Level
 * @property {string} name of the level
 * @property {Array<Card>} vocabulary to be learnt
 */

/**
 * @type {Array<Level>}
 */
const levels = [
    {
        name: "Animals 1",
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
            {question: "fish", answer: "🐟"}
        ]
    },
    {
        name: "Animals 2",
        vocabulary: [
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
            {question: "lizard", answer: "🦎"}
        ]
    },
    {
        name: "Animals 3",
        vocabulary: [
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
        ]
    }
];

if (levels.length === 0) {
    throw new Error("DialogueSelectLevel expects at least one level.")
}

function assertEachLevelAtLeastTwoCards() {
    for (let i = 0; i < levels.length; i++) {
        const level = levels[i];

        if (level.vocabulary.length <= 1) {
            throw new Error(
                "Expected at least two vocabulary cards to shuffle, " +
                ` but got: ${level.vocabulary.length} cards` +
                ` at level ${i}`
            );
        }
    }
}

assertEachLevelAtLeastTwoCards();


// NOTE (mristin):
// We distinguish between three types of states.
//
// The one state is the state of the overall system such as voice selection and
// gamepad selection. When the game restarts, the system state should not be
// affected.
//
// On the other hand, the other state, the dialogue state, concerns only the
// immediate dialogue logic and is devoid of any system concerns such as
// buttons pressed *etc.*
//
// The third state, the game state, concerns the over-arching game state which
// persists between the dialogues.

/**
 * Define a general dialogue, where the game goes from one dialogue to another,
 * akin to a state machine.
 *
 * @interface IDialogue
 */

/**
 * Generate the HTML code to be put into the game container.
 * @function
 * @name IDialogue#initialHTML
 * @returns {string}
 */

/**
 * Update the dialogue state based on the timestamp.
 * @function
 * @name IDialogue#tick
 * @param {number} timestamp of the frame
 * @returns {void}
 */

/**
 * Refresh the game container based on the dialogue's state.
 * @function
 * @name IDialogue#refresh
 * @returns {void}
 */

/**
 * React on the gamepad button pressed.
 * @function
 * @name IDialogue#onGamepadButtonPressed
 * @param {number} buttonIndex which gamepad button has been pressed
 * @returns {void}
 */

/**
 * Execute the mount after the initial HTML code has been inserted.
 * @function
 * @name IDialogue#mount
 * @returns {void}
 */

/**
 * Execute the unmount just before the next dialogue is going to be mounted.
 * @function
 * @name IDialogue#unmount
 * @returns {void}
 */

/**
 * Ask the user to press a button so that we can activate the speech synthesis.
 * @implements IDialogue
 */
class DialoguePressHere {

    initialHTML() {
        return `<button class="announcement" id="press-start">
Press here when you are ready to start.
</button>`;
    }

    mount() {
        const pressStart = document.getElementById("press-start");
        pressStart.onclick = () => {
            dialoguer.put(new DialogueWaitingForSpeechSynthesis())
        };
    }

    onGamepadButtonPressed(buttonIndex) {
        // Intentionally empty.
    }

    refresh() {
        // Intentionally empty.
    }

    tick(timestamp) {
        // Intentionally empty.
    }

    unmount() {
        // Intentionally empty.
    }
}

/**
 * Show that we are waiting for the speech synthesis to be initialized.
 * @implements IDialogue
 */
class DialogueWaitingForSpeechSynthesis {
    constructor() {
        this.retries = 4;
        this.lastTick = null;
    }

    initialHTML() {
        return `<div id="message" class="announcement">
Waiting for the speech synthesis to initialize...
</div>`;
    }

    mount() {
        // Intentionally empty.
    }

    onGamepadButtonPressed(buttonIndex) {
        // Intentionally empty.
    }

    refresh() {
        const messageDiv = document.getElementById("message");
        const dots = [];
        for (let i = 0; i < this.retries; i++) {
            dots.push(".")
        }

        updateInnerTextIfNeeded(
            messageDiv,
            "Waiting for the speech synthesis to initialize"
            + dots.join("")
        )
    }

    tick(timestamp) {
        if (this.lastTick === null || timestamp - this.lastTick > 1000) {
            if (window.speechSynthesis.getVoices().length > 0) {
                setupSpeechSynthesis();
                dialoguer.put(new DialogueSelectLevel());
            } else {
                this.retries--;

                if (this.retries === 0) {
                    dialoguer.put(new DialogueNoSpeechSynthesisAvailable());
                }
            }

            this.lastTick = timestamp;
        }
    }

    unmount() {
        // Intentionally empty.
    }
}

/**
 * Inform the user that the game can not be played as there is no speech
 * synthesis.
 * @implements IDialogue
 */
class DialogueNoSpeechSynthesisAvailable {
    initialHTML() {
        return `<div class='announcement'>
No speech synthesis is available in your browser. Perhaps you have no 
internet connection and your browser needs one for speech synthesis?
</div>`;
    }

    mount() {
        // Intentionally empty.
    }

    onGamepadButtonPressed(buttonIndex) {
        // Intentionally empty.
    }

    refresh() {
        // Intentionally empty.
    }

    tick(timestamp) {
        // Intentionally empty.
    }

    unmount() {
        // Intentionally empty.
    }
}

const buttonIndices = {
    left: 0,
    right: 3,
    start: 9,
    select: 8
}

/**
 * Let the user select the level.
 * @implements IDialogue
 */
class DialogueSelectLevel {
    constructor() {
        this.levelIndex = gameState.levelIndex;
    }

    initialHTML() {
        const parts = [
            `<div class="announcement">
Select the level:
</div>`
        ];
        for (let i = 0; i < levels.length; i++) {
            const level = levels[i];
            parts.push(
                `<button 
    id="level-${i}" 
    class="level-choice"
>${level.name}</button>`
            )
        }
        return parts.join("\n");
    }

    announceLevel() {
        if (this.levelIndex < 0 || this.levelIndex >= levels.length) {
            throw new Error(
                `The level index ${this.levelIndex} is invalid; there are ` +
                `in total ${levels.length} levels.`
            )
        }

        announce(levels[this.levelIndex].name)
            .catch(
                (err) => console.log("Failed to announce the level", err)
            );
    }

    mount() {
        for (let i = 0; i < levels.length; i++) {
            /**
             * @type {HTMLButtonElement}
             */
            const button = document.getElementById(`level-${i}`);
            button.onclick = ((anI) => {
                return () => {
                    this.levelIndex = anI;
                    this.startTheGame();
                }
            })(i);

            addClassIfNeeded(button, "level-choice");
            if (i < levels.length - 1) {
                button.style.paddingRight = "1em";
            }
        }

        this.announceLevel();
    }

    startTheGame() {
        gameState.levelIndex = this.levelIndex;
        dialoguer.put(new DialogueHello());
    }

    /**
     * @param {number } delta
     */
    changeSelection(delta) {
        this.levelIndex = (this.levelIndex + delta) % levels.length;
        this.announceLevel();
    }

    onGamepadButtonPressed(buttonIndex) {
        if (buttonIndex === buttonIndices.left) {
            this.changeSelection(-1);
        } else if (buttonIndex === buttonIndices.right) {
            this.changeSelection(+1);
        } else if (buttonIndex === buttonIndices.select) {
            this.startTheGame();
        }
    }

    refresh() {
        for (let i = 0; i < levels.length; i++) {
            const button = document.getElementById(`level-${i}`);

            if (i === this.levelIndex) {
                addClassIfNeeded(button, "level-selected");
            } else {
                removeClassIfNeeded(button, "level-selected");
            }
        }
    }

    tick(timestamp) {
        // Intentionally empty.
    }

    unmount() {
        // Intentionally empty.
    }
}

const hiMessages = [
    "Hello! Let's start!",
    "Hi! Let's get ready!",
    "Ready. Steady. Go!"
]

/**
 * Say hello to the user to announce that the game is about to start.
 * @implements IDialogue
 */
class DialogueHello {
    initialHTML() {
        return `<div id="hello-container">
    <div id="hello">👋 Hello! 👋</div>
</div>`;
    }

    mount() {
        const messageIndex = Math.floor(Math.random() * hiMessages.length);
        announce(hiMessages[messageIndex])
            .catch(
                (err) => console.log(
                    "Failed to announce the start of the game", err
                )
            )
            .then(
                () => {
                    dialoguer.put(new DialoguePlay())
                }
            );
    }

    onGamepadButtonPressed(buttonIndex) {
        // Intentionally empty.
    }

    refresh() {
        // Intentionally empty.
    }

    tick(timestamp) {
        // Intentionally empty.
    }

    unmount() {
        // Intentionally empty.
    }
}

/**
 * Play the game.
 * @implements IDialogue
 */
class DialoguePlay {
    constructor() {
        if (gameState.levelIndex < 0 || gameState.levelIndex >= levels.length) {
            throw new Error(
                "The level index is invalid; " +
                `there are ${levels.length} level(s), ` +
                `but we got level index ${gameState.levelIndex}`
            );
        }

        const level = levels[gameState.levelIndex];

        // See the assertion assertEachLevelAtLeastTwoCards for the assumption
        // that there are at least two cards to shuffle.

        const shuffledVocab = shuffle(level.vocabulary);

        const remainingQuestions = [];
        for (let i = 0; i < shuffledVocab.length; i++) {
            const card = shuffledVocab[i];

            let answers = [
                {text: card.answer, correct: true}
            ];

            let anotherAnswerIndex = i;
            while (anotherAnswerIndex === i) {
                anotherAnswerIndex = Math.floor(
                    Math.random() * shuffledVocab.length
                );
            }
            answers.push(
                {
                    text: shuffledVocab[anotherAnswerIndex].answer,
                    correct: false
                }
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
                    `but got ${answers.length}  answer(s) ` +
                    `for question ${card.question}`
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

        this.remainingQuestions = remainingQuestions;
        this.questionIndex = 0;
        this.solvedQuestions = [];

        this.thiefDistance = 1;
        this.thiefDirection = 1;
        this.thiefTimestamp = 0;

        this.askingId = null;  // set when the question is asked
    }

    playMistake() {
        const audio = new Audio("negative.mp3");
        audio.volume = 0.1;
        audio.play().catch(
            reason => console.log("Failed to play negative sound", reason)
        );
    }

    playSuccess() {
        const audio = new Audio("positive.mp3");
        audio.volume = 0.1;
        audio.play().catch(
            reason => console.log("Failed to play positive sound", reason)
        );
    }

    playStolen() {
        const audio = new Audio("stone.mp3");
        audio.volume = 0.1;
        audio.play().catch(
            reason => console.log("Failed to play stolen sound", reason)
        );
    }

    askTheQuestion() {
        if (this.remainingQuestions.length === 0) {
            throw new Error(
                "Unexpected asking the question when there are " +
                "no remaining questions."
            )
        }
        if (this.questionIndex === null) {
            throw new Error(
                "Expected question index to be set when remaining questions " +
                "still available."
            )
        }
        if (this.questionIndex >= this.remainingQuestions.length) {
            throw new Error(
                `Unexpected question index ${this.questionIndex} ` +
                `when there are ${this.remainingQuestions.length} ` +
                "remaining question(s)."
            )
        }

        const question = this.remainingQuestions[this.questionIndex];
        const text = question.question;

        console.log(`Asking the question: ${text}`);

        if (systemState.speechSynthesisVoice === null) {
            return;
        }

        let utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        utterance.voice = systemState.speechSynthesisVoice;

        // Delay a bit so that we do not conflict with the feedback sounds
        this.askingId = setTimeout(
            () => {
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(utterance);
            },
            500
        );
    }

    /**
     * Effectuate the answer
     * @param {number} direction
     */
    answer(direction) {
        if (direction !== 0 && direction !== 1) {
            throw new Error(
                `Expected only 0 and 1 direction, but got: ${direction}`
            );
        }
        if (this.remainingQuestions.length === 0) {
            throw new Error(
                "Unexpected call to the answer method when " +
                "there are no remaining questions."
            )
        }
        if (this.questionIndex >= this.remainingQuestions.length) {
            throw new Error(
                `Unexpected question index ${this.questionIndex} ` +
                `when there are ${this.remainingQuestions.length} ` +
                "remaining question(s)."
            )
        }

        const question = this.remainingQuestions[this.questionIndex];

        if (question.correctAnswerIndex === direction) {
            this.playSuccess();

            const solvedQuestionAsArray = this.remainingQuestions.splice(
                this.questionIndex, 1
            );
            if (solvedQuestionAsArray.length !== 1) {
                throw new Error(
                    "Expected exactly one question to be removed from " +
                    "remaining questions, " +
                    `but we removed ${solvedQuestionAsArray.length}`
                )
            }

            this.solvedQuestions.push(solvedQuestionAsArray[0]);

            this.thiefDistance = Math.max(
                thiefMaxDistance,
                this.thiefDistance + 1
            );

            if (this.remainingQuestions.length === 0) {
                dialoguer.put(new DialogueBravo())
            } else {
                this.questionIndex = (
                    this.questionIndex % this.remainingQuestions.length
                );
                this.askTheQuestion();
            }
        } else {
            this.playMistake();
            this.questionIndex = (
                (this.questionIndex + 1) % this.remainingQuestions.length
            );
            this.askTheQuestion();
        }
    }

    initialHTML() {
        return `<div id="answer-container">
    <button id="left-answer" class="answer">
        &leftarrow;
    </button>
    <button id="right-answer" class="answer">
        &rightarrow;
    </button>
</div>


<div id="terrain">
    <span id="score">💎💎💎</span><span id="thief-distance"></span><span id="thief">👻</span>
</div>`;
    }

    restart() {
        dialoguer.put(new DialogueSelectLevel())
    }

    mount() {
        const that = this;

        document.getElementById("left-answer").onclick = () => {
            that.answer(0);
        };
        document.getElementById("right-answer").onclick = () => {
            that.answer(1);
        }

        this.askTheQuestion()
    }

    onGamepadButtonPressed(buttonIndex) {
        if (buttonIndex === buttonIndices.left) {
            this.answer(0);
        } else if (buttonIndex === buttonIndices.right) {
            this.answer(1);
        } else if (buttonIndex === buttonIndices.start) {
            this.restart();
        } else {
            // Pass.
        }
    }

    refreshQuestion() {
        if (this.remainingQuestions.length === 0) {
            throw new Error(
                "Unexpected no remaining questions during the play dialogue."
            )
        }

        if (this.questionIndex >= this.remainingQuestions.length) {
            throw new Error(
                `Unexpected question index ${this.questionIndex} ` +
                `when there are ${this.remainingQuestions.length} ` +
                "remaining question(s)."
            )
        }

        const question = this.remainingQuestions[this.questionIndex];

        if (question === undefined) {
            throw new Error(
                "Unexpected undefined question " +
                `for question index ${this.questionIndex} and when there are ` +
                `${this.remainingQuestions.length} remaining question(s).`
            )
        }

        if (question.answers === undefined) {
            console.error("question", question)
            throw new Error(
                "Unexpected undefined answers for a question, see error log."
            )
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

    refreshScore() {
        /**
         * @type {Array<string>}
         */
        const diamonds = [];
        for (let i = 0; i < this.solvedQuestions.length; i++) {
            diamonds.push("💎");
        }

        const text = diamonds.join("");
        updateInnerTextIfNeeded(
            document.getElementById("score"),
            text
        );
    }

    refreshThief() {
        const parts = [];
        for (let i = 0; i < this.thiefDistance; i++) {
            parts.push("&nbsp;");
        }
        document.getElementById("thief-distance").innerHTML = (
            parts.join("")
        );
    }


    refresh() {
        this.refreshQuestion();
        this.refreshScore();
        this.refreshThief();
    }

    tick(timestamp) {
        const temporalDelta = timestamp - this.thiefTimestamp;
        if (this.solvedQuestions.length > 0 && temporalDelta > 1000) {
            const spatialDelta = Math.round(temporalDelta / 1000);
            this.thiefDistance = Math.min(
                Math.max(
                    0,
                    this.thiefDistance + this.thiefDirection * spatialDelta
                ),
                thiefMaxDistance
            );

            if (
                this.thiefDistance === 0
                || this.thiefDistance === thiefMaxDistance
            ) {
                this.thiefDirection = -1 * this.thiefDirection;
            }

            if (this.thiefDistance === 0) {
                this.playStolen();
                const stolenQuestion = this.solvedQuestions.pop();
                if (stolenQuestion === undefined) {
                    throw new Error(
                        "Stolen question was undefined. The question index " +
                        `is ${this.questionIndex}, while there are ` +
                        `${this.solvedQuestions.length} solved question(s) ` +
                        `and ${this.remainingQuestions} remaining question(s).`
                    )
                }
                this.remainingQuestions.push(stolenQuestion);
            }

            this.thiefTimestamp = timestamp;
        }
    }

    unmount() {
        if (this.askingId !== null) {
            clearTimeout(this.askingId);
        }
    }
}

const bravoMessages = [
    "Bravo!",
    "Well done!",
    "Good job!",
    "Great job!",
    "Congratulations!"
]

/**
 * Congratulate the player and finish the game.
 * @implements IDialogue
 */
class DialogueBravo {

    initialHTML() {
        return `<div id="bravo-container">
    <div id="bravo">👏 Bravo! 👏</div>
    <button id="restart">Restart</button>
</div>`;
    }

    restart() {
        dialoguer.put(new DialogueSelectLevel())
    }

    mount() {
        document.getElementById("restart").onclick = () => {
            this.restart()
        }

        const messageIndex = Math.floor(Math.random() * bravoMessages.length);
        announce(bravoMessages[messageIndex])
            .catch(err => {
                console.log("Failed to say bravo", err)
            })


    }

    onGamepadButtonPressed(buttonIndex) {
        if (buttonIndex === buttonIndices.start) {
            this.restart();
        } else {
            // Pass.
        }
    }

    refresh() {
        // Intentionally empty.
    }

    tick(timestamp) {
        // Intentionally empty.
    }

    unmount() {
        // Intentionally empty.
    }
}

/**
 * Handle dialogue changes.
 */
class Dialoguer {
    constructor() {
        /**
         * Current dialogue
         * @type {IDialogue | null}
         */
        this.dialogue = null;
    }

    /**
     * Change the dialogue.
     * @param {IDialogue} dialogue
     */
    put(dialogue) {
        if (this.dialogue !== null) {
            this.dialogue.unmount();
        }

        this.dialogue = dialogue;

        const gameContainer = document.getElementById("game-container");
        gameContainer.innerHTML = this.dialogue.initialHTML();
        this.dialogue.mount();
    }
}

const dialoguer = new Dialoguer();

const systemState = {
    gamepads: [],
    activeGamepadIndex: null,
    speechSynthesisVoice: null,
    buttonsPressed: null,
    buttonsPressTimestamps: null
}

const gameState = {
    levelIndex: 0
}


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

function setupSpeechSynthesis() {
    systemState.speechSynthesisVoice = null;

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

            if (systemState.speechSynthesisVoice !== voice) {
                systemState.speechSynthesisVoice = voice;
            }
        }
    }
}

/**
 * Announce the text to the user.
 * @param text to be announced
 * @returns {Promise<void>}
 */
function announce(text) {
    console.log(`Announcing: ${text}`)
    if (systemState.speechSynthesisVoice === null) {
        return new Promise((resolve, _) => {
            console.log("No speech synthesis voice.")
            resolve()
        });
    }

    let utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = systemState.speechSynthesisVoice;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance)

    return new Promise((resolve, reject) => {
        utterance.onend = resolve;
        utterance.onerror = reject
    })
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
 * Add the style class if it is not already present in the element.
 * @param {HTMLElement} element
 * @param {string} cls
 */
function addClassIfNeeded(element, cls) {
    if (!element.classList.contains(cls)) {
        element.classList.add(cls)
    }
}

/**
 * Remove the style class if it is not already absent from the element.
 * @param {HTMLElement} element
 * @param {string} cls
 */
function removeClassIfNeeded(element, cls) {
    if (element.classList.contains(cls)) {
        element.classList.remove(cls)
    }
}

function changeActiveGamepad() {
    /**
     * @type {HTMLSelectElement}
     */
    const gamepadSelect = document.getElementById("gamepad-select");
    systemState.activeGamepadIndex = parseInt(gamepadSelect.value);
}

function updateGamepads() {
    /**
     * @type {Gamepad[]}
     */
    let gamepads = navigator.getGamepads().filter(gamepad => gamepad !== null);

    gamepads.sort((a, b) => a.index - b.index);

    systemState.gamepads = gamepads;

    if (systemState.gamepads.length === 0) {
        systemState.activeGamepadIndex = null;
    } else {
        let foundActiveAgain = false;

        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i].index === systemState.activeGamepadIndex) {
                foundActiveAgain = true;
                break;
            }
        }

        if (!foundActiveAgain) {
            systemState.activeGamepadIndex = systemState.gamepads[0].index;
        }
    }
}

/**
 * Handle the button presses at the system level.
 * @param {number} buttonIndex
 */
function reactOnButtonPress(buttonIndex) {
    if (dialoguer.dialogue !== null) {
        dialoguer.dialogue.onGamepadButtonPressed(buttonIndex)
    }
}

/**
 * Handle the change of the active gamepad at the system level.
 * @param {number} timestamp from the frame refresh
 */
function reactOnActiveGamepad(timestamp) {
    if (systemState.gamepads.length === 0) {
        return;
    }

    if (systemState.activeGamepadIndex === null) {
        throw new Error("Unexpected null for active gamepad index when gamepads are not empty")
    }

    /**
     * @type Gamepad
     */
    const gamepad = systemState.gamepads[systemState.activeGamepadIndex];

    const newButtonsPressed = gamepad.buttons.map(button => button.pressed);

    /**
     * React on the button presses at the end of this function since we are changing the state and this is not
     * a good idea to react on event *before* the state is in a valid shape.
     * @type {Array<number>}
     */
    const buttonPresses = [];

    if (systemState.buttonsPressed === null || systemState.buttonsPressed.length !== newButtonsPressed.length) {
        systemState.buttonsPressTimestamps = newButtonsPressed.map(() => 0);

        for (let i = 0; i < newButtonsPressed.length; i++) {
            if (newButtonsPressed[i]) {
                systemState.buttonsPressTimestamps[i] = timestamp;
                buttonPresses.push(i);
            }
        }

        systemState.buttonsPressed = newButtonsPressed;
    } else {
        if (systemState.buttonsPressTimestamps === null) {
            throw new Error("Buttons press-timestamps must be set when buttons pressed is set.")
        }

        if (systemState.buttonsPressTimestamps.length !== systemState.buttonsPressed.length) {
            throw new Error(
                "Expected length of button press-timestamps to match " +
                systemState.buttonsPressed.left +
                ", i.e., buttons pressed, but got: " +
                systemState.buttonsPressTimestamps.length
            )
        }


        for (let i = 0; i < newButtonsPressed.length; i++) {
            if (newButtonsPressed[i] && !systemState.buttonsPressed[i]) {
                const oldTimestamp = systemState.buttonsPressTimestamps[i]
                const delta = timestamp - oldTimestamp;

                // NOTE (mristin):
                // Debounce after a second
                if (delta > 1000) {
                    systemState.buttonsPressTimestamps[i] = timestamp;
                    buttonPresses.push(i);
                }
            }
        }

        systemState.buttonsPressed = newButtonsPressed;
    }

    if (systemState.buttonsPressed === null) {
        throw new Error("Unexpected unset buttons pressed at the end of react-on-active-gamepad.")
    }

    if (systemState.buttonsPressTimestamps === null) {
        throw new Error("Unexpected unset buttons press-timestamps at the end of react-on-active-gamepad.")
    }

    for (let i = 0; i < buttonPresses.length; i++) {
        reactOnButtonPress(buttonPresses[i]);
    }
}

function refreshGamepads() {
    /**
     * @type {HTMLSelectElement}
     */
    const gamepadSelect = document.getElementById("gamepad-select");
    gamepadSelect.innerHTML = "";

    for (let i = 0; i < systemState.gamepads.length; i++) {
        const gamepad = systemState.gamepads[i];

        /**
         * @type {HTMLOptionElement}
         */
        let option = document.createElement("option");

        if (gamepad.index === systemState.activeGamepadIndex) {
            option.selected = true;
        }
        option.text = gamepad.id;
        option.value = gamepad.index.toString();

        gamepadSelect.add(option);
    }
}


/**
 * Handle every frame redrawing.
 * @param {number} timestamp
 */
function handleFrame(timestamp) {
    updateGamepads();
    reactOnActiveGamepad(timestamp);

    if (dialoguer.dialogue !== null) {
        dialoguer.dialogue.tick(timestamp);
        dialoguer.dialogue.refresh();
    }

    refreshGamepads();

    requestAnimationFrame(handleFrame);
}

function main() {
    dialoguer.put(new DialoguePressHere());
    requestAnimationFrame(handleFrame);
}

window.onload = main;
