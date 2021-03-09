/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrase();
        this.activePhrase = null;
    }

    /** 
     * Creates phrases for use in the game
     * @return {array} returns an array of phrases that can be used in the game
     */

    createPhrase() {
        const phrases = [
            new Phrase('life is like a box of chocolates'),
            new Phrase('there is no try only do'),
            new Phrase('i found you ms new booty'),
            new Phrase('are you talking to me'),
            new Phrase('i fear the man who has practiced one kick ten thousand times')
        ]
        return phrases;
    }

    /** 
     * Selects random phrase from phrases property
     * @return {Object} phrase object chosen to be used
     */

    getRandomPhrase() {
        const random = this.phrases[Math.floor(Math.random() * this.phrases.length)]
        return random
    }

    /**
     * Begins game by selecting a random phrase and displaying it to the user
     */
    startGame() {
        const overlay = document.getElementById('overlay');
        const startGame = document.getElementById('btn__reset');
        startGame.addEventListener('click', e => {
            overlay.style.display = 'none';
        })
        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay()
    }

    /**
     * Checks for winning move
     * @return {boolean} True if game has been won, false if game hasn't been won
     */
    checkForWin() {
        const listOfLetters = document.querySelector('#phrase ul').children

        for (el of listOfLetters) {
            if (el.className.includes('hide')) {
                return false;
            }
        }
        return true;
    }

    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends the game if player is out
     */
    removeLife() {
        if (this.missed == 4) {
            this.gameOver(false);
        }
        const scoreBoard = document.querySelector('#scoreboard ol').children
        let i = 0;
        do {
            scoreBoard[i].firstElementChild.src = "./images/lostHeart.png";
            i++
        } while (i <= this.missed)
        this.missed += 1;
    }

    /**
     * Displays game over message
     * @param (boolean) gameWon - Whether or not the user won the game
     */
    gameOver(gameWon) {
        const overlay = document.getElementById('overlay');
        overlay.classList.remove('start');
        overlay.style.display = '';
        const h1 = document.getElementById('game-over-message')
        if (gameWon) {
            h1.innerHTML = 'Great Job!';
            overlay.classList.add('win');
        } else {
            h1.innerHTML = 'Sorry better luck next time.';
            overlay.classList.add('lose');
        }
    }

    /**
     * Handles on screen keyboard button clicks
     * @param (HTMLButtonElement) button - The clicked button element
     */
    handleInteraction(button) {
        button.disabled = true;
        if (this.activePhrase.phrase.includes(button.innerText) == false) {
            button.classList.add('wrong');
            this.removeLife();
        }
        if (this.activePhrase.phrase.includes(button.innerText) == true) {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(button.innerText);
            if (this.checkForWin()) {
                this.gameOver(true);
            }
        }
    }
}