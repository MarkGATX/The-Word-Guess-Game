// define global variables
let wordSelection = ['trust', 'marry', 'parlor', 'failure', 'software', 'predator', 'pelican', 'stream', 'software', 'lotion', 'drawer', 'speaker', 'tablet', 'pillow', 'mattress', 'speaker', 'variable', 'cartoon', 'universe', 'material', 'cushion', 'success', 'tornado', 'bicycle', 'monitor', 'poster', 'painting', 'traffic', 'package', 'tissue', 'baggage', 'shower', 'breakfast', 'donkey', 'kangaroo', 'gazelle', 'highway', 'student', 'armoir', 'cabinet', 'cupboard', 'pantry', 'building', 'castle', 'juggle', 'calendar'];
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
let hsTableBody = document.querySelector('tbody')
var timerInterval
var secondsLeft = 30;
var start = document.querySelector('.startButton')
var timeLeft = document.querySelector('.timeLeft');


//initialize score if needed
latestScores = JSON.parse(localStorage.getItem('wordGameSavedHighScores'));
// console.log(latestScores);
if (latestScores === [] || latestScores === null) {
    console.log(latestScores)
    latestScores = [['', 0]];
    console.log(latestScores)
    localStorage.setItem('wordGameSavedHighScores', JSON.stringify(latestScores));
}

// // Set the start button
start.addEventListener("click", startGame);


//The test timer function --- variable declared without var, let, or const is automatically global?!?!?
function startTimer() {
    timerInterval = setInterval(function () {
        if (secondsLeft <= 0) {
            timeLeft.innerText = 0;
        } else {
            timeLeft.innerText = secondsLeft;
        };
        if (secondsLeft < 10) {
            timeLeft.classList.add("text-danger");
        };
        secondsLeft--;
        if (secondsLeft <= 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            timeLeft.innerText = 0;
            // Calls function to create and append image
            currentScore = 0;
            scoreDisplayAndStorage();
        }
    }, 1000);
    // startGame();
}

// const = new Promise(function (resolve, reject) 
function populateBlanks() {
    //initialize local storage for words and used words
    start.remove();
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
    listenForLetters();
    startTimer();
};


function listenForLetters() {
    document.addEventListener('keydown', checkKeyValue);
}


function checkKeyValue(event) {
    key = event.key.toLowerCase();
    console.log(key)
    document.removeEventListener('keydown', checkKeyValue);
    //check to see if pressed a letter
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
        //if array of letter that match keypress isn't null, fill in
        if (puzzleCharacters !== null) {
            console.log(key)
            for (let i = 0; i < puzzleCharacters.length; i++) {

                puzzleCharacters[i].setAttribute('data-found', 'found')

                puzzleCharacters[i].textContent = key;
                puzzleCharacters[i].classList.add('correct');
            };
        };
    }
    checkWordWin = document.querySelectorAll(`[data-found=found]`);
    console.log(checkWordWin)
    if (checkWordWin.length === currentWordLetters.length) {
        clearInterval(timerInterval);
        endGameAndScore();
        return;
    }
    setTimeout(listenForLetters, 300);
};


function endGameAndScore() {
    //count number of unique letters in puzzle word
    document.removeEventListener('keydown', checkKeyValue);
    let finalWinAnimation = document.querySelectorAll('.gameLetters');
    console.log(finalWinAnimation)
    for (let i = 0; i < finalWinAnimation.length; i++) {
        finalWinAnimation[i].classList.add('win')
    }
    let uniqueLetters = new Set(currentWordLetters);
    console.log(uniqueLetters.size);
    let totalSelectedLetters = document.getElementsByClassName('selected')
    //calculate score based on unique letters, letters guessed, and total letters
    currentGameScore = Math.round(((uniqueLetters.size / totalSelectedLetters.length) * 250) + ((uniqueLetters.size / currentWordLetters.length) * 125) + (secondsLeft * 3.5));
    console.log(currentGameScore)
    let definitionTarget = document.querySelector('.letters');
    console.log(definitionTarget)
    let definitionTargetData = definitionTarget.getBoundingClientRect();
    console.log(definitionTargetData)
    console.log(definitionTargetData.top + window.scrollY);
    let definitionPane = document.querySelector('#definition');
    console.log(definitionPane)
    console.log(definitionTargetData.top)
    let topLoc = (definitionTargetData.top + window.scrollY +200) + "px";
    definitionPane.style.top = topLoc;
    definitionPane.classList.remove('hide')
    scoreDisplayAndStorage();
};

