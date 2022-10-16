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
let score= 0;


//initialize local storage for words and used words
possibleWords = JSON.parse(localStorage.getItem('possibleWordsSaved'));
//if possible word is empty, reset possible and used words
if (possibleWords === null) {
    //failsafe to format object in local storage populate with full string
    possibleWords = [];
    localStorage.setItem('possibleWordsSaved', JSON.stringify(possibleWords));
    possibleWords = wordSelection;
    localStorage.setItem('possibleWordsSaved', JSON.stringify(possibleWords));
    //set used words local and saved to blank
    usedWords = [];
    localStorage.setItem('usedWordsSaved', JSON.stringify('usedWords'))
}

const populateBlanks = new Promise(function (resolve, reject) {
    let randomIndex = Math.floor(Math.random() * wordSelection.length)
    console.log(randomIndex)
    currentWord = possibleWords[randomIndex];
    console.log(currentWord)
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

populateBlanks.then(listenForLetters());

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
    //   for (i=0;i<checkWordWin.length; i++) {
    //     if (checkWordWin[i].textContent !== null || checkWordWin[i] !== "") {}
    //   }
};


function endGameAndScore() {
    //count number of unique letters in puzzle word
    let uniqueLetters = new Set(currentWordLetters);
    console.log(uniqueLetters.size);
    let totalSelectedLetters = document.getElementsByClassName('selected')
   //calculate score based on unique letters, letters guessed, and total letters
    score = Math.round(((uniqueLetters.size/totalSelectedLetters.length)*100) + ((uniqueLetters.size/currentWordLetters.length) * 25));
    console.log(score)

};