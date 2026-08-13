const textDisplay = document.getElementById("text-display");
const input = document.getElementById("input");

const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const result = document.getElementById("result");

const text = `Practice makes perfect and speed comes with consistency. Keep typing every day and you will become faster and more accurate.`;

let timeLeft = 60;
let timer = null;
let started = false;

startBtn.addEventListener("click", startTest);
restartBtn.addEventListener("click", restartTest);

function startTest() {
    if (started) return;

    started = true;
    input.disabled = false;
    input.focus();

    startBtn.disabled = true;
    result.textContent = "";

    timer = setInterval(() => {
        timeLeft--;

        timerDisplay.textContent = timeLeft;

        calculateStats();

        if (timeLeft <= 0) {
            endTest();
        }
    }, 1000);
}

function calculateStats() {
    const typedText = input.value;

    const words = typedText.trim() === ""
        ? 0
        : typedText.trim().split(/\s+/).length;

    const correctCharacters = getCorrectCharacters(typedText);

    const accuracy = typedText.length === 0
        ? 100
        : Math.round((correctCharacters / typedText.length) * 100);

    const elapsedTime = 60 - timeLeft;

    let wpm = 0;

    if (elapsedTime > 0) {
        wpm = Math.round((words / elapsedTime) * 60);
    }

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy + "%";
}

function getCorrectCharacters(typedText) {
    let correct = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === text[i]) {
            correct++;
        }
    }

    return correct;
}

function endTest() {
    clearInterval(timer);

    input.disabled = true;
    startBtn.disabled = false;
    started = false;

    calculateStats();

    const finalWpm = wpmDisplay.textContent;
    const finalAccuracy = accuracyDisplay.textContent;

    result.textContent =
        `🎉 Test Finished! Your Speed: ${finalWpm} WPM | Accuracy: ${finalAccuracy}`;
}

function restartTest() {
    clearInterval(timer);

    timeLeft = 60;
    started = false;

    timerDisplay.textContent = "60";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100%";

    input.value = "";
    input.disabled = true;

    startBtn.disabled = false;

    result.textContent = "";

    textDisplay.textContent = text;
}
