// noinspection HtmlRequiredAltAttribute

console.log("Navigator platform is", navigator.platform)
console.log("User agent is", navigator.userAgent)

function determineAndLogBrowser() {
    // NOTE (mristin):
    // See https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browsers

    const browser = (function () {
        var test = function (regexp) {
            return regexp.test(window.navigator.userAgent)
        }
        switch (true) {
            case test(/edg/i):
                return "Microsoft Edge";
            case test(/trident/i):
                return "Microsoft Internet Explorer";
            case test(/firefox|fxios/i):
                return "Mozilla Firefox";
            case test(/opr\//i):
                return "Opera";
            case test(/ucbrowser/i):
                return "UC Browser";
            case test(/samsungbrowser/i):
                return "Samsung Browser";
            case test(/chrome|chromium|crios/i):
                return "Google Chrome";
            case test(/safari/i):
                return "Apple Safari";
            default:
                return "Other";
        }
    })();

    console.log("Detected browser is", browser);
}

determineAndLogBrowser()

import * as bodyPose from "./bodyPose.js";

const thiefMaxDistance = 10;

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
            {question: "worm", answer: "🪱"},
            {
                question: "orca killer whale",
                answer: "<img src='additional-emojis/orca.png'>"
            },
            {question: "egg", answer: "🥚"}
        ]
    },
    {
        name: "City",
        vocabulary: [
            {
                question: "city",
                answer: "<img src='additional-emojis/city.png'>"
            },
            {question: "building", answer: "🏢"},
            {question: "house", answer: "🏠"},
            {
                question: "park",
                answer: "🌳<img src='additional-emojis/bench.png'>🛝🌳"
            },
            {
                question: "bench",
                answer: "<img src='additional-emojis/bench.png'>"
            },
            {
                question: "playground",
                answer: (
                    "🛝" +
                    "<img src='additional-emojis/swing.png'>" +
                    "<img src='additional-emojis/sandbox.png'"
                )
            },
            {question: "slide", answer: "🛝"},
            {
                question: "swing",
                answer: "<img src='additional-emojis/swing.png'>"
            },
            {
                question: "sandbox",
                answer: "<img src='additional-emojis/sandbox.png'>"
            },
            {question: "car", answer: "🚗"},
            {question: "bus", answer: "🚌"},
            {question: "train", answer: "🚆"},
            {question: "train station", answer: "🚉"},
            {
                question: "bench",
                answer: "<img src='additional-emojis/bench.png'>"
            },
            {
                question: "road",
                answer: "<img src='additional-emojis/road.png'>"
            },
            {
                question: "street",
                answer: "<img src='additional-emojis/street.png'>"
            },
            {
                question: "sidewalk",
                answer: "<img src='additional-emojis/sidewalk.png'>"
            },
            {question: "traffic light", answer: "🚦"},
            {question: "airplane", answer: "🛬"},
            {
                question: "airport",
                answer: "<img src='additional-emojis/airport.png'>"
            },
            {
                question: "restaurant",
                answer: "<img src='additional-emojis/restaurant.png'>"
            },
            {
                question: "shop",
                answer: "<img src='additional-emojis/shop.png'>"
            },
            {
                question: "supermarket",
                answer: "<img src='additional-emojis/supermarket.png'>"
            },
            {question: "hospital", answer: "🏥"},
            {question: "ambulance", answer: "🚑"},
            {question: "fire truck", answer: "🚒"},
            {question: "policeman", answer: "👮"},
            {question: "police car", answer: "🚓"},
            {
                question: "police station",
                answer: "<img src='additional-emojis/police-station.png'>"
            },
            {
                question: "harbor",
                answer: "<img src='additional-emojis/harbor.png'>"
            },
            {question: "ship", answer: "🚢"},
            {question: "boat", answer: "🛥️"},
            {question: "tram car", answer: "🚋"},
            {
                question: "theater",
                answer: "<img src='additional-emojis/theater.png'>"
            },
            {
                question: "cinema",
                answer: "<img src='additional-emojis/cinema.png'>"
            },
        ]
    },
    {
        name: "Emotions",
        vocabulary: [
            {question: "happy", answer: "😀"},
            {question: "tired", answer: "🥱"},
            {question: "worried", answer: "😟"},
            {question: "angry", answer: "😠"},
            {question: "proud", answer: "😊"},
            {question: "bored", answer: "🫤"},
            {question: "excited", answer: "😃"},
            {question: "upset", answer: "😭"},
            {question: "embarrassed", answer: "🫣"},
            {question: "sad", answer: "😢"},
            {question: "insulted", answer: "😞"},
            {question: "sick", answer: "🤒"},
            {question: "hungry", answer: "😋"},
            {
                question: "thirsty",
                answer: "<img src='additional-emojis/thirsty.png'>"
            },
            {
                question: "lonely",
                answer: "<img src='additional-emojis/lonely.png'>"
            },
            {question: "surprised", answer: "😲"},
            {question: "relaxed", answer: "😌"},
            {question: "scared", answer: "😨"},
            {question: "pensive", answer: "🤔"},
            {question: "furious", answer: "😤"},
            {question: "hurt", answer: "🤕"},
            {question: "cold", answer: "🥶"},
            {question: "hot", answer: "🥵"},
            {question: "nervous", answer: "🤯"},
            {question: "in love", answer: "😍"},
            {question: "silly", answer: "🤪"},
            {question: "disappointed", answer: "😒"},
        ]
    },
    {
        name: "Vehicles",
        vocabulary: [
            {question: "car", answer: "🚗"},
            {question: "racing car", answer: "🏎️"},
            {question: "bicycle", answer: "🚲"},
            {question: "motor bike", answer: "🏍️"},
            {question: "tram car", answer: "🚋"},
            {question: "locomotive", answer: "🚂"},
            {question: "train carriage", answer: "🚃"},
            {
                question: "carriage",
                answer: "<img src='additional-emojis/carriage.png'>"
            },
            {question: "ship", answer: "🚢"},
            {question: "boat", answer: "🛥️"},
            {question: "rocket", answer: "🚀"},
            {
                question: "space ship",
                answer: "<img src='additional-emojis/space-ship.png'>"
            },
            {
                question: "airship",
                answer: "<img src='additional-emojis/airship.png'>"
            },
            {question: "skateboard", answer: "🛹"},
            {question: "roller skate", answer: "🛼"},
            {question: "ice skate", answer: "⛸"},
            {
                question: "inline skate",
                answer: "<img src='additional-emojis/inline-skate.png'>"
            },
            {question: "kick scooter", answer: "🛴"},
            {question: "parachute", answer: "🪂"},
            {question: "airplane", answer: "🛬"},
            {question: "helicopter", answer: "🚁"},
            {question: "truck", answer: "🚚"},
            {
                question: "submarine",
                answer: "<img src='additional-emojis/submarine.png'>"
            },
            {question: "train", answer: "🚆"},
            {question: "bus", answer: "🚌"},
            {
                question: "van",
                answer: "<img src='additional-emojis/van.png'>"
            },
            {question: "ski", answer: "🎿"},
            {question: "snowboard", answer: "🏂"},
            {question: "sledge", answer: "🛷"},
        ]
    },
    {
        name: "Colors",
        vocabulary: [
            "black",
            "brown",
            "grey",
            "white",
            "yellow",
            "orange",
            "red",
            "pink",
            "purple",
            "blue",
            "green",
            "dark blue",
            "light blue",
            "turquoise",
            "light green",
            "dark green",
            "dark red",
            "lime",
            "olive",
        ].map(text => {
            const noSpace = text.replace(" ", "");
            return {
                question: text,
                answer: `<span  style='color: ${noSpace}; background-color: white;'>⬤</span>`
            }
        })
    },
    {
        name: "Plants",
        vocabulary: [
            {question: "tree", answer: "🌳"},
            {question: "fir-tree", answer: "🌲"},
            {question: "palm tree", answer: "🌴"},
            {question: "cactus", answer: "🌵"},
            {
                question: "grass",
                answer: "<img src='additional-emojis/grass.png'>"
            },
            {
                question: "bush",
                answer: "<img src='additional-emojis/bush.png'>"
            },
            {question: "leaf", answer: "🍁"},
            {
                question: "branch",
                answer: "<img src='additional-emojis/branch.png'>"
            },
            {
                question: "stump",
                answer: "<img src='additional-emojis/stump.png'>"
            },
            {
                question: "trunk",
                answer: "<img src='additional-emojis/trunk.png'>"
            },
            {
                question: "flower",
                answer: "<img src='additional-emojis/flower.png'>"
            },
            {question: "mushroom", answer: "🍄"},
            {
                question: "root",
                answer: "<img src='additional-emojis/root.png'>"
            },
            {
                question: "fruit",
                answer: "<img src='additional-emojis/fruit-on-tree.png'>"
            },
            {question: "seedling", answer: "🌱"},
            {
                question: "seed",
                answer: "<img src='additional-emojis/seed.png'>"
            },
            {
                question: "sprout",
                answer: "<img src='additional-emojis/sprout.png'>"
            },
            {
                question: "soil",
                answer: "<img src='additional-emojis/soil.png'>"
            },
            {
                question: "fertile",
                answer: "<img src='additional-emojis/fertile-soil.png'>"
            },
            {
                question: "rain",
                answer: "<img src='additional-emojis/rain.png'>"
            },
            {question: "sun", answer: "☀"},
            {
                question: "pinecone",
                answer: "<img src='additional-emojis/pinecone.png'>"
            },
            {
                question: "forest",
                answer: "<img src='additional-emojis/forest.png'>"
            },
            {
                question: "meadow",
                answer: "<img src='additional-emojis/meadow.png'>"
            },
        ]
    },
    {
        name: "Actions 1",
        vocabulary: [
            {
                question: "to go",
                answer: "<img src='additional-emojis/to-go.png'>"
            },
            {
                question: "to eat",
                answer: "<img src='additional-emojis/to-eat.png'>"
            },
            {
                question: "to drink",
                answer: "<img src='additional-emojis/to-drink.png'>"
            },
            {
                question: "to sleep",
                answer: "<img src='additional-emojis/to-sleep.png'>"
            },
            {
                question: "to run",
                answer: "<img src='additional-emojis/to-run.png'>"
            },
            {
                question: "to bring",
                answer: "<img src='additional-emojis/to-bring.png'>"
            },
            {
                question: "to cook",
                answer: "<img src='additional-emojis/to-cook.png'>"
            },
            {
                question: "to clean",
                answer: "<img src='additional-emojis/to-clean.png'>"
            },
            {
                question: "to wash",
                answer: "<img src='additional-emojis/to-wash.png'>"
            },
            {
                question: "to climb",
                answer: "<img src='additional-emojis/to-climb.png'>"
            },
            {
                question: "to draw",
                answer: "<img src='additional-emojis/to-draw.png'>"
            },
            {
                question: "to write",
                answer: "<img src='additional-emojis/to-write.png'>"
            },
            {
                question: "to read",
                answer: "<img src='additional-emojis/to-read.png'>"
            },
            {
                question: "to play",
                answer: "<img src='additional-emojis/to-play.png'>"
            },
            {
                question: "to listen",
                answer: "<img src='additional-emojis/to-listen.png'>"
            },
            {
                question: "to hide",
                answer: "<img src='additional-emojis/to-hide.png'>"
            },
            {
                question: "to see",
                answer: "<img src='additional-emojis/to-see.png'>"
            },
            {
                question: "to watch",
                answer: "<img src='additional-emojis/to-watch.png'>"
            },
            {
                question: "to build",
                answer: "<img src='additional-emojis/to-build.png'>"
            },
            {
                question: "to think",
                answer: "<img src='additional-emojis/to-think.png'>"
            },
            {
                question: "to dream",
                answer: "<img src='additional-emojis/to-dream.png'>"
            },
            {
                question: "to work",
                answer: "<img src='additional-emojis/to-work.png'>"
            },
            {
                question: "to yell",
                answer: "<img src='additional-emojis/to-yell.png'>"
            },
        ]
    },
    {
        name: "Actions 2",
        vocabulary: [
            {
                question: "to ride",
                answer: "<img src='additional-emojis/to-ride.png'>"
            },
            {
                question: "to ask",
                answer: "<img src='additional-emojis/to-ask.png'>"
            },
            {
                question: "to answer",
                answer: "<img src='additional-emojis/to-answer.png'>"
            },
            {
                question: "to say",
                answer: "<img src='additional-emojis/to-say.png'>"
            },
            {
                question: "to tell",
                answer: "<img src='additional-emojis/to-tell.png'>"
            },
            {
                question: "to search",
                answer: "<img src='additional-emojis/to-search.png'>"
            },
            {
                question: "to count",
                answer: "<img src='additional-emojis/to-count.png'>"
            },
            {
                question: "to open",
                answer: "<img src='additional-emojis/to-open.png'>"
            },
            {
                question: "to close",
                answer: "<img src='additional-emojis/to-close.png'>"
            },
            {
                question: "to sit",
                answer: "<img src='additional-emojis/to-sit.png'>"
            },
            {
                question: "to stand",
                answer: "<img src='additional-emojis/to-stand.png'>"
            },
            {
                question: "to lie",
                answer: "<img src='additional-emojis/to-lie.png'>"
            },
            {
                question: "to squat",
                answer: "<img src='additional-emojis/to-squat.png'>"
            },
            {
                question: "to hit",
                answer: "<img src='additional-emojis/to-hit.png'>"
            },
            {
                question: "to throw",
                answer: "<img src='additional-emojis/to-throw.png'>"
            },
            {
                question: "to steal",
                answer: "<img src='additional-emojis/to-steal.png'>"
            },
            {
                question: "to hold",
                answer: "<img src='additional-emojis/to-hold.png'>"
            },
            {
                question: "to pay",
                answer: "<img src='additional-emojis/to-pay.png'>"
            },
            {
                question: "to buy",
                answer: "<img src='additional-emojis/to-buy.png'>"
            },
            {
                question: "to brush",
                answer: "<img src='additional-emojis/to-brush.png'>"
            },
            {
                question: "to remember",
                answer: "<img src='additional-emojis/to-remember.png'>"
            },
            {
                question: "to lead",
                answer: "<img src='additional-emojis/to-lead.png'>"
            },
            {
                question: "to feel",
                answer: "<img src='additional-emojis/to-feel.png'>"
            },
        ]
    },
    {
        name: "Actions 3",
        vocabulary: [
            {
                question: "to help",
                answer: "<img src='additional-emojis/to-help.png'>"
            },
            {
                question: "to push",
                answer: "<img src='additional-emojis/to-push.png'>"
            },
            {
                question: "to pull",
                answer: "<img src='additional-emojis/to-pull.png'>"
            },
            {
                question: "to teach",
                answer: "<img src='additional-emojis/to-teach.png'>"
            },
            {
                question: "to learn",
                answer: "<img src='additional-emojis/to-learn.png'>"
            },
            {
                question: "to study",
                answer: "<img src='additional-emojis/to-study.png'>"
            },
            {
                question: "to live",
                answer: "<img src='additional-emojis/to-live.png'>"
            },
            {
                question: "to fly",
                answer: "<img src='additional-emojis/to-fly.jpeg'>"
            },
            {
                question: "to swim",
                answer: "<img src='additional-emojis/to-swim.png'>"
            },
            {
                question: "to fight",
                answer: "<img src='additional-emojis/to-fight.png'>"
            },
            {
                question: "to follow",
                answer: "<img src='additional-emojis/to-follow.png'>"
            },
            {
                question: "to give",
                answer: "<img src='additional-emojis/to-give.png'>"
            },
            {
                question: "to stop",
                answer: "<img src='additional-emojis/to-stop.png'>"
            },
            {
                question: "to walk",
                answer: "<img src='additional-emojis/to-walk.png'>"
            },
            {
                question: "to win",
                answer: "<img src='additional-emojis/to-win.png'>"
            },
            {
                question: "to love",
                answer: "<img src='additional-emojis/to-love.png'>"
            },
            {
                question: "to wait",
                answer: "<img src='additional-emojis/to-wait.png'>"
            },
            {
                question: "to scream",
                answer: "<img src='additional-emojis/to-scream.png'>"
            },
            {
                question: "to cry",
                answer: "<img src='additional-emojis/to-cry.png'>"
            },
            {
                question: "to pee",
                answer: "<img src='additional-emojis/to-pee.png'>"
            },
            {
                question: "to poo",
                answer: "<img src='additional-emojis/to-poo.png'>"
            },
            {
                question: "to fart",
                answer: "<img src='additional-emojis/to-fart.png'>"
            },
            {
                question: "to drive",
                answer: "<img src='additional-emojis/to-drive.png'>"
            },
        ]
    },
    {
        name: "Foods and Drinks",
        vocabulary: [
            {
                question: "to eat",
                answer: "<img src='additional-emojis/to-eat.png'>"
            },
            {
                question: "to drink",
                answer: "<img src='additional-emojis/to-drink.png'>"
            },
            {
                question: "to smell",
                answer: "<img src='additional-emojis/to-smell.png'>"
            },
            {
                question: "to taste",
                answer: "<img src='additional-emojis/to-taste.png'>"
            },
            {
                question: "chicken",
                answer: "<img src='additional-emojis/chicken-meat.png'>"
            },
            {
                question: "cheese",
                answer: "<img src='additional-emojis/cheese.png'>"
            },
            {
                question: "meat",
                answer: "<img src='additional-emojis/meat.png'>"
            },
            {question: "fish", answer: "🐟"},
            {question: "tomato", answer: "🍅"},
            {question: "carrot", answer: "🥕"},
            {question: "eggplant", answer: "🍆"},
            {question: "peas", answer: "🫛"},
            {
                question: "zucchini",
                answer: "<img src='additional-emojis/zucchini.png'>"
            },
            {question: "beans", answer: "🫘"},
            {question: "grapes", answer: "🍇"},
            {question: "blueberries", answer: "🫐"},
            {question: "pineapple", answer: "🍍"},
            {question: "mango", answer: "🥭"},
            {question: "corn", answer: "🌽"},
            {question: "popcorn", answer: "🍿"},
            {question: "potato", answer: "🥔"},
            {question: "broccoli", answer: "🥦"},
            {question: "apple", answer: "🍏"},
            {question: "lemon", answer: "🍋"},
            {question: "orange", answer: "🍊"},
            {question: "banana", answer: "🍌"},
            {question: "pear", answer: "🍐"},
            {question: "watermelon", answer: "🍉"},
            {question: "cherries", answer: "🍒"},
            {question: "strawberry", answer: "🍓"},
            {
                question: "raspberry",
                answer: "<img src='additional-emojis/raspberry.png'>"
            },
            {
                question: "blackberry",
                answer: "<img src='additional-emojis/blackberry.png'>"
            },
            {question: "peach", answer: "🍑"},
            {question: "kiwi fruit", answer: "🥝"},
            {question: "cucumber", answer: "🥒"},
            {question: "melon", answer: "🍈"},
            {question: "coconut", answer: "🥥"},
            {question: "chestnut", answer: "🌰"},
            {question: "onion", answer: "🧅"},
            {question: "garlic", answer: "🧄"},
            {question: "olive", answer: "🫒"},
            {question: "bell pepper", answer: "🫑"},
            {question: "hot pepper", answer: "🌶"},
            {question: "pizza", answer: "🍕"},
            {question: "spaghetti", answer: "🍝"},
            {question: "rice", answer: "🍚"},
            {question: "ice cream", answer: "🍨"},
            {question: "doughnut", answer: "🍩"},
            {question: "cookie", answer: "🍪"},
            {question: "cake", answer: "🎂"},
            {question: "cupcake", answer: "🧁"},
            {question: "pie", answer: "🥧"},
            {question: "bread", answer: "🍞"},
            {question: "croissant", answer: "🥐"},
            {question: "bacon", answer: "🥓"},
            {question: "pancakes", answer: "🥞"},
            {question: "egg", answer: "🥚"},
            {question: "french fries", answer: "🍟"},
            {question: "hamburger", answer: "🍔"},
            {question: "sandwich", answer: "🥪"},
            {question: "soup", answer: "🍲"},
            {question: "spoon", answer: "🥄"},
            {
                question: "fork",
                answer: "<img src='additional-emojis/fork.png'>"
            },
            {
                question: "knife",
                answer: "<img src='additional-emojis/knife-for-eating.png'>"
            },
            {
                question: "plate",
                answer: "<img src='additional-emojis/plate.png'>"
            },
            {
                question: "bowl",
                answer: "<img src='additional-emojis/bowl.png'>"
            },
            {
                question: "pot",
                answer: "<img src='additional-emojis/pot.png'>"
            },
            {
                question: "pan",
                answer: "<img src='additional-emojis/pan.png'>"
            },
            {question: "water", answer: "🚰"},
            {question: "salt", answer: "🧂"},
            {
                question: "pepper",
                answer: "<img src='additional-emojis/pepper.png'>"
            },
            {
                question: "straw",
                answer: "<img src='additional-emojis/straw-for-drinking.png'>"
            },
            {question: "pretzel", answer: "🥨"},
            {question: "peanut", answer: "🥜"},
            {
                question: "walnut",
                answer: "<img src='additional-emojis/walnut.png'>"
            },
            {
                question: "hazelnut",
                answer: "<img src='additional-emojis/hazelnut.png'>"
            },
            {
                question: "juice",
                answer: "<img src='additional-emojis/juice.png'>"
            },
            {question: "lollipop", answer: "🍭"},
            {question: "tongue", answer: "👅"},
            {question: "nose", answer: "👃"},
            {
                question: "jam",
                answer: "<img src='additional-emojis/jam.png'>"
            },
            {question: "butter", answer: "🧈"},
            {
                question: "oil",
                answer: "<img src='additional-emojis/oil-for-eating.png'>"
            },
            {
                question: "sour",
                answer: "<img src='additional-emojis/sour.png'>"
            },
            {
                question: "sweet",
                answer: "<img src='additional-emojis/sweet.png'>"
            },
            {
                question: "breakfast",
                answer: "<img src='additional-emojis/breakfast.png'>"
            },
            {
                question: "lunch",
                answer: "<img src='additional-emojis/lunch.png'>"
            },
            {
                question: "dinner",
                answer: "<img src='additional-emojis/dinner.png'>"
            },
            {
                question: "milk",
                answer: "<img src='additional-emojis/milk.png'>"
            },
            {
                question: "pumpkin",
                answer: "<img src='additional-emojis/pumpkin.png'>"
            },
            {
                question: "mushroom",
                answer: "<img src='additional-emojis/mushroom-for-eating.png'>"
            },
            {
                question: "plum",
                answer: "<img src='additional-emojis/plum.png'>"
            },
            {
                question: "fig",
                answer: "<img src='additional-emojis/fig.png'>"
            },
            {
                question: "vegetables",
                answer: "<img src='additional-emojis/vegetables.png'>"
            },
            {
                question: "fruits",
                answer: "<img src='additional-emojis/fruits.png'>"
            },
            {
                question: "berries",
                answer: "<img src='additional-emojis/berries.png'>"
            },
            {
                question: "napkin",
                answer: "<img src='additional-emojis/napkin.png'>"
            },
            {
                question: "table",
                answer: "<img src='additional-emojis/table.png'>"
            },
            {
                question: "chair",
                answer: "<img src='additional-emojis/chair.png'>"
            },
            {
                question: "water bottle",
                answer: "<img src='additional-emojis/water-bottle.png'>"
            },
            {
                question: "bottle",
                answer: "<img src='additional-emojis/bottle.png'>"
            },
        ]
    },
    {
        name: "Middle ages",
        vocabulary: [
            {
                question: "castle",
                answer: "<img src='additional-emojis/castle.png'>"
            },
            {
                question: "fortress",
                answer: "<img src='additional-emojis/fortress.png'>"
            },
            {
                question: "palace",
                answer: "<img src='additional-emojis/palace.png'>"
            },
            {
                question: "knight",
                answer: "<img src='additional-emojis/knight.png'>"
            },
            {
                question: "horse",
                answer: "<img src='additional-emojis/knights-horse.png'>"
            },
            {
                question: "king",
                answer: "<img src='additional-emojis/king.png'>"
            },
            {
                question: "queen",
                answer: "<img src='additional-emojis/queen.png'>"
            },
            {
                question: "princess",
                answer: "<img src='additional-emojis/princess.png'>"
            },
            {
                question: "prince",
                answer: "<img src='additional-emojis/prince.png'>"
            },
            {
                question: "sword",
                answer: "<img src='additional-emojis/sword.png'>"
            },
            {
                question: "shield",
                answer: "<img src='additional-emojis/shield.png'>"
            },
            {
                question: "shield",
                answer: "<img src='additional-emojis/shield.png'>"
            },
            {
                question: "armor",
                answer: "<img src='additional-emojis/knights-armor.png'>"
            },
            {
                question: "helmet",
                answer: "<img src='additional-emojis/knights-helmet.png'>"
            },
            {
                question: "mace",
                answer: "<img src='additional-emojis/mace.png'>"
            },
            {
                question: "stirrup",
                answer: "<img src='additional-emojis/stirrup.png'>"
            },
            {
                question: "reins",
                answer: "<img src='additional-emojis/reins.jpg'>"
            },
            {
                question: "halter",
                answer: "<img src='additional-emojis/horse-halter.jpg'>"
            },
            {
                question: "saddle",
                answer: "<img src='additional-emojis/horse-saddle.png'>"
            },
            {
                question: "catapult",
                answer: "<img src='additional-emojis/catapult.png'>"
            },
            {
                question: "bow",
                answer: "<img src='additional-emojis/archers-bow.png'>"
            },
            {
                question: "arrow",
                answer: "<img src='additional-emojis/archers-arrow.png'>"
            },
            {
                question: "crossbow",
                answer: "<img src='additional-emojis/crossbow.png'>"
            },
            {
                question: "spear",
                answer: "<img src='additional-emojis/spear.png'>"
            },
            {
                question: "sabre",
                answer: "<img src='additional-emojis/sabre.png'>"
            },
            {
                question: "katana",
                answer: "<img src='additional-emojis/katana.png'>"
            },
            {
                question: "boots",
                answer: "<img src='additional-emojis/boots.png'>"
            },
            {
                question: "cannon",
                answer: "<img src='additional-emojis/cannon.png'>"
            },
            {
                question: "cannonball",
                answer: "<img src='additional-emojis/cannonball.png'>"
            },
            {
                question: "pistol",
                answer: "<img src='additional-emojis/medieval-pistol.png'>"
            },
            {
                question: "gun",
                answer: "<img src='additional-emojis/medieval-gun.png'>"
            },
            {
                question: "galley",
                answer: "<img src='additional-emojis/galley.png'>"
            },
            {
                question: "fleet",
                answer: "<img src='additional-emojis/fleet.png'>"
            },
            {
                question: "torch",
                answer: "<img src='additional-emojis/torch.png'>"
            },
            {
                question: "throne",
                answer: "<img src='additional-emojis/throne.png'>"
            },
            {
                question: "moat",
                answer: "<img src='additional-emojis/moat.png'>"
            },
            {
                question: "bridge",
                answer: "<img src='additional-emojis/castle-bridge.png'>"
            },
            {
                question: "gate",
                answer: "<img src='additional-emojis/castle-gate.png'>"
            },
            {
                question: "guard",
                answer: "<img src='additional-emojis/castle-guard.png'>"
            },
            {
                question: "tower",
                answer: "<img src='additional-emojis/castle-tower.png'>"
            },
            {
                question: "kingdom",
                answer: "<img src='additional-emojis/medieval-kingdom.png'>"
            },
            {
                question: "kingdom",
                answer: "<img src='additional-emojis/medieval-kingdom.png'>"
            },
            {
                question: "nobleman",
                answer: "<img src='additional-emojis/medieval-nobleman.png'>"
            },
            {
                question: "emperor",
                answer: "<img src='additional-emojis/emperor.png'>"
            },
            {
                question: "empress",
                answer: "<img src='additional-emojis/empress.png'>"
            },
            {
                question: "empire",
                answer: "<img src='additional-emojis/empire.png'>"
            },
            {
                question: "servant",
                answer: "<img src='additional-emojis/servant.png'>"
            },
            {
                question: "peasant",
                answer: "<img src='additional-emojis/peasant.png'>"
            },
            {
                question: "robber",
                answer: "<img src='additional-emojis/robber.png'>"
            },
            {
                question: "thief",
                answer: "<img src='additional-emojis/thief.png'>"
            },
        ]
    },
    {
        name: "Body parts",
        vocabulary: [
            {
                question: "leg",
                answer: "<img src='additional-emojis/leg.png'>"
            },
            {
                question: "arm",
                answer: "<img src='additional-emojis/arm.png'>"
            },
            {
                question: "hand",
                answer: "<img src='additional-emojis/hand.png'>"
            },
            {
                question: "palm",
                answer: "<img src='additional-emojis/hand-palm.png'>"
            },
            {
                question: "head",
                answer: "<img src='additional-emojis/head.png'>"
            },
            {
                question: "brain",
                answer: "<img src='additional-emojis/brain.png'>"
            },
            {
                question: "nose",
                answer: "<img src='additional-emojis/nose.png'>"
            },
            {
                question: "mouth",
                answer: "<img src='additional-emojis/mouth.png'>"
            },
            {
                question: "lips",
                answer: "<img src='additional-emojis/lips.png'>"
            },
            {
                question: "foot",
                answer: "<img src='additional-emojis/foot.png'>"
            },
            {
                question: "sole",
                answer: "<img src='additional-emojis/foot-sole.png'>"
            },
            {
                question: "heel",
                answer: "<img src='additional-emojis/heel-pain.png'>"
            },
            {
                question: "elbow",
                answer: "<img src='additional-emojis/elbow.png'>"
            },
            {
                question: "knee",
                answer: "<img src='additional-emojis/knee.png'>"
            },
            {
                question: "penis",
                answer: "<img src='additional-emojis/penis.png'>"
            },
            {
                question: "vulva",
                answer: "<img src='additional-emojis/vulva.png'>"
            },
            {
                question: "bottom",
                answer: "<img src='additional-emojis/butt.png'>"
            },
            {
                question: "stomach",
                answer: "<img src='additional-emojis/stomach.png'>"
            },
            {
                question: "belly",
                answer: "<img src='additional-emojis/belly.png'>"
            },
            {
                question: "shoulder",
                answer: "<img src='additional-emojis/shoulder.png'>"
            },
            {
                question: "tongue",
                answer: "<img src='additional-emojis/tongue.png'>"
            },
            {
                question: "tooth",
                answer: "<img src='additional-emojis/tooth.png'>"
            },
            {
                question: "teeth",
                answer: "<img src='additional-emojis/teeth.png'>"
            },
            {
                question: "chest",
                answer: "<img src='additional-emojis/body-chest.png'>"
            },
            {
                question: "eye",
                answer: "<img src='additional-emojis/eye.png'>"
            },
            {
                question: "hair",
                answer: "<img src='additional-emojis/hair.png'>"
            },
            {
                question: "back",
                answer: "<img src='additional-emojis/body-back.png'>"
            },
            {
                question: "ankle",
                answer: "<img src='additional-emojis/ankle.png'>"
            },
            {
                question: "wrist",
                answer: "<img src='additional-emojis/wrist.png'>"
            },
            {
                question: "breast",
                answer: "<img src='additional-emojis/breast.png'>"
            },
            {
                question: "finger",
                answer: "<img src='additional-emojis/finger.png'>"
            },
            {
                question: "toe",
                answer: "<img src='additional-emojis/toe.png'>"
            },
            {
                question: "paw",
                answer: "<img src='additional-emojis/paw.png'>"
            },
            {
                question: "tail",
                answer: "<img src='additional-emojis/tail.png'>"
            },
            {
                question: "claw",
                answer: "<img src='additional-emojis/claw.png'>"
            },
            {
                question: "torso",
                answer: "<img src='additional-emojis/torso.png'>"
            },
            {
                question: "beak",
                answer: "<img src='additional-emojis/beak.png'>"
            },
            {
                question: "mane",
                answer: "<img src='additional-emojis/mane.png'>"
            },
            {
                question: "cheek",
                answer: "<img src='additional-emojis/cheek.png'>"
            },
            {
                question: "eyebrow",
                answer: "<img src='additional-emojis/eyebrow.png'>"
            },
            {
                question: "eyelashes",
                answer: "<img src='additional-emojis/eyelashes.png'>"
            },
            {
                question: "neck",
                answer: "<img src='additional-emojis/neck.png'>"
            },
            {
                question: "throat",
                answer: "<img src='additional-emojis/throat.png'>"
            },
            {
                question: "lungs",
                answer: "<img src='additional-emojis/lungs.png'>"
            },
            {
                question: "heart",
                answer: "<img src='additional-emojis/heart.png'>"
            },
            {
                question: "blood",
                answer: "<img src='additional-emojis/blood.png'>"
            },
            {
                question: "mucus",
                answer: "<img src='additional-emojis/mucus.png'>"
            },
            {
                question: "tear",
                answer: "<img src='additional-emojis/tear.png'>"
            },
            {
                question: "sweat",
                answer: "<img src='additional-emojis/sweat.png'>"
            },
        ]
    },
    {
        name: "School",
        vocabulary: [
            {
                question: "school",
                answer: "🏫"
            },
            {
                question: "teacher",
                answer: "<img src='additional-emojis/teacher.png'>"
            },
            {
                question: "blackboard",
                answer: "<img src='additional-emojis/blackboard.png'>"
            },
            {
                question: "desk",
                answer: "<img src='additional-emojis/desk.png'>"
            },
            {
                question: "chair",
                answer: "<img src='additional-emojis/office-chair.png'>"
            },
            {
                question: "student",
                answer: "<img src='additional-emojis/student.png'>"
            },
            {
                question: "school bag",
                answer: "<img src='additional-emojis/school-bag.png'>"
            },
            {
                question: "pencil",
                answer: "✏"
            },
            {
                question: "eraser",
                answer: "<img src='additional-emojis/eraser.png'>"
            },
            {
                question: "pen",
                answer: "<img src='additional-emojis/pen.png'>"
            },
            {
                question: "sheet of paper",
                answer: "<img src='additional-emojis/sheet-of-paper.png'>"
            },
            {
                question: "notebook",
                answer: "📔"
            },
            {
                question: "ruler",
                answer: "📏"
            },
            {
                question: "book",
                answer: "📖"
            },
            {
                question: "abacus",
                answer: "🧮"
            },
            {
                question: "mathematics",
                answer: "<img src='additional-emojis/mathematics.png'>"
            },
            {
                question: "music",
                answer: "<img src='additional-emojis/music-lesson.png'>"
            },
            {
                question: "sports",
                answer: "<img src='additional-emojis/sports-lesson.png'>"
            },
            {
                question: "peer",
                answer: "<img src='additional-emojis/school-peer.png'>"
            },
            {
                question: "drawing compass",
                answer: "<img src='additional-emojis/drawing-compass.png'>"
            },
            {
                question: "marker",
                answer: "<img src='additional-emojis/marker.png'>"
            },
            {
                question: "school yard",
                answer: "<img src='additional-emojis/school-yard.png'>"
            },
            {
                question: "school gym",
                answer: "<img src='additional-emojis/school-gym.jpg'>"
            },
            {
                question: "class room",
                answer: "<img src='additional-emojis/class-room.png'>"
            },
            {
                question: "scissors",
                answer: "✂"
            },
            {
                question: "pencil case",
                answer: "<img src='additional-emojis/pencil-case.png'>"
            },
            {
                question: "glasses",
                answer: "👓"
            }
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

function logAllQuestionsForAdaptationsToOtherLanguages() {
    // NOTE (mristin):
    // We log all the questions across all the levels facilitate adaptations
    // to other languages.
    const parts = [];
    for (let i = 0; i < levels.length; i++) {
        const level = levels[i];

        parts.push(`Level ${i}: ${level.name}\n`);

        for (let j = 0; j < level.vocabulary.length; j++) {
            const questionAnswer = level.vocabulary[j];
            parts.push(`Question ${j}: ${questionAnswer.question}\n`);
        }
    }

    console.log(parts.join(""))
}

logAllQuestionsForAdaptationsToOtherLanguages();

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
 * Handle the hand raise.
 * @function
 * @name IDialogue#onHandRaised
 * @param {number} handEvent to be handled
 * @param {number} timestamp of the recognized video frame
 * @returns {void}
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
Click here when you are ready to start.
</button>`;
    }

    mount() {
        const pressStart = document.getElementById("press-start");
        pressStart.onclick = () => {
            dialoguer.put(new DialogueWaitingForSpeechSynthesis())
        };
    }

    refresh() {
        // Intentionally empty.
    }

    onHandRaised(handEvent, timestamp) {
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

    onHandRaised(handEvent, timestamp) {
        // Intentionally empty.
    }

    tick(timestamp) {
        if (this.lastTick === null || timestamp - this.lastTick > 1000) {
            if (window.speechSynthesis.getVoices().length > 0) {
                setupSpeechSynthesis();
                dialoguer.put(new DialogueAskForVideo());
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

    refresh() {
        // Intentionally empty.
    }

    onHandRaised(handEvent, timestamp) {
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
 * Ask the user for video and start recognizing.
 * @implements IDialogue
 */
class DialogueAskForVideo {
    initialHTML() {
        return `<div id="message" class="announcement">
Waiting for the video recognition to initialize...
</div>`;
    }

    mount() {
        const args = {
            container: document.getElementById("video-container"),
            width: 280,
            height: 160,
            callback: function (pose, timestamp) {
                // Intentionally empty, only for initialization.
            }
        };

        const handler = bodyPose.newHandRaisingHandler(
            systemState.onHandRaised
        );

        args.callback = function (pose, timestamp) {
            // We switch to the actual handler on the first recognized frame.
            handler(pose, timestamp);

            args.callback = handler;
            dialoguer.put(new DialogueSelectLevel());
        }

        bodyPose
            .initializeRecognition(args)
            .catch((error) => {
                console.error("Error with the video recognition:", error);
                dialoguer.put(new DialogueNoVideoRecognition());
            });
    }

    refresh() {
        // Intentionally empty.
    }

    onHandRaised(handEvent, timestamp) {
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
 * Inform the user that the game can not be played as there is no video
 * recognition.
 * @implements IDialogue
 */
class DialogueNoVideoRecognition {
    initialHTML() {
        return `<div class='announcement'>
No video recognition is available in your browser. Perhaps you have no 
internet connection or you did not allow video access?
</div>`;
    }

    mount() {
        // Intentionally empty.
    }

    refresh() {
        // Intentionally empty.
    }

    onHandRaised(handEvent, timestamp) {
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

        // TODO: add instructions

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
        if (this.levelIndex + delta < 0) {
            this.levelIndex = levels.length + (this.levelIndex + delta);
        } else {
            this.levelIndex = (this.levelIndex + delta) % levels.length;
        }

        this.announceLevel();
    }

    onHandRaised(handEvent, _) {
        if (handEvent === bodyPose.HandEvent.LeftRaised) {
            this.changeSelection(-1);
        } else if (handEvent === bodyPose.HandEvent.RightRaised) {
            this.changeSelection(+1);
        } else if (handEvent === bodyPose.HandEvent.BothRaised) {
            this.startTheGame();
        } else {
            // Pass.
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

    refresh() {
        // Intentionally empty.
    }

    onHandRaised(handEvent, timestamp) {
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

        console.log(
            `Asking the question at index ${this.questionIndex} out of ` +
            `${this.remainingQuestions.length} remaining questions: ${text}`
        );

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

            console.log(
                `The answer was correct. Now you have ` +
                `${this.solvedQuestions} solved question(s) ` +
                `and ${this.remainingQuestions.length} remaining questions. `
            )

            if (this.remainingQuestions.length === 0) {
                console.log(
                    "Since there are no remaining questions, we move to " +
                    "the bravo dialogue."
                )
                dialoguer.put(new DialogueBravo())
            } else {
                console.log(
                    `The question at index ${this.questionIndex} has been ` +
                    `answered correctly.`
                )
                this.questionIndex = (
                    this.questionIndex % this.remainingQuestions.length
                );
                console.log(
                    `We are now going to ask the question ` +
                    `at index ${this.questionIndex} in the array of ` +
                    `${this.remainingQuestions.length} remaining question(s).`
                )
                this.askTheQuestion();
            }
        } else {
            console.log(
                `We made a mistake at answering the question ` +
                `at index ${this.questionIndex} out of ` +
                `${this.remainingQuestions.length} remaining question(s).`
            )
            this.playMistake();
            this.questionIndex = (
                (this.questionIndex + 1) % this.remainingQuestions.length
            );

            console.log(
                `We are now moving to ask the next question, ` +
                `at index ${this.questionIndex}, out of ` +
                `${this.remainingQuestions.length} remaining question(s).`
            )
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
            console.log("Received click on the left answer.")
            that.answer(0);
        };
        document.getElementById("right-answer").onclick = () => {
            console.log("Received click on the right answer.")
            that.answer(1);
        }

        this.askTheQuestion()
    }

    onHandRaised(handEvent, _) {
        if (handEvent === bodyPose.HandEvent.LeftRaised) {
            this.answer(0);
        } else if (handEvent === bodyPose.HandEvent.RightRaised) {
            this.answer(1);
        } else if (handEvent === bodyPose.HandEvent.BothRaised) {
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

        updateInnerHTMLIfNeeded(
            document.getElementById("left-answer"),
            question.answers[0].text
        );

        updateInnerHTMLIfNeeded(
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

    refresh() {
        // Intentionally empty.
    }

    onHandRaised(handEvent, timestamp) {
        if (handEvent === bodyPose.HandEvent.BothRaised) {
            this.restart();
        }
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
    speechSynthesisVoice: null,
    onHandRaised: function (handEvent, timestamp) {
        console.log("Hand event observed: ", handEvent);

        if (dialoguer.dialogue !== null) {
            dialoguer.dialogue.onHandRaised(handEvent, timestamp);
        }
    }
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
        utterance.onerror = (errorEvent) => {
            if (errorEvent.error === 'interrupted') {
                resolve();
            } else {
                reject(errorEvent)
            }
        }
    })
}


const dummyElementForHTMLCanonicalization = document.createElement(
    "div"
);

/**
 * Update the inner HTML of the element if it differs from the given text.
 * @param {HTMLElement} element
 * @param {string} code HTML code
 */
function updateInnerHTMLIfNeeded(element, code) {
    dummyElementForHTMLCanonicalization.innerHTML = code;
    const canonicalized = dummyElementForHTMLCanonicalization.innerHTML;

    if (canonicalized !== element.innerHTML) {
        element.innerHTML = canonicalized;
    }
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

/**
 * Handle every frame redrawing.
 * @param {number} timestamp
 */
function handleFrame(timestamp) {
    if (dialoguer.dialogue !== null) {
        dialoguer.dialogue.tick(timestamp);
        dialoguer.dialogue.refresh();
    }

    requestAnimationFrame(handleFrame);
}

function main() {
    dialoguer.put(new DialoguePressHere());
    requestAnimationFrame(handleFrame);
}

window.onload = main;
