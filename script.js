// ================== DOM ЭЛЕМЕНТЫ ==================
const gameMenu = document.getElementById('game-menu');
const spyGame = document.getElementById('spy-game');
const crocodileGame = document.getElementById('crocodile-game');
const bombGame = document.getElementById('bomb-game');
const questionsGame = document.getElementById('questions-game');
const truthGame = document.getElementById('truth-game');
const diceGame = document.getElementById('dice-game');
const guessGame = document.getElementById('guess-game');
const leaderGame = document.getElementById('leader-game');
const wordAssociationGame = document.getElementById('word-association-game');
const storyGame = document.getElementById('story-game');
const factGame = document.getElementById('fact-game');
const bottlesGame = document.getElementById('bottles-game');
const swapGame = document.getElementById('swap-game');

// Элементы игры "Банан Шпион"
const screenSelect = document.getElementById('screen-select');
const screenRole = document.getElementById('screen-role');
const screenHidden = document.getElementById('screen-hidden');
const screenAllDone = document.getElementById('screen-all-done');
const screenStart = document.getElementById('screen-start');
const playerSelectDiv = document.getElementById('player-select');
const playerHeader = document.getElementById('player-header');
const roleDisplay = document.getElementById('role-display');
const hideWordBtn = document.getElementById('hide-word-btn');
const showWordBtn = document.getElementById('show-word-btn');
const startGameBtn = document.getElementById('start-game-btn');
const revealSpyBtn = document.getElementById('reveal-spy-btn');
const restartFromRole = document.getElementById('restart-from-role');
const restartFromHidden = document.getElementById('restart-from-hidden');
const restartFromDone = document.getElementById('restart-from-done');
const restartFromStart = document.getElementById('restart-from-start');
const nextPlayerHeader = document.getElementById('next-player-header');
const passMessageHidden = document.getElementById('pass-message-hidden');
const finalWords = document.getElementById('final-words');

// Элементы игры "Крокодил"
const crocodileWordDisplay = document.getElementById('crocodile-word-display');
const nextCrocodileWordBtn = document.getElementById('next-crocodile-word');

// Элементы игры "Бомба"
const bombTimerDisplay = document.getElementById('bomb-timer');
const bombWordDisplay = document.getElementById('bomb-word-display');
const startBombBtn = document.getElementById('start-bomb-game');

// Элементы игры "20 вопросов"
const questionsWordDisplay = document.getElementById('questions-word-display');
const questionsCounter = document.getElementById('questions-counter');
const startQuestionsBtn = document.getElementById('start-questions-game');
const resetQuestionsBtn = document.getElementById('reset-questions-game');

// Элементы игры "Правда или Действие"
const truthCardDisplay = document.getElementById('truth-card-display');
const generateTruthBtn = document.getElementById('generate-truth');

// Элементы игры "Кубик"
const diceDisplay = document.getElementById('dice-display');
const rollDiceBtn = document.getElementById('roll-dice');

// Элементы игры "Угадай число"
const guessCardDisplay = document.getElementById('guess-card-display');
const guessHigherBtn = document.getElementById('guess-higher');
const guessCorrectBtn = document.getElementById('guess-correct');
const guessLowerBtn = document.getElementById('guess-lower');
const resetGuessBtn = document.getElementById('reset-guess-game');
const guessStartBtn = document.getElementById('guess-start-btn');

// Элементы игры "Тайный лидер"
const leaderRoleDisplay = document.getElementById('leader-role-display');
const startLeaderGameBtn = document.getElementById('start-leader-game');

// Элементы игры "Ассоциации"
const associationWordDisplay = document.getElementById('association-word-display');
const nextAssociationWordBtn = document.getElementById('next-association-word');

// Элементы игры "Смешная история"
const storyQuestionDisplay = document.getElementById('story-question-display');
const storyAnswerInput = document.getElementById('story-answer-input');
const storyNextBtn = document.getElementById('story-next-btn');
const storyStoryDisplay = document.getElementById('story-story-display');
const storyStartBtn = document.getElementById('story-start-btn');

// Элементы игры "Факт или Фейк"
const factFactDisplay = document.getElementById('fact-fact-display');
const factAnswerDisplay = document.getElementById('fact-answer-display');
const factTrueBtn = document.getElementById('fact-true-btn');
const factFalseBtn = document.getElementById('fact-false-btn');
const factNextBtn = document.getElementById('fact-next-btn');

// ================== СОСТОЯНИЕ ==================
let totalPlayers = 3;
let currentPlayerIndex = 0;
let currentPair = null;
let spyIndex = -1;
let recentlyUsedPairs = [];
const MAX_RECENT_PAIRS = 50;

let recentlyUsedCrocodileWords = [];
const MAX_RECENT_CROCODILE_WORDS = 30;

let bombTimer = null;
let bombCountdown = 10;
let bombActive = false;
let bombDuration = 10;

let questionsCount = 0;

let recentlyUsedTruth = [];
let recentlyUsedAction = [];
const MAX_RECENT_TRUTH = 10;
const MAX_RECENT_ACTION = 10;

let guessMin = 1;
let guessMax = 100;
let guessCurrent = 50;
let guessTries = 0;
let guessGameStarted = false;

let recentlyUsedAssociationWords = [];
const MAX_RECENT_ASSOCIATION_WORDS = 30;

let storyAnswers = {};
let storyStep = 0;

let currentFact = null;
let recentlyUsedFacts = [];
const MAX_RECENT_FACTS = 30;

let bottlesCount = 4;
let bottlesFirstRow = [];
let bottlesSecondRow = [];
let bottlesSelectedFirst = null;
let bottlesSelectedSecond = null;
let bottlesMatched = new Set();
let bottlesAttempts = 0;
let bottlesMaxAttempts = 0;
let bottlesGameActive = false;
let bottlesTimer = null;
let bottlesSeconds = 0;
let bottlesMode = 'bottles';

let swapCurrentOrder = [];
let swapCorrectOrder = [];
let swapSelectedFirst = null;
let swapSelectedSecond = null;
let swapMoves = 0;
let swapGameActive = false;
let swapMode = 'bottles';
let swapCount = 4;

let soundEnabled = true;
let audioContext = null;

// ================== ФУНКЦИИ ЗВУКА ==================
function initAudio() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {
            console.log('Audio not available');
        }
    }
}

