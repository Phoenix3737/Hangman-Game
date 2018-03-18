var isActive = true;

window.addEventListener("keyup", function (e) {         // callback function
    if ( isActive === false && e.keyCode === 13){
        window.location.reload()
    }
    process(e.key)
});
// selects a random word from an array.//
var wordArray = ['STARK', 'LANNISTER', 'WILDLING', 'DRAGON', 'WILDFIRE', 'WINTERFELL', 'BARATHEON', 'WESTEROS', 'FIRE', 'ICE']

var currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];

// set a limit to the number of guesses
var guessesRemainingElement = document.getElementById("guesses-remaining");

var alreadyGuessedElement = document.getElementById("already-guessed")

var infoElement = document.getElementById("info")

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
        infoElement.style.visibility = 'hidden';
        if (alreadyGuessedState.indexOf(upperCaseKey) > -1) {
            infoElement.style.visibility = 'visible';
            infoElement.innerHTML = "You've already guessed that letter";
        }
        else {
            alreadyGuessedState = alreadyGuessedState + upperCaseKey;
            alreadyGuessedElement.innerHTML = alreadyGuessedState;
        }



        if (guessesRemainingCount > 1) { 
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
                    infoElement.style.visibility = 'visible';
                    infoElement.innerHTML = "You Win! - Press enter to play again";
                    isActive = false;
                    localStorage.setItem("wins", localStorage.getItem("wins") + 1);
                }



            }
        } else {

            guessesRemainingCount--;
            guessesRemainingElement.innerHTML = guessesRemainingCount;
            window.removeEventListener("keyup", function () { });
            infoElement.style.visibility = 'visible';
            infoElement.innerHTML = "Game Over - You Lose - Press enter to play again";
            isActive = false;
            localStorage.setItem("loses", localStorage.getItem("loses") + 1);


        }
    }
}



function replaceAtIndex(originalString, index, replacement) {
    return originalString.substr(0, index) + replacement + originalString.substr(index + replacement.length);
}

// function process(key) {
//     alreadyGuessedDisplay.innerHTML = alreadyGuessedDisplayCount;
// }

// Kill key up can be used for:
// end game, already guessed non-response, 
















