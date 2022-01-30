document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    const keys = document.querySelectorAll(".keyboard-row button");
    const word = "bonks";
    let guesses = [[]];
    let availableSpace = 1;

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const key = target.getAttribute("data-key");

            if (key == "enter") {
                submitGuess();
                return;
            }
            
            updateGuess(key);
        };
    }

    function submitGuess() {
        const guess = getCurrentGuess();

        if (guess.length !== 5) {
            window.alert("Word must be 5 letters");
            return;
        }

        const currentWord = guess.join("");
        console.log(`current guess: ${currentWord}`);

        if (currentWord === word) {
            window.alert("u got it");
        }

        if (guesses.length === 6) {
            window.alert("noob lol");
        }

        guesses.push([]);
    }

    function getCurrentGuess() {
        const numGuesses = guesses.length;
        return guesses[numGuesses - 1];
    }

    function updateGuess(letter) {
        const currentWord = getCurrentGuess();

        if (currentWord && currentWord.length < 5) {
            currentWord.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;
        }
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let i = 0; i < 30; i++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", i + 1);
            gameBoard.appendChild(square);
        }
    }

});