function playSound(type) {
    if (!soundEnabled || !audioContext) return;
    
    try {
        let frequency = 440;
        let duration = 0.1;
        let volume = 0.3;
        
        switch(type) {
            case 'click': frequency = 600; duration = 0.05; volume = 0.2; break;
            case 'flip': frequency = 800; duration = 0.08; volume = 0.25; break;
            case 'success': frequency = 880; duration = 0.2; volume = 0.4; break;
            case 'fail': frequency = 220; duration = 0.3; volume = 0.3; break;
            case 'tick': frequency = 1000; duration = 0.03; volume = 0.15; break;
            case 'bomb': frequency = 110; duration = 0.5; volume = 0.5; break;
            case 'win': frequency = 1200; duration = 0.4; volume = 0.5; break;
            case 'roll': frequency = 400; duration = 0.15; volume = 0.3; break;
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        gainNode.gain.value = volume;
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    } catch(e) {
        console.log('Sound error');
    }
}

// ================== ФУНКЦИИ МЕНЮ ==================
function showMainMenu() {
    gameMenu.classList.remove('hidden');
    document.querySelectorAll('.game-container').forEach(el => el.classList.add('hidden'));
}

function showGame(gameElement) {
    gameMenu.classList.add('hidden');
    document.querySelectorAll('.game-container').forEach(el => el.classList.add('hidden'));
    gameElement.classList.remove('hidden');
}

function showSpyGame() { 
    showGame(spyGame); 
    resetSpyGame(); 
    console.log('Spy game opened');
}
function showCrocodileGame() { 
    showGame(crocodileGame); 
    showCrocodileContent(); 
    showNextCrocodileWord(); 
    console.log('Crocodile game opened');
}
function showBombGame() { 
    showGame(bombGame); 
    showBombContent(); 
    resetBombGame(); 
    console.log('Bomb game opened');
}
function showQuestionsGame() { 
    showGame(questionsGame); 
    showQuestionsContent(); 
    resetQuestionsGame(); 
    console.log('Questions game opened');
}
function showTruthGame() { 
    showGame(truthGame); 
    showTruthContent(); 
    console.log('Truth game opened');
}
function showDiceGame() { 
    showGame(diceGame); 
    showDiceContent(); 
    console.log('Dice game opened');
}
function showGuessGame() { 
    showGame(guessGame); 
    showGuessContent(); 
    resetGuessGame(); 
    console.log('Guess game opened');
}
function showLeaderGame() { 
    showGame(leaderGame); 
    showLeaderContent(); 
    console.log('Leader game opened');
}
function showWordAssociationGame() { 
    showGame(wordAssociationGame); 
    showWordAssociationContent(); 
    showNextAssociationWord(); 
    console.log('Association game opened');
}
function showStoryGame() { 
    showGame(storyGame); 
    showStoryContent(); 
    resetStoryGame(); 
    console.log('Story game opened');
}
function showFactGame() { 
    showGame(factGame); 
    showFactContent(); 
    showNextFact(); 
    console.log('Fact game opened');
}
function showBottlesGame() { 
    showGame(bottlesGame); 
    showBottlesContent(); 
    resetBottlesGame(); 
    console.log('Bottles game opened');
}
function showSwapGame() { 
    showGame(swapGame); 
    showSwapContent(); 
    resetSwapGame(); 
    console.log('Swap game opened');
}

// ================== ФУНКЦИИ ПРАВИЛ ==================
function toggleRules(type) {
    const rulesMap = {
        'spy': ['screen-select', 'rules-spy'],
        'crocodile': ['crocodile-content', 'rules-crocodile'],
        'bomb': ['bomb-content', 'rules-bomb'],
        'questions': ['questions-content', 'rules-questions'],
        'truth': ['truth-content', 'rules-truth'],
        'leader': ['leader-content', 'rules-leader'],
        'association': ['word-association-content', 'rules-association'],
        'story': ['story-content', 'rules-story'],
        'fact': ['fact-content', 'rules-fact'],
        'bottles': ['bottles-content', 'rules-bottles'],
        'swap': ['swap-content', 'rules-swap']
    };
    
    if (rulesMap[type]) {
        document.getElementById(rulesMap[type][0]).classList.add('hidden');
        document.getElementById(rulesMap[type][1]).classList.remove('hidden');
    }
}

function showContent(type) {
    const rulesMap = {
        'spy': ['screen-select', 'rules-spy'],
        'crocodile': ['crocodile-content', 'rules-crocodile'],
        'bomb': ['bomb-content', 'rules-bomb'],
        'questions': ['questions-content', 'rules-questions'],
        'truth': ['truth-content', 'rules-truth'],
        'leader': ['leader-content', 'rules-leader'],
        'association': ['word-association-content', 'rules-association'],
        'story': ['story-content', 'rules-story'],
        'fact': ['fact-content', 'rules-fact'],
        'bottles': ['bottles-content', 'rules-bottles'],
        'swap': ['swap-content', 'rules-swap']
    };
    
    if (rulesMap[type]) {
        document.getElementById(rulesMap[type][1]).classList.add('hidden');
        document.getElementById(rulesMap[type][0]).classList.remove('hidden');
    }
}

// ================== ФУНКЦИИ БАНАН ШПИОНА ==================
function showSpyScreen(screen) {
    [screenSelect, screenRole, screenHidden, screenAllDone, screenStart].forEach(s => s.classList.add('hidden'));
    screen.classList.remove('hidden');
}

function initPlayerButtons() {
    playerSelectDiv.innerHTML = '';
    for (let i = 3; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = 'btn';
        btn.style.minWidth = '50px';
        btn.style.padding = '12px';
        btn.style.pointerEvents = 'auto';
        btn.style.cursor = 'pointer';
        btn.style.zIndex = '1000';
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            playSound('click');
            totalPlayers = i;
            startRoleAssignment();
        });
        playerSelectDiv.appendChild(btn);
    }
}

function getRandomPairIndex() {
    let availableIndices = [];
    for (let i = 0; i < WORD_PAIRS.length; i++) {
        if (!recentlyUsedPairs.includes(i)) availableIndices.push(i);
    }
    
    if (availableIndices.length === 0) availableIndices = WORD_PAIRS.map((_, index) => index);
    
    return availableIndices[Math.floor(Math.random() * availableIndices.length)];
}

function addToRecentlyUsed(index) {
    recentlyUsedPairs.push(index);
    while (recentlyUsedPairs.length > MAX_RECENT_PAIRS) recentlyUsedPairs.shift();
}

function startRoleAssignment() {
    currentPlayerIndex = 0;
    const pairIndex = getRandomPairIndex();
    currentPair = WORD_PAIRS[pairIndex];
    addToRecentlyUsed(pairIndex);
    spyIndex = Math.floor(Math.random() * totalPlayers);
    showRoleScreen();
}

function showRoleScreen() {
    const playerNum = currentPlayerIndex + 1;
    const isSpy = currentPlayerIndex === spyIndex;
    
    playerHeader.textContent = `Игрок ${playerNum}`;
    roleDisplay.textContent = isSpy ? currentPair.spy : currentPair.civilian;
    showSpyScreen(screenRole);
}

function handleHideWord() {
    playSound('flip');
    if (currentPlayerIndex >= totalPlayers - 1) {
        showSpyScreen(screenAllDone);
    } else {
        const nextPlayerNum = currentPlayerIndex + 2;
        nextPlayerHeader.textContent = `Игрок ${nextPlayerNum}`;
        passMessageHidden.textContent = `📱 Телефон у Игрока ${nextPlayerNum}?`;
        showSpyScreen(screenHidden);
    }
}

function handleShowWord() {
    playSound('flip');
    currentPlayerIndex++;
    showRoleScreen();
}

