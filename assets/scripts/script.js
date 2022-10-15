// define global variables
let wordSelection = ['trust','marry','parlor','failure'];
let possibleWords = [];
let usedWords = [];
let guessLettersParent = document.querySelector('#secretWord')
let currentWord = '';
let currentWordLetters = [];
let documentBody = document
let key =''
puzzleCharacters = [];
checkWordWin = [];


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

const populateBlanks = new Promise(function(resolve,reject) {
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
    document.addEventListener('keydown', function(event) {
        key = event.key.toLowerCase();
        console.log(key)
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
                for (let i = 0; i< puzzleCharacters.length; i ++) {
                    puzzleCharacters[i].textContent=key;
                };   
            };
          }
          checkWordWin = document.getElementsByClassName('gameletters');
          for (i=0;i<checkWordWin.length; i++) {
            if (checkWordWin.textContent === null || checkWordWin === "") {}
          }
    });
}