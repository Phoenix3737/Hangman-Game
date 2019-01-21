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
var currentWordElement = document.getElementById("current-word");

// initialize current state to nothing
var currentWordState = "";

// Make the current state a series of underscores with the same character length as the current word
for (var i = 0; i < currentWord.length; i++) {
    currentWordState = currentWordState.concat("\u2589"); //<---- replace with Wheel of Fortune blocks//
    // console.log(currentWordState);
    // for (var i = 0; i < currentWordState; i++){
    // if (String.contains(Character.toString("\u2589") )){
        // console.log("I'm a block!");
    //    style character inline 
    // }
    // else{
    //     it's a letter so leave it alone 
    // }  
    // }
// }
}

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

        if (guessesRemainingCount > 1) {
            guessesRemainingCount--;
            guessesRemainingElement.innerHTML = guessesRemainingCount;
            if (currentWord.indexOf(upperCaseKey > -1)) {
                for (var i = 0; i < currentWord.length; i++) {
                    if (upperCaseKey === currentWord.charAt(i)) {
                        currentWordState = replaceAtIndex(currentWordState, i, upperCaseKey);
                        currentWordElement.innerHTML = currentWordState;
                    }
                }

                if (currentWordState.indexOf("\u2589") === -1) {
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

// function blockReplace(){
// var format = /\u2589/;
// console.log(currentWordElement.innerHTML);
// if( currentWordElement.innerHTML.match(format) ){
//     currentWordElement.innerHTML.replace("\u2589", "W");
//     console.log('true');
//     return true;
//   }else{
//     console.log('false');
//     return false;
//   }
// }

// blockReplace();

function replaceAtIndex(originalString, index, replacement) {
    return originalString.substr(0, index) + replacement + originalString.substr(index + replacement.length);
}