function showStartScreen() {
    finalWords.innerHTML = `
        <div>🔵 Мирные: <b>${currentPair.civilian}</b></div>
        <div>🔴 Шпион: <b>${currentPair.spy}</b> (игрок №${spyIndex + 1})</div>
    `;
    finalWords.classList.add('hidden');
    revealSpyBtn.classList.remove('hidden');
    showSpyScreen(screenStart);
}

function revealSpy() {
    playSound('success');
    finalWords.classList.remove('hidden');
    revealSpyBtn.classList.add('hidden');
}

function resetSpyGame() {
    showSpyScreen(screenSelect);
    finalWords.classList.add('hidden');
    revealSpyBtn.classList.add('hidden');
}

// ================== ФУНКЦИИ КРОКОДИЛА ==================
function getRandomCrocodileWord() {
    let availableWords = [];
    for (let i = 0; i < CROCODILE_WORDS.length; i++) {
        if (!recentlyUsedCrocodileWords.includes(i)) availableWords.push(i);
    }
    
    if (availableWords.length === 0) availableWords = CROCODILE_WORDS.map((_, index) => index);
    
    const wordIndex = availableWords[Math.floor(Math.random() * availableWords.length)];
    recentlyUsedCrocodileWords.push(wordIndex);
    while (recentlyUsedCrocodileWords.length > MAX_RECENT_CROCODILE_WORDS) recentlyUsedCrocodileWords.shift();
    
    return CROCODILE_WORDS[wordIndex];
}

function showNextCrocodileWord() {
    playSound('flip');
    crocodileWordDisplay.textContent = getRandomCrocodileWord();
}

function showCrocodileContent() {
    document.getElementById('crocodile-content').classList.remove('hidden');
    document.getElementById('rules-crocodile').classList.add('hidden');
}

// ================== ФУНКЦИИ БОМБЫ ==================
function showBombContent() {
    document.getElementById('bomb-content').classList.remove('hidden');
    document.getElementById('rules-bomb').classList.add('hidden');
}

function resetBombGame() {
    if (bombTimer) { clearInterval(bombTimer); bombTimer = null; }
    bombCountdown = bombDuration;
    bombActive = false;
    bombTimerDisplay.textContent = bombCountdown;
    bombTimerDisplay.className = 'bomb-timer';
    bombWordDisplay.textContent = 'НАЖМИ СТАРТ';
    bombWordDisplay.className = 'bomb-word';
    startBombBtn.textContent = '🎯 Старт';
}

function setBombDuration(seconds) {
    if (!bombActive) {
        playSound('click');
        bombDuration = seconds;
        bombCountdown = seconds;
        bombTimerDisplay.textContent = bombCountdown;
        bombTimerDisplay.className = 'bomb-timer';
    }
}

function startBombGame() {
    playSound('click');
    
    if (bombActive) {
        clearInterval(bombTimer);
        bombTimer = null;
        bombActive = false;
        startBombBtn.textContent = '▶️ Продолжить';
    } else {
        if (bombCountdown <= 0) {
            bombCountdown = bombDuration;
            bombTimerDisplay.textContent = bombCountdown;
            bombTimerDisplay.className = 'bomb-timer';
            bombWordDisplay.textContent = 'НАЖМИ СТАРТ';
            bombWordDisplay.className = 'bomb-word';
        }
        bombActive = true;
        startBombBtn.textContent = '⏸️ Пауза';
        
        if (bombWordDisplay.textContent === 'НАЖМИ СТАРТ') showNextBombWord();
        
        bombTimer = setInterval(() => {
            bombCountdown--;
            bombTimerDisplay.textContent = bombCountdown;
            
            if (bombCountdown <= 3 && bombCountdown > 0) {
                bombTimerDisplay.className = 'bomb-timer warning';
                playSound('tick');
            }
            
            if (bombCountdown <= 0) {
                clearInterval(bombTimer);
                bombTimer = null;
                bombActive = false;
                bombTimerDisplay.textContent = '💥';
                bombTimerDisplay.className = 'bomb-timer exploded';
                bombWordDisplay.textContent = 'БОМБА ВЗОРВАЛАСЬ!';
                bombWordDisplay.className = 'bomb-word exploded';
                startBombBtn.textContent = '🔄 Заново';
                playSound('bomb');
            }
        }, 1000);
    }
}

function showNextBombWord() {
    const randomIndex = Math.floor(Math.random() * BOMB_WORDS.length);
    bombWordDisplay.textContent = BOMB_WORDS[randomIndex];
    bombWordDisplay.className = 'bomb-word';
}

// ================== ФУНКЦИИ 20 ВОПРОСОВ ==================
function showQuestionsContent() {
    document.getElementById('questions-content').classList.remove('hidden');
    document.getElementById('rules-questions').classList.add('hidden');
}

function resetQuestionsGame() {
    questionsCount = 0;
    questionsWordDisplay.textContent = 'ЗАГАДАЙ СЛОВО';
    questionsCounter.textContent = 'Вопросов: 0/20';
    startQuestionsBtn.textContent = '🎯 Начать';
}

function startQuestionsGame() {
    playSound('click');
    
    if (questionsCount === 0) {
        questionsWordDisplay.textContent = 'Слово загадано!';
        startQuestionsBtn.textContent = '➕ Задать вопрос';
        questionsCount = 1;
        questionsCounter.textContent = `Вопросов: ${questionsCount}/20`;
    } else if (questionsCount < 20) {
        questionsCount++;
        questionsCounter.textContent = `Вопросов: ${questionsCount}/20`;
        
        if (questionsCount === 20) {
            questionsWordDisplay.textContent = 'ИГРА ОКОНЧЕНА!';
            startQuestionsBtn.textContent = '🔄 Заново';
            playSound('win');
        }
    } else {
        resetQuestionsGame();
    }
}

// ================== ФУНКЦИИ ПРАВДА ИЛИ ДЕЙСТВИЕ ==================
function showTruthContent() {
    document.getElementById('truth-content').classList.remove('hidden');
    document.getElementById('rules-truth').classList.add('hidden');
}

function getRandomTruth() {
    let availableIndices = [];
    for (let i = 0; i < TRUTH_QUESTIONS.length; i++) {
        if (!recentlyUsedTruth.includes(i)) availableIndices.push(i);
    }
    
    if (availableIndices.length === 0) availableIndices = TRUTH_QUESTIONS.map((_, index) => index);
    
    const truthIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    recentlyUsedTruth.push(truthIndex);
    while (recentlyUsedTruth.length > MAX_RECENT_TRUTH) recentlyUsedTruth.shift();
    
    return TRUTH_QUESTIONS[truthIndex];
}

function getRandomAction() {
    let availableIndices = [];
    for (let i = 0; i < ACTION_TASKS.length; i++) {
        if (!recentlyUsedAction.includes(i)) availableIndices.push(i);
    }
    
    if (availableIndices.length === 0) availableIndices = ACTION_TASKS.map((_, index) => index);
    
    const actionIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    recentlyUsedAction.push(actionIndex);
    while (recentlyUsedAction.length > MAX_RECENT_ACTION) recentlyUsedAction.shift();
    
    return ACTION_TASKS[actionIndex];
}

