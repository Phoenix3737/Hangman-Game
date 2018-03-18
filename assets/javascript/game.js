window.addEventListener("keyup", function (e) {         // callback function
    process(e.key)
});

// selects a random word from an array.//
var wordArray = ['STARK', 'LANNISTER', 'WILDLING', 'DRAGON', 'WILDFIRE', 'WINTERFELL', 'BARATHEON', 'WESTEROS', 'FIRE', 'ICE']

var currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];

// set a limit to the number of guesses
var guessesRemainingElement = document.getElementById("guesses-remaining");

var alreadyGuessedElement = document.getElementById("already-guessed")

var alreadyGuessedState = ""

// intitialize starting count
var guessesRemainingCount = 15;

// display staring count
guessesRemainingElement.innerHTML = guessesRemainingCount;


// Get the node (element) that has the id of current-word
var currentWordElement = document.getElementById("current-word");

// initialize current state to nothing
var currentWordState = ""

// Make the current state a series of underscores with the same character length as the current word
for (var i = 0; i < currentWord.length; i++) {
    currentWordState = currentWordState.concat("_");
}

// make currentWordElement's text value = the string currentWordState
currentWordElement.innerHTML = currentWordState;

function process(key) {
    var upperCaseKey = key.toUpperCase()
    if (/[A-Z]/.test(upperCaseKey) && upperCaseKey.length === 1) {
        if (alreadyGuessedState.indexOf(upperCaseKey) > -1) {
            alert("You've already guessed that letter")
        }
        else {
            alreadyGuessedState = alreadyGuessedState + upperCaseKey;
            alreadyGuessedElement.innerHTML = alreadyGuessedState;
        }



        if (guessesRemainingCount > 1) { // then maybe check to see if the remaing count === 0???
            guessesRemainingCount--;
            guessesRemainingElement.innerHTML = guessesRemainingCount;
            if (currentWord.indexOf(upperCaseKey > -1)) {
                for (var i = 0; i < currentWord.length; i++) {
                    if (upperCaseKey === currentWord.charAt(i)) {
                        currentWordState = replaceAtIndex(currentWordState, i, upperCaseKey)
                        currentWordElement.innerHTML = currentWordState;
                    }

                }
                if (currentWordState.indexOf("_") === -1) {
                    window.removeEventListener("keyup", function () { });
                    alertMessage("You Win! - Click OK to Play Again");
                }



            }
        } else {

            guessesRemainingCount--;
            guessesRemainingElement.innerHTML = guessesRemainingCount;
            window.removeEventListener("keyup", function () { });
            alertMessage("Game Over - You Lose - Click OK to Play Again");


        }
    }
}

function alertMessage(message) {
    setTimeout(function () {
        alert(message);
        window.location.reload()
    }, 500)
}

function replaceAtIndex(originalString, index, replacement) {
    return originalString.substr(0, index) + replacement + originalString.substr(index + replacement.length);
}

// function process(key) {
//     alreadyGuessedDisplay.innerHTML = alreadyGuessedDisplayCount;
// }

// Kill key up can be used for:
// end game, already guessed non-response, 
















