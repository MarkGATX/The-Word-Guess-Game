// define global variables
let wordSelection = ['trust', 'marry', 'parlor', 'failure'];
let possibleWords = [];
let usedWords = [];
let guessLettersParent = document.querySelector('#secretWord')
let currentWord = '';
let currentWordLetters = [];
let documentBody = document
let key = ''
let puzzleCharacters = [];
let checkWordWin = [];
let currentGameScore = 0;
let scoreSection = document.querySelector('.currentScore')

//initialize score if needed
latestScores = JSON.parse(localStorage.getItem('wordGameSavedHighScores'));
// console.log(latestScores);
// if (latestScores === [] || latestScores === null) {
console.log(latestScores)    
latestScores = [['',0]];
    console.log(latestScores)
    localStorage.setItem('wordGameSavedHighScores', JSON.stringify(latestScores));
// }

console.log(scoreSection)


//initialize local storage for words and used words
possibleWords = JSON.parse(localStorage.getItem('possibleWordsSaved'));
usedWords = JSON.parse(localStorage.getItem('usedWordsSaved'))
//if possible word is empty, reset possible and used words
console.log(possibleWords)
if (possibleWords === null || possibleWords.length === 0) {
    //failsafe to format object in local storage populate with full string
    possibleWords = [];
    localStorage.setItem('possibleWordsSaved', JSON.stringify(possibleWords));
    possibleWords = wordSelection;
    console.log(possibleWords)
    localStorage.setItem('possibleWordsSaved', JSON.stringify(possibleWords));
    //set used words local and saved to blank
    usedWords = [];
    localStorage.setItem('usedWordsSaved', JSON.stringify(usedWords))
}

const populateBlanks = new Promise(function (resolve, reject) {
    console.log(wordSelection);
    let randomIndex = Math.floor(Math.random() * possibleWords.length)
    console.log(randomIndex)
    currentWord = possibleWords[randomIndex];
    //move current word from possible words to used words
    possibleWords.splice(randomIndex, 1);
    console.log(possibleWords)
    usedWords.push(currentWord);
    console.log(usedWords)
    localStorage.setItem('possibleWordsSaved', JSON.stringify(possibleWords));
    localStorage.setItem('usedWordsSaved', JSON.stringify(usedWords));
    console.log(currentWord)
    //make current word an array to populate li on page
    currentWordLetters = currentWord.split('');
    console.log(currentWordLetters)
    //create empty li for each letter in words
    for (let i = 0; i < currentWordLetters.length; i++) {
        console.log(i)
        let letterLi = document.createElement('li');
        console.log(letterLi)
        letterLi.classList.add('gameLetters', 'col-1', 'border-bottom', 'border-5', 'border-dark');
        console.log(letterLi)
        letterLi.setAttribute('data-puzzle-letter', currentWordLetters[i]);
        console.log(letterLi)
        guessLettersParent.appendChild(letterLi);
        console.log(guessLettersParent)
    }
});


function listenForLetters() {
    document.addEventListener('keydown', checkKeyValue);
}


function checkKeyValue(event) {
    key = event.key.toLowerCase();
    console.log(key)
    document.removeEventListener('keydown', checkKeyValue);
    var alphabetCharacters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    if (alphabetCharacters.includes(key)) {
        let characterLog = document.querySelector(`[data-letter="${key}"]`)
        characterLog.classList.remove('active');
        characterLog.classList.add('selected')
        // for (var i = 0; i < elements.length; i++) {
        //   elements[i].textContent += event.key;
        // }
        puzzleCharacters = document.querySelectorAll(`[data-puzzle-letter=${key}]`);
        console.log(puzzleCharacters);
        if (puzzleCharacters !== null) {
            console.log(key)
            for (let i = 0; i < puzzleCharacters.length; i++) {
                puzzleCharacters[i].textContent = key;
                puzzleCharacters[i].setAttribute('data-found', 'found')
            };
        };
    }
    checkWordWin = document.querySelectorAll(`[data-found=found]`);
    console.log(checkWordWin)
    if (checkWordWin.length === currentWordLetters.length) {
        endGameAndScore();
        return;
    }
    setTimeout(listenForLetters, 500);
};