function generateTruthOrAction() {
    playSound('flip');
    
    const isTruth = Math.random() < 0.5;
    
    if (isTruth) {
        truthCardDisplay.textContent = `🎭 ПРАВДА: ${getRandomTruth()}`;
        truthCardDisplay.style.background = '#fff9c4';
        truthCardDisplay.style.color = '#333';
    } else {
        truthCardDisplay.textContent = `🎯 ДЕЙСТВИЕ: ${getRandomAction()}`;
        truthCardDisplay.style.background = '#e3f2fd';
        truthCardDisplay.style.color = '#333';
    }
}

// ================== ФУНКЦИИ КУБИКА ==================
function showDiceContent() {
    document.getElementById('dice-content').classList.remove('hidden');
}

function rollDice() {
    playSound('roll');
    diceDisplay.classList.add('rolling');
    
    const randomResult = Math.floor(Math.random() * 6) + 1;
    
    setTimeout(() => {
        diceDisplay.textContent = randomResult;
        diceDisplay.classList.remove('rolling');
        playSound('success');
    }, 500);
}

// ================== ФУНКЦИИ УГАДАЙ ЧИСЛО ==================
function showGuessContent() {
    document.getElementById('guess-content').classList.remove('hidden');
}

function resetGuessGame() {
    guessMin = 1;
    guessMax = 100;
    guessCurrent = 50;
    guessTries = 0;
    guessGameStarted = false;
    guessCardDisplay.textContent = 'Загадай число от 1 до 100 и нажми "Начать"';
    
    document.getElementById('guess-buttons').classList.add('hidden');
    if (guessStartBtn) guessStartBtn.classList.remove('hidden');
}

function startGuessGame() {
    playSound('click');
    
    guessGameStarted = true;
    guessCardDisplay.textContent = `Я думаю, это число ${guessCurrent}?`;
    
    document.getElementById('guess-buttons').classList.remove('hidden');
    if (guessStartBtn) guessStartBtn.classList.add('hidden');
}

function makeGuess(response) {
    if (!guessGameStarted) return;
    
    playSound('click');
    guessTries++;
    
    if (response === 'higher') {
        guessMin = guessCurrent + 1;
    } else if (response === 'lower') {
        guessMax = guessCurrent - 1;
    } else if (response === 'correct') {
        guessCardDisplay.textContent = `🎉 Я угадал за ${guessTries} попыток!`;
        document.getElementById('guess-buttons').classList.add('hidden');
        playSound('win');
        return;
    }
    
    if (guessMin > guessMax) {
        guessCardDisplay.textContent = 'Ты меня обманул! Начнём заново.';
        document.getElementById('guess-buttons').classList.add('hidden');
        playSound('fail');
        return;
    }
    
    guessCurrent = Math.floor((guessMin + guessMax) / 2);
    guessCardDisplay.textContent = `Я думаю, это число ${guessCurrent}?`;
}

// ================== ФУНКЦИИ ТАЙНОГО ЛИДЕРА ==================
function startLeaderGame() {
    playSound('click');
    
    const roles = ['Лидер', 'Подражатель', 'Шпион'];
    const shuffled = shuffleArray(roles);
    
    leaderRoleDisplay.innerHTML = `
        <div style="margin: 10px 0;">
            <div style="font-size: 1.5rem; margin-bottom: 15px;">Раздайте роли:</div>
            <div style="font-size: 1.2rem; margin: 10px 0;">
                Игрок 1: <b>${shuffled[0]}</b><br>
                Игрок 2: <b>${shuffled[1]}</b><br>
                Игрок 3: <b>${shuffled[2]}</b>
            </div>
            <div style="color: #ffd700; margin-top: 15px;">
                Лидер задаёт движения, Подражатель копирует, Шпион угадывает!
            </div>
        </div>
    `;
}

