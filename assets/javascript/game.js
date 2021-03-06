var isActive = true;


//Event listener for keys//
window.addEventListener("keyup", function (e) {
    if (isActive === false) {
        if (e.keyCode === 13) { //<--- Press enter to play agian//
            window.location.reload();
        }
    }
    else {
        process(e.key);
    }
});

//Event listener for audio to play when the game starts//
document.getElementById("mute").style.display = "none";
window.addEventListener("keyup", function mute() {
    document.getElementById("mute").style.display = "block";
    var audio = document.getElementById("music");
    audio.volume = 0.1;
    audio.play();
    //Mute button//
    var muteButton = document.getElementById("mute");
    muteButton.onclick = function () {
        if (audio.paused) {
            audio.play();
            document.getElementById("mute").src = "http://franriavilla.in/images/mute.png";
        } else {
            audio.pause();
            document.getElementById("mute").src = "http://franriavilla.in/images/unmute.png";
            removeEventListener("keyup", mute); //<--remove listener so that audio doesn't restart after key press//
        }
    }
}
);

// selects a random word from an array.//
var wordArray = ['STARK', 'LANNISTER', 'WILDLING', 'DRAGON',
    'WILDFIRE', 'WINTERFELL', 'BARATHEON', 'WESTEROS',
    'WOLF', 'LION', 'DRAGONSTONE', 'FIRE', 'ICE']

var currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];

// set a limit to the number of guesses
var guessesRemainingElement = document.getElementById("guesses-remaining");

var alreadyGuessedElement = document.getElementById("already-guessed");

var winsElement = document.getElementById("wins");

var winsState = localStorage.getItem("wins") ? parseInt(localStorage.getItem("wins")) : 0;

var losesElement = document.getElementById("loses");

var losesState = localStorage.getItem("loses") ? parseInt(localStorage.getItem("loses")) : 0;

var infoElement = document.getElementById("info");

var alreadyGuessedState = "";

// intitialize starting count
var guessesRemainingCount = 15;

// display staring count
guessesRemainingElement.innerHTML = guessesRemainingCount;


// Get the node (element) that has the id of current-word
var currentWordElement = $("#current-word");

// initialize current state to nothing
var currentWordState = [];

// Make the current state a series of underscores with the same character length as the current word
for (var i = 0; i < currentWord.length; i++) {
    currentWordElement.append(
        $('<div class="blank"></div>')
    );
}
console.log(currentWord);

// make currentWordElement's text value = the string currentWordState
currentWordElement.innerHTML = currentWordState;

winsElement.innerHTML = winsState;

losesElement.innerHTML = losesState;

var resetButton = document.getElementById("reset");

resetButton.onclick = function () {
    localStorage.clear(winsState, losesState);
    window.location.reload();
};

function process(key) {
    var upperCaseKey = key.toUpperCase()
    if (/[A-Z]/.test(upperCaseKey) && upperCaseKey.length === 1) {
        infoElement.style.visibility = 'hidden';
        if (alreadyGuessedState.indexOf(upperCaseKey) > -1) {
            infoElement.style.visibility = 'visible';
            infoElement.innerHTML = "You've already guessed that letter";
            guessesRemainingCount++; //<--So that it doesnt count as a turn//
        }
        else {
            alreadyGuessedState = alreadyGuessedState + upperCaseKey;
            alreadyGuessedElement.innerHTML = alreadyGuessedState;
        }

        if (guessesRemainingCount > 0) {
            guessesRemainingCount--;
            guessesRemainingElement.innerHTML = guessesRemainingCount;
            if (currentWord.indexOf(upperCaseKey > -1)) {
                for (var i = 0; i < currentWord.length; i++) {
                    if (upperCaseKey === currentWord.charAt(i)) {
                        console.log($('#current-word div').eq(i).index());
                        var selectedDiv = $('#current-word div').eq(i);
                        selectedDiv.html(currentWord.charAt(i).toUpperCase());
                        selectedDiv.css({
                            backgroundColor: 'transparent'
                        });
                        selectedDiv.attr("class", "letter");
                    }
                }

                if  (!$("div.blank").length) {
                    infoElement.style.visibility = 'visible';
                    infoElement.innerHTML = "You Win! - Press enter to play again";
                    isActive = false;
                    winsState = localStorage.getItem("wins") ? parseInt(localStorage.getItem("wins")) : 0;
                    localStorage.setItem("wins", winsState + 1);
                }
            }
        }

        else {

            guessesRemainingCount--;
            guessesRemainingElement.innerHTML = guessesRemainingCount;
            infoElement.style.visibility = 'visible';
            infoElement.innerHTML = "Game Over - You Lose - Press enter to play again";
            isActive = false;
            losesState = localStorage.getItem("loses") ? parseInt(localStorage.getItem("loses")) : 0;
            localStorage.setItem("loses", losesState + 1);
        }
    }
}



function replaceAtIndex(originalString, index, replacement) {
    return originalString.substr(0, index) + replacement + originalString.substr(index + replacement.length);
}







