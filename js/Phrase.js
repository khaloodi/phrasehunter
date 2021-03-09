/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Display phrase on game board
     */

    addPhraseToDisplay() {
        let phraseSectionUL = document.getElementById('phrase').firstElementChild;
        [this.phrase].forEach(word => {
            [word].forEach(letter => {
                const lettersArray = letter.split('')
                for (let i = 0; i < lettersArray.length; i++) {
                    const li = document.createElement('li');
                    li.innerHTML = lettersArray[i];
                    if (!(lettersArray[i] === " ")) {
                        li.classList.add('hide', 'letter')
                    } else {
                        li.classList.add('space')
                    }
                    phraseSectionUL.appendChild(li)
                }
            })
        })
    }

    /**
     * Checks if passed letter is in phrase
     * @param (string) letter - Letter to check
     */
    checkLetter(letter) {
        const letterInPhrase = this.phrase.includes(letter) ? true : false;
        return letterInPhrase;
    }

    /**
     * Displays passed letter on screen if match is found
     * @param (string) letter - Letter to display
     */
    showMatchedLetter(letter) {
        if (this.phrase.includes(letter)) {
            for (let i = 0; i < this.phrase.length; i++) {
                if (this.phrase[i] === letter) {
                    document.querySelector('#phrase ul').children[i].classList.remove('hide');
                    document.querySelector('#phrase ul').children[i].classList.add('show');
                }
            }
        }
    }
}