function showLeaderContent() {
    document.getElementById('leader-content').classList.remove('hidden');
    document.getElementById('rules-leader').classList.add('hidden');
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ================== ФУНКЦИИ АССОЦИАЦИЙ ==================
function getRandomAssociationWord() {
    let availableWords = [];
    for (let i = 0; i < ASSOCIATION_WORDS.length; i++) {
        if (!recentlyUsedAssociationWords.includes(i)) availableWords.push(i);
    }
    
    if (availableWords.length === 0) availableWords = ASSOCIATION_WORDS.map((_, index) => index);
    
    const wordIndex = availableWords[Math.floor(Math.random() * availableWords.length)];
    recentlyUsedAssociationWords.push(wordIndex);
    while (recentlyUsedAssociationWords.length > MAX_RECENT_ASSOCIATION_WORDS) recentlyUsedAssociationWords.shift();
    
    return ASSOCIATION_WORDS[wordIndex];
}

function showNextAssociationWord() {
    playSound('flip');
    associationWordDisplay.textContent = getRandomAssociationWord();
}

function showWordAssociationContent() {
    document.getElementById('word-association-content').classList.remove('hidden');
    document.getElementById('rules-association').classList.add('hidden');
}

// ================== ФУНКЦИИ СМЕШНОЙ ИСТОРИИ ==================
function showStoryContent() {
    document.getElementById('story-content').classList.remove('hidden');
    document.getElementById('rules-story').classList.add('hidden');
}

function resetStoryGame() {
    storyAnswers = {};
    storyStep = 0;
    storyQuestionDisplay.textContent = STORY_QUESTIONS[0].question;
    storyAnswerInput.value = '';
    storyStoryDisplay.classList.add('hidden');
    storyStartBtn.classList.remove('hidden');
    storyAnswerInput.classList.remove('hidden');
    storyNextBtn.classList.remove('hidden');
}

function submitStoryAnswer() {
    const answer = storyAnswerInput.value.trim();
    if (!answer) return;
    
    playSound('click');
    
    const currentQuestion = STORY_QUESTIONS[storyStep];
    storyAnswers[currentQuestion.placeholder] = answer;
    
    storyStep++;
    storyAnswerInput.value = '';
    
    if (storyStep < STORY_QUESTIONS.length) {
        storyQuestionDisplay.textContent = STORY_QUESTIONS[storyStep].question;
    } else {
        showStoryResult();
    }
}

function showStoryResult() {
    playSound('win');
    
    const storyIndex = Math.floor(Math.random() * STORY_TEMPLATES.length);
    
    let story = STORY_TEMPLATES[storyIndex];
    
    story = story.replace(/{животное}/g, storyAnswers['животное'] || 'животное');
    story = story.replace(/{животное2}/g, storyAnswers['животное2'] || 'животное');
    story = story.replace(/{имя}/g, storyAnswers['имя'] || 'Алекс');
    story = story.replace(/{имя2}/g, storyAnswers['имя2'] || 'Саша');
    story = story.replace(/{место}/g, storyAnswers['место'] || 'парк');
    story = story.replace(/{еда}/g, storyAnswers['еда'] || 'пицца');
    story = story.replace(/{предмет}/g, storyAnswers['предмет'] || 'мяч');
    story = story.replace(/{предмет2}/g, storyAnswers['предмет2'] || 'зонт');
    story = story.replace(/{действие}/g, storyAnswers['действие'] || 'бегать');
    story = story.replace(/{действие2}/g, storyAnswers['действие2'] || 'прыгать');
    story = story.replace(/{действие3}/g, storyAnswers['действие3'] || 'танцевать');
    
    storyStoryDisplay.textContent = story;
    storyStoryDisplay.classList.remove('hidden');
    storyQuestionDisplay.textContent = 'Вот твоя история!';
    storyAnswerInput.classList.add('hidden');
    storyNextBtn.classList.add('hidden');
    storyStartBtn.textContent = '🔄 Ещё раз';
}

// ================== ФУНКЦИИ ФАКТ ИЛИ ФЕЙК ==================
function showFactContent() {
    document.getElementById('fact-content').classList.remove('hidden');
    document.getElementById('rules-fact').classList.add('hidden');
}

function getRandomFact() {
    let availableFacts = [];
    for (let i = 0; i < FACTS.length; i++) {
        if (!recentlyUsedFacts.includes(i)) availableFacts.push(i);
    }
    
    if (availableFacts.length === 0) availableFacts = FACTS.map((_, index) => index);
    
    const factIndex = availableFacts[Math.floor(Math.random() * availableFacts.length)];
    recentlyUsedFacts.push(factIndex);
    while (recentlyUsedFacts.length > MAX_RECENT_FACTS) recentlyUsedFacts.shift();
    
    return FACTS[factIndex];
}

function showNextFact() {
    playSound('flip');
    
    currentFact = getRandomFact();
    factFactDisplay.textContent = currentFact.fact;
    factAnswerDisplay.classList.add('hidden');
    factTrueBtn.classList.remove('hidden');
    factFalseBtn.classList.remove('hidden');
    factNextBtn.classList.add('hidden');
}

function checkFact(answer) {
    playSound('click');
    
    const isCorrect = (answer === currentFact.isTrue);
    
    if (isCorrect) {
        factAnswerDisplay.textContent = '✅ Верно!';
        playSound('success');
    } else {
        factAnswerDisplay.textContent = `❌ Неверно! ${currentFact.isTrue ? 'Это ФАКТ!' : 'Это ФЕЙК!'}`;
        playSound('fail');
    }
    
    factAnswerDisplay.classList.remove('hidden');
    factTrueBtn.classList.add('hidden');
    factFalseBtn.classList.add('hidden');
    factNextBtn.classList.remove('hidden');
}

// ================== ФУНКЦИИ ИГРЫ БУТЫЛОЧКИ ==================
function showBottlesContent() {
    document.getElementById('bottles-content').classList.remove('hidden');
    document.getElementById('rules-bottles').classList.add('hidden');
}

function getBottlesEmojis() {
    const emojiSets = {
        bottles: ['🍾', '🧴', '🧪', '⚗️', '🧫', '🫗', '🥤', '🍶'],
        caps: ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⚫', '⚪'],
        emoji: ['😀', '😎', '🤠', '👻', '🤖', '👽', '🎃', '😺']
    };
    return emojiSets[bottlesMode] || emojiSets.bottles;
}

function startBottlesGame() {
    playSound('click');
    
    const emojis = getBottlesEmojis();
    const selectedEmojis = emojis.slice(0, bottlesCount);
    
    bottlesFirstRow = shuffleArray([...selectedEmojis]);
    bottlesSecondRow = shuffleArray([...selectedEmojis]);
    
    while (arraysEqual(bottlesFirstRow, bottlesSecondRow)) {
        bottlesSecondRow = shuffleArray([...selectedEmojis]);
    }
    
    bottlesSelectedFirst = null;
    bottlesSelectedSecond = null;
    bottlesMatched = new Set();
    bottlesAttempts = 0;
    bottlesMaxAttempts = Math.ceil(bottlesCount * 1.5);
    bottlesGameActive = true;
    bottlesSeconds = 0;
    
    if (bottlesTimer) clearInterval(bottlesTimer);
    bottlesTimer = setInterval(() => {
        bottlesSeconds++;
        updateBottlesTimer();
    }, 1000);
    
    renderBottlesGame();
    updateBottlesStats();
    
    const resultElement = document.getElementById('bottles-result');
    if (resultElement) resultElement.classList.add('hidden');
}

function arraysEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function setBottlesMode(mode) {
    if (bottlesGameActive && bottlesAttempts > 0) return;
    
    playSound('click');
    bottlesMode = mode;
    
    document.querySelectorAll('.bottles-mode-btn').forEach(btn => {
        btn.style.background = '#533483';
    });
    
    const modeMap = { 'bottles': 'mode-bottles', 'caps': 'mode-caps', 'emoji': 'mode-emoji' };
    const activeBtn = document.getElementById(modeMap[mode]);
    if (activeBtn) activeBtn.style.background = '#e94560';
    
    resetBottlesGame();
}

function setBottlesCount(count) {
    if (bottlesGameActive && bottlesAttempts > 0) return;
    
    playSound('click');
    bottlesCount = count;
    
    document.querySelectorAll('.bottles-count-btn').forEach(btn => {
        btn.style.background = '#533483';
    });
    
    const countMap = { 4: 'bottles-4', 6: 'bottles-6', 8: 'bottles-8' };
    const activeBtn = document.getElementById(countMap[count]);
    if (activeBtn) activeBtn.style.background = '#e94560';
    
    resetBottlesGame();
}

function renderBottlesGame() {
    const firstRowElement = document.getElementById('bottles-first-row');
    const secondRowElement = document.getElementById('bottles-second-row');
    
    if (!firstRowElement || !secondRowElement) return;
    
    firstRowElement.innerHTML = '';
    secondRowElement.innerHTML = '';
    
    const bottleSize = bottlesCount <= 4 ? '80px' : bottlesCount <= 6 ? '65px' : '50px';
    const fontSize = bottlesCount <= 4 ? '3rem' : bottlesCount <= 6 ? '2.5rem' : '2rem';
    
    bottlesFirstRow.forEach((emoji, index) => {
        const bottleElement = createBottleElement(emoji, index, 'first');
        bottleElement.style.width = bottleSize;
        bottleElement.style.height = bottleSize;
        bottleElement.style.fontSize = fontSize;
        firstRowElement.appendChild(bottleElement);
    });
    
    bottlesSecondRow.forEach((emoji, index) => {
        const bottleElement = createBottleElement(emoji, index, 'second');
        bottleElement.style.width = bottleSize;
        bottleElement.style.height = bottleSize;
        bottleElement.style.fontSize = fontSize;
        secondRowElement.appendChild(bottleElement);
    });
}

function createBottleElement(emoji, index, row) {
    const element = document.createElement('div');
    element.className = 'bottle-item';
    element.textContent = emoji;
    element.style.pointerEvents = 'auto';
    element.style.cursor = 'pointer';
    element.style.zIndex = '1000';
    
    const isMatched = bottlesMatched.has(index);
    if (isMatched) element.classList.add('matched');
    
    if (row === 'first' && bottlesSelectedFirst === index) element.classList.add('selected');
    if (row === 'second' && bottlesSelectedSecond === index) element.classList.add('selected');
    
    element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!bottlesGameActive) return;
        if (isMatched) return;
        
        if (row === 'first') {
            if (bottlesSelectedFirst === index) {
                bottlesSelectedFirst = null;
                renderBottlesGame();
                return;
            }
            
            playSound('click');
            bottlesSelectedFirst = index;
            renderBottlesGame();
            
            if (bottlesSelectedSecond !== null) checkBottlesMatch();
        } else if (row === 'second') {
            if (bottlesSelectedSecond === index) {
                bottlesSelectedSecond = null;
                renderBottlesGame();
                return;
            }
            
            playSound('click');
            bottlesSelectedSecond = index;
            renderBottlesGame();
            
            if (bottlesSelectedFirst !== null) checkBottlesMatch();
        }
    });
    
    return element;
}

