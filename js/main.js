document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    const keys = document.querySelectorAll(".keyboard-row button");
    const word = "bonks";
    let guesses = [[]];
    let availableSpace = 1;
    let finished = false;

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const key = target.getAttribute("data-key");
            input(key);
        };
    }

    document.onkeyup = function (e) {
        let code = e.code;
        code = code.replace("Key", "");
        code = code.toLowerCase();

        input(code);
    };

    function input(code) {
        if (finished) return;
        if (code == "enter") {
            submitGuess();
            return;
        }

        updateGuess(code);
    }

    function getTileClass(letter, index) {
        const contains = word.includes(letter);

        if (!contains) {
            return "incorrect";
        }

        const correctLetter = word.charAt(index);

        if (letter === correctLetter) {
            return "correct";
        } else {
            return "misplaced";
        }
    }

    function submitGuess() {
        const guess = getCurrentGuess();

        if (guess.length !== 5) {
            window.alert("Word must be 5 letters");
            return;
        }

        const firstLetterId = (guesses.length - 1) * 5 + 1
        const interval = 500;
        let letters = [];
        guess.forEach((letter, index) => {
            const cl = getTileClass(letter, index);
            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(String(letterId));
            letters.push({l: letter, c: cl});
            setTimeout(() => {
                letterEl.classList.add("animate__flipInX");
                letterEl.classList.add(cl);
            }, interval * index);
        });

        setTimeout(() => {
            for (let i = 0; i < letters.length; i++) {
                const key = document.getElementById(letters.at(i).l);
                key.classList.remove("misplaced");
                key.classList.add(letters.at(i).c);
            }
        }, interval * 6);

        const currentWord = guess.join("");
        console.log(`current guess: ${currentWord}`);

        if (currentWord === word) {
            finished = true;
        }

        if (guesses.length === 6) {
            finished = true;
        }

        guesses.push([]);
    }

    function getCurrentGuess() {
        const numGuesses = guesses.length;
        return guesses[numGuesses - 1];
    }

    function updateGuess(letter) {
        const currentWord = getCurrentGuess();

        if (currentWord) {
            if (letter === "backspace" && currentWord.length !== 0) {
                currentWord.pop();
                const lastLetter = document.getElementById(String(availableSpace - 1));
                availableSpace = availableSpace - 1;
                lastLetter.textContent = "";
            } else if (currentWord.length < 5 && /^[a-z]$/.test(letter)) {
                currentWord.push(letter);

                const availableSpaceEl = document.getElementById(String(availableSpace));
                availableSpace = availableSpace + 1;

                availableSpaceEl.textContent = letter;
            }
        }
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let i = 0; i < 30; i++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", i + 1);
            gameBoard.appendChild(square);
        }
    }

});