function scoreDisplayAndStorage() {
    var latestScores = JSON.parse(localStorage.getItem("wordGameSavedHighScores"));
    console.log(latestScores);
    // initialize scores variable if doesn't already exist in local storage
    if (latestScores === null || latestScores === []) {
        latestScores = [['', 0]];
        console.log(latestScores)
        localStorage.setItem("wordGameSavedHighScores", JSON.stringify(latestScores));
        //print results to screen
        scoreSection.innerHTML = '<p class="letters">Your final score is: ' + score + '.</p> <h2>New High Score!</h2><label for="initials">Enter your initials:</label> <div class="input-group justify-content-center"><input type="text" name="initials" class="initials" maxlength="15"></input><button id="initialSubmit" class="btn btn-outline-secondary">Submit</button></div>';
        //add event listener for button
        var hsSubmitButton = document.querySelector("#initialSubmit");
        hsSubmitButton.addEventListener("click", logHighScores);
    } else {
        // check to see if top ten scores
        console.log(latestScores)
        highScoresLength = latestScores.length;
        console.log(highScoresLength)
        for (i = 0; i < highScoresLength; i++) {
            if (currentGameScore >= latestScores[i][1]) {
                scoreSection.innerHTML = '<p class="letters">Your final score is: ' + currentGameScore + '.</p> <h2>New High Score!</h2><label for="initials">Enter your initials:</label><div class="input-group justify-content-center"> <input type="text" name="initials" class="initials" maxlength="15"></input><button class="initialSubmit btn btn-outline-secondary">Submit</button></div>';
                //add event listener for button
                var hsSubmitButton = document.querySelector(".initialSubmit");
                hsSubmitButton.addEventListener("click", logHighScores);
            } else {
                scoreSection.innerHTML = '<p class="letters">Your final score is: ' + currentGameScore + '.</p><button class="playAgain btn btn-outline-secondary">Play again?</button>';
                let startAgain = document.querySelector(".playAgain");
                startAgain.addEventListener("click", startOver);
            }
        }
    }
}

function logHighScores() {
    hsInitials = document.querySelector(".initials").value;
    console.log(hsInitials);
    scoreSection.innerHTML = '<button class="playAgain btn btn-outline-secondary">Play again?</button>';
    let startAgain = document.querySelector(".playAgain");
    startAgain.addEventListener("click", startOver);
    var latestScores = JSON.parse(localStorage.getItem("wordGameSavedHighScores"));
    //Make sure no more than 10 entries in latest scores
    console.log(latestScores)
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
                console.log('newhighscore')
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
                console.log('newmiddlescore')
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
    hsInitials.value = "";
    //save new high scores
    localStorage.setItem("wordGameSavedHighScores", JSON.stringify(latestScores));
    buildHighScoresTable();
}

function buildHighScoresTable() {
    var latestScores = JSON.parse(localStorage.getItem('wordGameSavedHighScores'));
    console.log(latestScores)
    hsTableBody.innerHTML = "";
    for (let i = 0; i < latestScores.length; i++) {
        let scoreRow = document.createElement('tr');
        scoreRow.innerHTML = `<td>${latestScores[i][0]}</td><td>${latestScores[i][1]}</td>`;
        hsTableBody.append(scoreRow);
    }

}

function startGame() {
    let prevSelectedLetters = document.querySelectorAll('.selected');
    console.log(prevSelectedLetters)
    if (prevSelectedLetters.length !== 0) {
        for (let i = 0; i < prevSelectedLetters.length; i++) {
            prevSelectedLetters[i].classList.add('active');
            prevSelectedLetters[i].classList.remove('selected');
        }
        guessLettersParent.innerHTML = "";
    }
    console.log('getready')
    populateBlanks();
    // populateBlanks.then(listenForLetters());
}

function startOver() {
    location.reload();
}

buildHighScoresTable();
// startGame();