function checkBottlesMatch() {
    const firstEmoji = bottlesFirstRow[bottlesSelectedFirst];
    const secondEmoji = bottlesSecondRow[bottlesSelectedSecond];
    
    bottlesAttempts++;
    
    if (firstEmoji === secondEmoji) {
        playSound('success');
        bottlesMatched.add(bottlesSelectedFirst);
        bottlesMatched.add(bottlesSelectedSecond);
        
        bottlesSelectedFirst = null;
        bottlesSelectedSecond = null;
        
        renderBottlesGame();
        updateBottlesStats();
        
        if (bottlesMatched.size === bottlesCount * 2) {
            endBottlesGame(true);
        }
    } else {
        playSound('fail');
        
        setTimeout(() => {
            bottlesSelectedFirst = null;
            bottlesSelectedSecond = null;
            renderBottlesGame();
            updateBottlesStats();
            
            if (bottlesAttempts >= bottlesMaxAttempts && bottlesMatched.size < bottlesCount * 2) {
                endBottlesGame(false);
            }
        }, 800);
    }
    
    updateBottlesStats();
}

function updateBottlesStats() {
    const attemptsElement = document.getElementById('bottles-attempts');
    const matchedElement = document.getElementById('bottles-matched');
    
    if (attemptsElement) attemptsElement.textContent = `Попытки: ${bottlesAttempts}/${bottlesMaxAttempts}`;
    
    if (matchedElement) {
        const matchedPairs = Math.floor(bottlesMatched.size / 2);
        matchedElement.textContent = `Найдено пар: ${matchedPairs}/${bottlesCount}`;
    }
}

function updateBottlesTimer() {
    const timerElement = document.getElementById('bottles-timer');
    if (timerElement) {
        const minutes = Math.floor(bottlesSeconds / 60);
        const seconds = bottlesSeconds % 60;
        timerElement.textContent = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function endBottlesGame(won) {
    bottlesGameActive = false;
    
    if (bottlesTimer) { clearInterval(bottlesTimer); bottlesTimer = null; }
    
    const resultElement = document.getElementById('bottles-result');
    
    if (won) {
        playSound('win');
        resultElement.innerHTML = `
            🎉 ПОБЕДА!<br>
            Найдены все пары!<br>
            Попыток: ${bottlesAttempts}<br>
            Время: ${Math.floor(bottlesSeconds / 60)}:${(bottlesSeconds % 60).toString().padStart(2, '0')}
        `;
    } else {
        playSound('bomb');
        resultElement.innerHTML = `
            😔 ИГРА ОКОНЧЕНА<br>
            Не все пары найдены<br>
            Использовано попыток: ${bottlesAttempts}
        `;
    }
    
    resultElement.classList.remove('hidden');
}

function resetBottlesGame() {
    if (bottlesTimer) { clearInterval(bottlesTimer); bottlesTimer = null; }
    
    bottlesFirstRow = [];
    bottlesSecondRow = [];
    bottlesSelectedFirst = null;
    bottlesSelectedSecond = null;
    bottlesMatched = new Set();
    bottlesAttempts = 0;
    bottlesMaxAttempts = 0;
    bottlesGameActive = false;
    bottlesSeconds = 0;
    
    const firstRowElement = document.getElementById('bottles-first-row');
    const secondRowElement = document.getElementById('bottles-second-row');
    
    if (firstRowElement) firstRowElement.innerHTML = '<div style="color: #aaa; padding: 20px;">Выбери режим и нажми "Начать"</div>';
    if (secondRowElement) secondRowElement.innerHTML = '';
    
    const resultElement = document.getElementById('bottles-result');
    if (resultElement) resultElement.classList.add('hidden');
    
    const timerElement = document.getElementById('bottles-timer');
    if (timerElement) timerElement.textContent = '⏱️ 0:00';
    
    const attemptsElement = document.getElementById('bottles-attempts');
    if (attemptsElement) attemptsElement.textContent = 'Попытки: 0/0';
    
    const matchedElement = document.getElementById('bottles-matched');
    if (matchedElement) matchedElement.textContent = 'Найдено пар: 0/0';
}

// ================== ФУНКЦИИ ИГРЫ ОБМЕН ==================
function showSwapContent() {
    document.getElementById('swap-content').classList.remove('hidden');
    document.getElementById('rules-swap').classList.add('hidden');
}

function getSwapEmojis() {
    const emojiSets = {
        bottles: ['🍾', '🧴', '🧪', '⚗️', '🧫', '🫗'],
        emoji: ['😀', '😎', '🤠', '👻', '🤖', '👽']
    };
    return emojiSets[swapMode] || emojiSets.bottles;
}

function setSwapMode(mode) {
    if (swapGameActive && swapMoves > 0) return;
    
    playSound('click');
    swapMode = mode;
    
    document.querySelectorAll('.swap-mode-btn').forEach(btn => {
        btn.style.background = '#533483';
    });
    
    const modeMap = { 'bottles': 'swap-mode-bottles', 'emoji': 'swap-mode-emoji' };
    const activeBtn = document.getElementById(modeMap[mode]);
    if (activeBtn) activeBtn.style.background = '#e94560';
    
    resetSwapGame();
}

function setSwapCount(count) {
    if (swapGameActive && swapMoves > 0) return;
    
    playSound('click');
    swapCount = count;
    
    document.querySelectorAll('.swap-count-btn').forEach(btn => {
        btn.style.background = '#533483';
    });
    
    const countMap = { 4: 'swap-4', 6: 'swap-6' };
    const activeBtn = document.getElementById(countMap[count]);
    if (activeBtn) activeBtn.style.background = '#e94560';
    
    resetSwapGame();
}

function startSwapGame() {
    playSound('click');
    
    const emojis = getSwapEmojis();
    swapCorrectOrder = emojis.slice(0, swapCount);
    swapCurrentOrder = shuffleArray([...swapCorrectOrder]);
    
    while (arraysEqual(swapCorrectOrder, swapCurrentOrder)) {
        swapCurrentOrder = shuffleArray([...swapCorrectOrder]);
    }
    
    swapSelectedFirst = null;
    swapSelectedSecond = null;
    swapMoves = 0;
    swapGameActive = true;
    
    renderSwapGame();
    updateSwapProgress();
    
    const resultElement = document.getElementById('swap-result');
    if (resultElement) resultElement.classList.add('hidden');
}

function renderSwapGame() {
    const swapElementsContainer = document.getElementById('swap-elements');
    if (!swapElementsContainer) return;
    
    swapElementsContainer.innerHTML = '';
    
    const itemSize = swapCount <= 4 ? '90px' : '70px';
    const fontSize = swapCount <= 4 ? '3.5rem' : '2.5rem';
    
    swapCurrentOrder.forEach((emoji, index) => {
        const element = document.createElement('div');
        element.className = 'swap-item';
        element.textContent = emoji;
        element.style.width = itemSize;
        element.style.height = itemSize;
        element.style.fontSize = fontSize;
        element.style.pointerEvents = 'auto';
        element.style.cursor = 'pointer';
        element.style.zIndex = '1000';
        
        const isCorrect = swapCurrentOrder[index] === swapCorrectOrder[index];
        if (isCorrect) element.classList.add('correct');
        
        if (swapSelectedFirst === index) element.classList.add('selected');
        if (swapSelectedSecond === index) element.classList.add('selected');
        
        element.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (!swapGameActive) return;
            
            if (swapSelectedFirst === null) {
                swapSelectedFirst = index;
                playSound('click');
                renderSwapGame();
            } else if (swapSelectedSecond === null && swapSelectedFirst !== index) {
                swapSelectedSecond = index;
                playSound('click');
                swapElements();
            } else if (swapSelectedFirst === index) {
                swapSelectedFirst = null;
                playSound('click');
                renderSwapGame();
            }
        });
        
        swapElementsContainer.appendChild(element);
    });
}