function endGameAndScore() {
    //count number of unique letters in puzzle word
    let uniqueLetters = new Set(currentWordLetters);
    console.log(uniqueLetters.size);
    let totalSelectedLetters = document.getElementsByClassName('selected')
    //calculate score based on unique letters, letters guessed, and total letters
    currentGameScore = Math.round(((uniqueLetters.size / totalSelectedLetters.length) * 100) + ((uniqueLetters.size / currentWordLetters.length) * 25));
    console.log(currentGameScore)
    scoreDisplayAndStorage();
};

function scoreDisplayAndStorage() {
    var latestScores = JSON.parse(localStorage.getItem("wordGameSavedHighScores"));
    console.log(latestScores);
    //initialize scores variable if doesn't already exist in local storage
    // if (latestScores === null || latestScores === []) {
    //     latestScores = [['',0]];
    //     console.log(latestScores)
    //     localStorage.setItem("wordGameSavedHighScores", JSON.stringify(latestScores));
    //     //print results to screen
    //     scoreSection.innerHTML = '<p>Your final score is: ' + score + '.</p> <h2>New High Score!</h2><label for="initials">Enter your initials:</label> <input type="text" name="initials" class="initials" maxlength="15"></input><button id="initialSubmit" class="btn btn-outline-secondary">Submit</button>';
    //     //add event listener for button
    //     var hsSubmitButton = document.querySelector("#initialSubmit");
    //     hsSubmitButton.addEventListener("click", logHighScores);
    // } else {
        //check to see if top ten scores
        console.log(latestScores)
        highScoresLength = latestScores.length;
        console.log(highScoresLength)
        for (i = 0; i < highScoresLength; i++) {
            if (currentGameScore >= latestScores[i][1]) {
                scoreSection.innerHTML = '<p>Your final score is: ' + currentGameScore + '.</p> <h2>New High Score!</h2><label for="initials">Enter your initials:</label> <input type="text" name="initials" class="initials" maxlength="15"></input><button class="initialSubmit btn btn-outline-secondary">Submit</button>';
                //add event listener for button
                var hsSubmitButton = document.querySelector(".initialSubmit");
                hsSubmitButton.addEventListener("click", logHighScores);
            } else {
                scoreSection.innerHTML = '<p>Your final score is: ' + currentGameScore + '.</p><button class="playAgain btn btn-outline-secondary">play Again?</button>';
                let startAgain = document.querySelector(".playAgain");
                startAgain.addEventListener("click", startGame);
            }
        }
    }
// }

function logHighScores() {
    hsInitials = document.querySelector(".initials").value;
    var latestScores = JSON.parse(localStorage.getItem("wordGameSavedHighScores"));
    //Make sure no more than 10 entries in latest scores
    console.log(currentGameScore)
    if (latestScores > 10) {
        latestScores.pop();
    }
    highScoresLength = latestScores.length;
    //find location in high scores array for latest high score
    for (i = 0; i < highScoresLength; i++) {
        if (currentGameScore >= latestScores[i][1]) {
            if (i === 0) {
                //add new score to beginning, then add to i to stop loop
                latestScores.unshift([hsInitials, currentGameScore]);
                i = i + highScoresLength;
                //double check if latest score only has 10 items
                if (latestScores.length > 10) {
                    latestScores.pop();

                }
            } else if (i === 10) {
                // if at the end of the array, remove the last item and add the new data
                latestScores.pop();
                latestScores.push([hsInitials, currentGameScore]);
            } else {
                // add new data in the current index
                latestScores.splice(i, 0, [hsInitials, currentGameScore]);
                //force for loop to close4
                i = i + 10;
                //if latestscore is now > 10, remove the last element
                if (latestScores.length > 10) {
                    latestScores.pop();
                }
            }
        }
    }
    //save new high scores
    localStorage.setItem("wordGameSavedHighScores", JSON.stringify(latestScores));
}

function startGame() {
    populateBlanks.then(listenForLetters());
}

startGame();