function swapElements() {
    const temp = swapCurrentOrder[swapSelectedFirst];
    swapCurrentOrder[swapSelectedFirst] = swapCurrentOrder[swapSelectedSecond];
    swapCurrentOrder[swapSelectedSecond] = temp;
    
    swapMoves++;
    
    swapSelectedFirst = null;
    swapSelectedSecond = null;
    
    renderSwapGame();
    updateSwapProgress();
    
    if (arraysEqual(swapCorrectOrder, swapCurrentOrder)) {
        endSwapGame(true);
    }
}

function updateSwapProgress() {
    const percentageElement = document.getElementById('swap-percentage');
    if (!percentageElement) return;
    
    let correctCount = 0;
    for (let i = 0; i < swapCurrentOrder.length; i++) {
        if (swapCurrentOrder[i] === swapCorrectOrder[i]) correctCount++;
    }
    
    const percentage = Math.round((correctCount / swapCount) * 100);
    percentageElement.textContent = `${percentage}%`;
    
    if (percentage === 100) {
        percentageElement.style.background = '#4caf50';
    } else {
        percentageElement.style.background = '#e94560';
    }
}

function endSwapGame(won) {
    swapGameActive = false;
    
    const resultElement = document.getElementById('swap-result');
    
    if (won) {
        playSound('win');
        resultElement.innerHTML = `
            🎉 ПОБЕДА!<br>
            Все элементы на своих местах!<br>
            Ходов: ${swapMoves}
        `;
    }
    
    resultElement.classList.remove('hidden');
}

function resetSwapGame() {
    swapCurrentOrder = [];
    swapCorrectOrder = [];
    swapSelectedFirst = null;
    swapSelectedSecond = null;
    swapMoves = 0;
    swapGameActive = false;
    
    const swapElementsContainer = document.getElementById('swap-elements');
    if (swapElementsContainer) {
        swapElementsContainer.innerHTML = '<div style="color: #aaa; padding: 20px;">Выбери режим и нажми "Начать"</div>';
    }
    
    const percentageElement = document.getElementById('swap-percentage');
    if (percentageElement) {
        percentageElement.textContent = '0%';
        percentageElement.style.background = '#e94560';
    }
    
    const resultElement = document.getElementById('swap-result');
    if (resultElement) resultElement.classList.add('hidden');
}

// ================== ФУНКЦИЯ ПРИВЯЗКИ СОБЫТИЙ ==================
function attachEventListeners() {
    console.log('Attaching event listeners...');
    
    // Принудительно делаем все интерактивные элементы кликабельными
    document.querySelectorAll('.game-card, .btn, .bottle-item, .swap-item').forEach(el => {
        el.style.pointerEvents = 'auto';
        el.style.cursor = 'pointer';
        el.style.position = 'relative';
        el.style.zIndex = '1000';
    });
    
    // Убеждаемся, что фоновые элементы не блокируют
    document.querySelectorAll('.joystick-bg').forEach(el => {
        el.style.pointerEvents = 'none';
        el.style.zIndex = '0';
    });
    
    // Обработчики меню
    const menuButtons = {
        'spy-game-btn': showSpyGame,
        'crocodile-game-btn': showCrocodileGame,
        'bomb-game-btn': showBombGame,
        'questions-game-btn': showQuestionsGame,
        'truth-game-btn': showTruthGame,
        'dice-game-btn': showDiceGame,
        'guess-game-btn': showGuessGame,
        'leader-game-btn': showLeaderGame,
        'word-association-btn': showWordAssociationGame,
        'story-game-btn': showStoryGame,
        'fact-game-btn': showFactGame,
        'bottles-game-btn': showBottlesGame,
        'swap-game-btn': showSwapGame
    };
    
    Object.keys(menuButtons).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Menu button clicked:', id);
                playSound('click');
                menuButtons[id]();
            });
        } else {
            console.error('Element not found:', id);
        }
    });
    
    // Кнопка звука
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
        soundBtn.addEventListener('click', (e) => {
            e.preventDefault();
            soundEnabled = !soundEnabled;
            soundBtn.textContent = soundEnabled ? '🔊 Звук: ВКЛ' : '🔇 Звук: ВЫКЛ';
            playSound('click');
        });
    }
    
    // Обработчики "Назад в меню"
    const backButtons = [
        'back-to-menu-1', 'back-to-menu-2', 'back-to-menu-3', 
        'back-to-menu-4', 'back-to-menu-5', 'back-to-menu-crocodile',
        'back-to-menu-bomb', 'back-to-menu-questions', 'back-to-menu-truth',
        'back-to-menu-dice', 'back-to-menu-guess', 'back-to-menu-leader',
        'back-to-menu-association', 'back-to-menu-story', 'back-to-menu-fact',
        'back-to-menu-bottles', 'back-to-menu-swap'
    ];
    
    backButtons.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                playSound('click');
                showMainMenu();
            });
        }
    });
    
    // Обработчики правил
    const rulesButtons = {
        'show-rules-spy': () => toggleRules('spy'),
        'back-from-rules-spy': () => showContent('spy'),
        'show-rules-crocodile': () => toggleRules('crocodile'),
        'back-from-rules-crocodile': () => showContent('crocodile'),
        'show-rules-bomb': () => toggleRules('bomb'),
        'back-from-rules-bomb': () => showContent('bomb'),
        'show-rules-questions': () => toggleRules('questions'),
        'back-from-rules-questions': () => showContent('questions'),
        'show-rules-truth': () => toggleRules('truth'),
        'back-from-rules-truth': () => showContent('truth'),
        'show-rules-leader': () => toggleRules('leader'),
        'back-from-rules-leader': () => showContent('leader'),
        'show-rules-association': () => toggleRules('association'),
        'back-from-rules-association': () => showContent('association'),
        'show-rules-story': () => toggleRules('story'),
        'back-from-rules-story': () => showContent('story'),
        'show-rules-fact': () => toggleRules('fact'),
        'back-from-rules-fact': () => showContent('fact'),
        'show-rules-bottles': () => toggleRules('bottles'),
        'back-from-rules-bottles': () => showContent('bottles'),
        'show-rules-swap': () => toggleRules('swap'),
        'back-from-rules-swap': () => showContent('swap')
    };
    
    Object.keys(rulesButtons).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                playSound('click');
                rulesButtons[id]();
            });
        }
    });
    
    // Обработчики Банан Шпиона
    if (hideWordBtn) hideWordBtn.addEventListener('click', (e) => { e.preventDefault(); handleHideWord(); });
    if (showWordBtn) showWordBtn.addEventListener('click', (e) => { e.preventDefault(); handleShowWord(); });
    if (startGameBtn) startGameBtn.addEventListener('click', (e) => { e.preventDefault(); showStartScreen(); });
    if (revealSpyBtn) revealSpyBtn.addEventListener('click', (e) => { e.preventDefault(); revealSpy(); });
    if (restartFromRole) restartFromRole.addEventListener('click', (e) => { e.preventDefault(); resetSpyGame(); });
    if (restartFromHidden) restartFromHidden.addEventListener('click', (e) => { e.preventDefault(); resetSpyGame(); });
    if (restartFromDone) restartFromDone.addEventListener('click', (e) => { e.preventDefault(); resetSpyGame(); });
    if (restartFromStart) restartFromStart.addEventListener('click', (e) => { e.preventDefault(); resetSpyGame(); });
    
    // Обработчики Крокодила
    if (nextCrocodileWordBtn) nextCrocodileWordBtn.addEventListener('click', (e) => { e.preventDefault(); showNextCrocodileWord(); });
    
    // Обработчики Бомбы
    if (startBombBtn) startBombBtn.addEventListener('click', (e) => { e.preventDefault(); startBombGame(); });
    
    const bombTimeButtons = {
        'set-bomb-5s': 5,
        'set-bomb-10s': 10,
        'set-bomb-15s': 15,
        'set-bomb-30s': 30
    };
    
    Object.keys(bombTimeButtons).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                setBombDuration(bombTimeButtons[id]);
            });
        }
    });
    
    // Обработчики 20 вопросов
    if (startQuestionsBtn) startQuestionsBtn.addEventListener('click', (e) => { e.preventDefault(); startQuestionsGame(); });
    if (resetQuestionsBtn) resetQuestionsBtn.addEventListener('click', (e) => { e.preventDefault(); resetQuestionsGame(); });
    
    // Обработчики Правда или Действие
    if (generateTruthBtn) generateTruthBtn.addEventListener('click', (e) => { e.preventDefault(); generateTruthOrAction(); });
    
    // Обработчики Кубика
    if (rollDiceBtn) rollDiceBtn.addEventListener('click', (e) => { e.preventDefault(); rollDice(); });
    
    // Обработчики Угадай Число
    if (guessStartBtn) guessStartBtn.addEventListener('click', (e) => { e.preventDefault(); startGuessGame(); });
    if (guessHigherBtn) guessHigherBtn.addEventListener('click', (e) => { e.preventDefault(); makeGuess('higher'); });
    if (guessCorrectBtn) guessCorrectBtn.addEventListener('click', (e) => { e.preventDefault(); makeGuess('correct'); });
    if (guessLowerBtn) guessLowerBtn.addEventListener('click', (e) => { e.preventDefault(); makeGuess('lower'); });
    if (resetGuessBtn) resetGuessBtn.addEventListener('click', (e) => { e.preventDefault(); resetGuessGame(); });
    
    // Обработчики Тайного лидера
    if (startLeaderGameBtn) startLeaderGameBtn.addEventListener('click', (e) => { e.preventDefault(); startLeaderGame(); });
    
    // Обработчики Ассоциаций
    if (nextAssociationWordBtn) nextAssociationWordBtn.addEventListener('click', (e) => { e.preventDefault(); showNextAssociationWord(); });
    
    // Обработчики Смешной истории
    if (storyNextBtn) storyNextBtn.addEventListener('click', (e) => { e.preventDefault(); submitStoryAnswer(); });
    if (storyAnswerInput) {
        storyAnswerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitStoryAnswer();
            }
        });
    }
    if (storyStartBtn) storyStartBtn.addEventListener('click', (e) => { e.preventDefault(); resetStoryGame(); });
    
    // Обработчики Факт или Фейк
    if (factTrueBtn) factTrueBtn.addEventListener('click', (e) => { e.preventDefault(); checkFact(true); });
    if (factFalseBtn) factFalseBtn.addEventListener('click', (e) => { e.preventDefault(); checkFact(false); });
    if (factNextBtn) factNextBtn.addEventListener('click', (e) => { e.preventDefault(); showNextFact(); });
    
    // Обработчики Бутылочек
    const bottlesButtons = {
        'start-bottles-game': startBottlesGame,
        'reset-bottles-game': resetBottlesGame
    };
    
    Object.keys(bottlesButtons).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                bottlesButtons[id]();
            });
        }
    });
    
    const bottlesCountButtons = {
        'bottles-4': 4,
        'bottles-6': 6,
        'bottles-8': 8
    };
    
    Object.keys(bottlesCountButtons).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                setBottlesCount(bottlesCountButtons[id]);
            });
        }
    });
    
    const bottlesModeButtons = {
        'mode-bottles': 'bottles',
        'mode-caps': 'caps',
        'mode-emoji': 'emoji'
    };
    
    Object.keys(bottlesModeButtons).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                setBottlesMode(bottlesModeButtons[id]);
            });
        }
    });
    
    // Обработчики Обмена
    const swapButtons = {
        'start-swap-game': startSwapGame,
        'reset-swap-game': resetSwapGame
    };
    
    Object.keys(swapButtons).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                swapButtons[id]();
            });
        }
    });
    
    const swapCountButtons = {
        'swap-4': 4,
        'swap-6': 6
    };
    
    Object.keys(swapCountButtons).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                setSwapCount(swapCountButtons[id]);
            });
        }
    });
    
    const swapModeButtons = {
        'swap-mode-bottles': 'bottles',
        'swap-mode-emoji': 'emoji'
    };
    
    Object.keys(swapModeButtons).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                setSwapMode(swapModeButtons[id]);
            });
        }
    });
    
    console.log('All event listeners attached successfully!');
}

// ================== ИНИЦИАЛИЗАЦИЯ ==================
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Инициализация звука при первом клике
    document.addEventListener('click', () => {
        initAudio();
    }, { once: true });
    
    // Привязываем все события
    attachEventListeners();
    
    // Запуск
    initPlayerButtons();
    resetBottlesGame();
    resetSwapGame();
    showMainMenu();
    
    console.log('Initialization complete!');
});

// Для мобильных устройств - добавляем touchstart для предотвращения задержки
document.addEventListener('touchstart', function() {}, {passive: true});
