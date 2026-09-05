// ================== DOM ЭЛЕМЕНТЫ ==================
// Меню
const gameMenu = document.getElementById('game-menu');

// Контейнеры игр
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
const generateActionBtn = document.getElementById('generate-action');

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

// ================== СОСТОЯНИЕ БАНАН ШПИОНА ==================
let totalPlayers = 3;
let currentPlayerIndex = 0;
let currentPair = null;
let spyIndex = -1;
let recentlyUsedPairs = [];
const MAX_RECENT_PAIRS = 50;

// ================== СОСТОЯНИЕ КРОКОДИЛА ==================
let recentlyUsedCrocodileWords = [];
const MAX_RECENT_CROCODILE_WORDS = 30;

// ================== СОСТОЯНИЕ БОМБЫ ==================
let bombTimer = null;
let bombCountdown = 10;
let bombActive = false;
let bombDuration = 10;

// ================== СОСТОЯНИЕ 20 ВОПРОСОВ ==================
let questionsCount = 0;

// ================== СОСТОЯНИЕ ПРАВДА ИЛИ ДЕЙСТВИЕ ==================
let recentlyUsedTruth = [];
let recentlyUsedAction = [];
const MAX_RECENT_TRUTH = 10;
const MAX_RECENT_ACTION = 10;

// ================== СОСТОЯНИЕ УГАДАЙ ЧИСЛО ==================
let guessMin = 1;
let guessMax = 100;
let guessCurrent = 50;
let guessTries = 0;
let guessGameStarted = false;

// ================== СОСТОЯНИЕ АССОЦИАЦИЙ ==================
let recentlyUsedAssociationWords = [];
const MAX_RECENT_ASSOCIATION_WORDS = 30;

// ================== СОСТОЯНИЕ СМЕШНОЙ ИСТОРИИ ==================
let storyAnswers = {};
let storyStep = 0;
let recentlyUsedStories = [];
const MAX_RECENT_STORIES = 5;

// ================== СОСТОЯНИЕ ФАКТ ИЛИ ФЕЙК ==================
let currentFact = null;
let recentlyUsedFacts = [];
const MAX_RECENT_FACTS = 30;

// ================== СОСТОЯНИЕ ИГРЫ БУТЫЛОЧКИ ==================
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

// ================== СОСТОЯНИЕ ЗВУКА ==================
let soundEnabled = true;
let audioContext = null;

// ================== ФУНКЦИИ ЗВУКА ==================
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type) {
    if (!soundEnabled) return;
    
    try {
        initAudio();
        
        let frequency = 440;
        let duration = 0.1;
        let volume = 0.3;
        
        switch(type) {
            case 'click':
                frequency = 600;
                duration = 0.05;
                volume = 0.2;
                break;
            case 'flip':
                frequency = 800;
                duration = 0.08;
                volume = 0.25;
                break;
            case 'success':
                frequency = 880;
                duration = 0.2;
                volume = 0.4;
                break;
            case 'fail':
                frequency = 220;
                duration = 0.3;
                volume = 0.3;
                break;
            case 'tick':
                frequency = 1000;
                duration = 0.03;
                volume = 0.15;
                break;
            case 'bomb':
                frequency = 110;
                duration = 0.5;
                volume = 0.5;
                break;
            case 'win':
                frequency = 1200;
                duration = 0.4;
                volume = 0.5;
                break;
            case 'roll':
                frequency = 400;
                duration = 0.15;
                volume = 0.3;
                break;
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
        console.log('Звук недоступен');
    }
}

function playBombTick() {
    if (!soundEnabled) return;
    playSound('tick');
}

function playBombExplosion() {
    if (!soundEnabled) return;
    
    try {
        initAudio();
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
        
        gainNode.gain.value = 0.5;
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
        
    } catch(e) {
        console.log('Звук недоступен');
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
}

function showCrocodileGame() {
    showGame(crocodileGame);
    showCrocodileContent();
    showNextCrocodileWord();
}

function showBombGame() {
    showGame(bombGame);
    showBombContent();
    resetBombGame();
}

function showQuestionsGame() {
    showGame(questionsGame);
    showQuestionsContent();
    resetQuestionsGame();
}

function showTruthGame() {
    showGame(truthGame);
    showTruthContent();
}

function showDiceGame() {
    showGame(diceGame);
    showDiceContent();
}

function showGuessGame() {
    showGame(guessGame);
    showGuessContent();
    resetGuessGame();
}

function showLeaderGame() {
    showGame(leaderGame);
    showLeaderContent();
}

function showWordAssociationGame() {
    showGame(wordAssociationGame);
    showWordAssociationContent();
    showNextAssociationWord();
}

function showStoryGame() {
    showGame(storyGame);
    showStoryContent();
    resetStoryGame();
}

function showFactGame() {
    showGame(factGame);
    showFactContent();
    showNextFact();
}

function showBottlesGame() {
    showGame(bottlesGame);
    showBottlesContent();
    resetBottlesGame();
}

// ================== ФУНКЦИИ ПРАВИЛ ==================
function toggleRules(type) {
    let contentId, rulesId;
    
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
        'bottles': ['bottles-content', 'rules-bottles']
    };
    
    if (rulesMap[type]) {
        contentId = rulesMap[type][0];
        rulesId = rulesMap[type][1];
        
        document.getElementById(contentId).classList.add('hidden');
        document.getElementById(rulesId).classList.remove('hidden');
    }
}

function showContent(type) {
    let contentId, rulesId;
    
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
        'bottles': ['bottles-content', 'rules-bottles']
    };
    
    if (rulesMap[type]) {
        contentId = rulesMap[type][0];
        rulesId = rulesMap[type][1];
        
        document.getElementById(rulesId).classList.add('hidden');
        document.getElementById(contentId).classList.remove('hidden');
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
        btn.addEventListener('click', () => {
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
        if (!recentlyUsedPairs.includes(i)) {
            availableIndices.push(i);
        }
    }
    
    if (availableIndices.length === 0) {
        availableIndices = WORD_PAIRS.map((_, index) => index);
    }
    
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    return availableIndices[randomIndex];
}

function addToRecentlyUsed(index) {
    recentlyUsedPairs.push(index);
    while (recentlyUsedPairs.length > MAX_RECENT_PAIRS) {
        recentlyUsedPairs.shift();
    }
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
    
    if (isSpy) {
        roleDisplay.textContent = currentPair.spy;
    } else {
        roleDisplay.textContent = currentPair.civilian;
    }
    
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
        if (!recentlyUsedCrocodileWords.includes(i)) {
            availableWords.push(i);
        }
    }
    
    if (availableWords.length === 0) {
        availableWords = CROCODILE_WORDS.map((_, index) => index);
    }
    
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const wordIndex = availableWords[randomIndex];
    
    recentlyUsedCrocodileWords.push(wordIndex);
    while (recentlyUsedCrocodileWords.length > MAX_RECENT_CROCODILE_WORDS) {
        recentlyUsedCrocodileWords.shift();
    }
    
    return CROCODILE_WORDS[wordIndex];
}

function showNextCrocodileWord() {
    playSound('flip');
    const word = getRandomCrocodileWord();
    crocodileWordDisplay.textContent = word;
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
    if (bombTimer) {
        clearInterval(bombTimer);
        bombTimer = null;
    }
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
        
        if (bombWordDisplay.textContent === 'НАЖМИ СТАРТ') {
            showNextBombWord();
        }
        
        bombTimer = setInterval(() => {
            bombCountdown--;
            bombTimerDisplay.textContent = bombCountdown;
            
            if (bombCountdown <= 3 && bombCountdown > 0) {
                bombTimerDisplay.className = 'bomb-timer warning';
                playBombTick();
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
                playBombExplosion();
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
        if (!recentlyUsedTruth.includes(i)) {
            availableIndices.push(i);
        }
    }
    
    if (availableIndices.length === 0) {
        availableIndices = TRUTH_QUESTIONS.map((_, index) => index);
    }
    
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const truthIndex = availableIndices[randomIndex];
    
    recentlyUsedTruth.push(truthIndex);
    while (recentlyUsedTruth.length > MAX_RECENT_TRUTH) {
        recentlyUsedTruth.shift();
    }
    
    return TRUTH_QUESTIONS[truthIndex];
}

function getRandomAction() {
    let availableIndices = [];
    for (let i = 0; i < ACTION_TASKS.length; i++) {
        if (!recentlyUsedAction.includes(i)) {
            availableIndices.push(i);
        }
    }
    
    if (availableIndices.length === 0) {
        availableIndices = ACTION_TASKS.map((_, index) => index);
    }
    
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const actionIndex = availableIndices[randomIndex];
    
    recentlyUsedAction.push(actionIndex);
    while (recentlyUsedAction.length > MAX_RECENT_ACTION) {
        recentlyUsedAction.shift();
    }
    
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
    
    // Показываем кнопку "Начать" вместо кнопок ответа
    document.getElementById('guess-buttons').classList.add('hidden');
    if (guessStartBtn) {
        guessStartBtn.classList.remove('hidden');
    }
}

function startGuessGame() {
    playSound('click');
    
    guessGameStarted = true;
    guessCardDisplay.textContent = `Я думаю, это число ${guessCurrent}?`;
    
    // Показываем кнопки ответа, скрываем кнопку "Начать"
    document.getElementById('guess-buttons').classList.remove('hidden');
    if (guessStartBtn) {
        guessStartBtn.classList.add('hidden');
    }
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
        if (!recentlyUsedAssociationWords.includes(i)) {
            availableWords.push(i);
        }
    }
    
    if (availableWords.length === 0) {
        availableWords = ASSOCIATION_WORDS.map((_, index) => index);
    }
    
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const wordIndex = availableWords[randomIndex];
    
    recentlyUsedAssociationWords.push(wordIndex);
    while (recentlyUsedAssociationWords.length > MAX_RECENT_ASSOCIATION_WORDS) {
        recentlyUsedAssociationWords.shift();
    }
    
    return ASSOCIATION_WORDS[wordIndex];
}

function showNextAssociationWord() {
    playSound('flip');
    const word = getRandomAssociationWord();
    associationWordDisplay.textContent = word;
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
    
    const animal = storyAnswers['животное'] || 'животное';
    const animal2 = storyAnswers['животное2'] || 'животное';
    const name = storyAnswers['имя'] || 'Алекс';
    const name2 = storyAnswers['имя2'] || 'Саша';
    
    const isFeminine1 = name.endsWith('а') || name.endsWith('я');
    const isFeminine2 = name2.endsWith('а') || name2.endsWith('я');
    
    let action = storyAnswers['действие'] || 'бегать';
    let action2 = storyAnswers['действие2'] || 'прыгать';
    let action3 = storyAnswers['действие3'] || 'танцевать';
    
    story = story.replace(/{животное}/g, animal);
    story = story.replace(/{животное2}/g, animal2);
    story = story.replace(/{имя}/g, name);
    story = story.replace(/{имя2}/g, name2);
    story = story.replace(/{место}/g, storyAnswers['место'] || 'парк');
    story = story.replace(/{еда}/g, storyAnswers['еда'] || 'пицца');
    story = story.replace(/{предмет}/g, storyAnswers['предмет'] || 'мяч');
    story = story.replace(/{предмет2}/g, storyAnswers['предмет2'] || 'зонт');
    story = story.replace(/{действие}/g, action);
    story = story.replace(/{действие2}/g, action2);
    story = story.replace(/{действие3}/g, action3);
    
    story = story.replace(/он\(а\)/g, isFeminine1 ? 'она' : 'он');
    story = story.replace(/его\(её\)/g, isFeminine1 ? 'её' : 'его');
    story = story.replace(/ему\(ей\)/g, isFeminine1 ? 'ей' : 'ему');
    story = story.replace(/\(ла\)/g, isFeminine1 ? 'ла' : 'л');
    story = story.replace(/\(лась\)/g, isFeminine1 ? 'лась' : 'лся');
    story = story.replace(/\(ась\)/g, isFeminine1 ? 'ась' : 'ся');
    story = story.replace(/\(лся\)/g, isFeminine1 ? 'лась' : 'лся');
    story = story.replace(/\(ой\)/g, isFeminine1 ? 'ой' : 'ый');
    story = story.replace(/\(ая\)/g, isFeminine1 ? 'ая' : 'ой');
    
    story = story.replace(/\([^)]*\)/g, 'л');
    
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
        if (!recentlyUsedFacts.includes(i)) {
            availableFacts.push(i);
        }
    }
    
    if (availableFacts.length === 0) {
        availableFacts = FACTS.map((_, index) => index);
    }
    
    const factIndex = availableFacts[Math.floor(Math.random() * availableFacts.length)];
    
    recentlyUsedFacts.push(factIndex);
    while (recentlyUsedFacts.length > MAX_RECENT_FACTS) {
        recentlyUsedFacts.shift();
    }
    
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
    
    if (bottlesTimer) {
        clearInterval(bottlesTimer);
    }
    bottlesTimer = setInterval(() => {
        bottlesSeconds++;
        updateBottlesTimer();
    }, 1000);
    
    renderBottlesGame();
    updateBottlesStats();
    
    const resultElement = document.getElementById('bottles-result');
    if (resultElement) {
        resultElement.classList.add('hidden');
    }
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
    
    const modeMap = {
        'bottles': 'mode-bottles',
        'caps': 'mode-caps',
        'emoji': 'mode-emoji'
    };
    
    const activeBtn = document.getElementById(modeMap[mode]);
    if (activeBtn) {
        activeBtn.style.background = '#e94560';
    }
    
    resetBottlesGame();
}

function setBottlesCount(count) {
    if (bottlesGameActive && bottlesAttempts > 0) return;
    
    playSound('click');
    bottlesCount = count;
    
    document.querySelectorAll('.bottles-count-btn').forEach(btn => {
        btn.style.background = '#533483';
    });
    
    const countMap = {
        4: 'bottles-4',
        6: 'bottles-6',
        8: 'bottles-8'
    };
    
    const activeBtn = document.getElementById(countMap[count]);
    if (activeBtn) {
        activeBtn.style.background = '#e94560';
    }
    
    resetBottlesGame();
}

function renderBottlesGame() {
    const firstRowElement = document.getElementById('bottles-first-row');
    const secondRowElement = document.getElementById('bottles-second-row');
    
    if (!firstRowElement || !secondRowElement) return;
    
    firstRowElement.innerHTML = '';
    secondRowElement.innerHTML = '';
    
    const bottleSize = bottlesCount <= 4 ? '80px' : bottlesCount <= 6 ? '65px' : '50px';
    
    bottlesFirstRow.forEach((emoji, index) => {
        const bottleElement = createBottleElement(emoji, index, 'first');
        bottleElement.style.width = bottleSize;
        bottleElement.style.height = bottleSize;
        bottleElement.style.fontSize = bottlesCount <= 4 ? '3rem' : bottlesCount <= 6 ? '2.5rem' : '2rem';
        firstRowElement.appendChild(bottleElement);
    });
    
    bottlesSecondRow.forEach((emoji, index) => {
        const bottleElement = createBottleElement(emoji, index, 'second');
        bottleElement.style.width = bottleSize;
        bottleElement.style.height = bottleSize;
        bottleElement.style.fontSize = bottlesCount <= 4 ? '3rem' : bottlesCount <= 6 ? '2.5rem' : '2rem';
        secondRowElement.appendChild(bottleElement);
    });
}

function createBottleElement(emoji, index, row) {
    const element = document.createElement('div');
    element.className = 'bottle-item';
    element.textContent = emoji;
    
    const isMatched = bottlesMatched.has(index);
    if (isMatched) {
        element.classList.add('matched');
    }
    
    if (row === 'first' && bottlesSelectedFirst === index) {
        element.classList.add('selected');
    }
    if (row === 'second' && bottlesSelectedSecond === index) {
        element.classList.add('selected');
    }
    
    element.addEventListener('click', () => {
        if (!bottlesGameActive) return;
        
        if (row === 'first') {
            playSound('click');
            bottlesSelectedFirst = index;
            renderBottlesGame();
            
            if (bottlesSelectedSecond !== null) {
                checkBottlesMatch();
            }
        } else if (row === 'second') {
            playSound('click');
            bottlesSelectedSecond = index;
            renderBottlesGame();
            
            if (bottlesSelectedFirst !== null) {
                checkBottlesMatch();
            }
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
    
    if (attemptsElement) {
        attemptsElement.textContent = `Попытки: ${bottlesAttempts}/${bottlesMaxAttempts}`;
    }
    
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
    
    if (bottlesTimer) {
        clearInterval(bottlesTimer);
        bottlesTimer = null;
    }
    
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
    if (bottlesTimer) {
        clearInterval(bottlesTimer);
        bottlesTimer = null;
    }
    
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
    
    if (firstRowElement) {
        firstRowElement.innerHTML = '<div style="color: #aaa; padding: 20px;">Выбери режим и нажми "Начать"</div>';
    }
    if (secondRowElement) {
        secondRowElement.innerHTML = '<div style="color: #aaa; padding: 20px;"></div>';
    }
    
    const resultElement = document.getElementById('bottles-result');
    if (resultElement) {
        resultElement.classList.add('hidden');
    }
    
    const timerElement = document.getElementById('bottles-timer');
    if (timerElement) {
        timerElement.textContent = '⏱️ 0:00';
    }
    
    const attemptsElement = document.getElementById('bottles-attempts');
    if (attemptsElement) {
        attemptsElement.textContent = 'Попытки: 0/0';
    }
    
    const matchedElement = document.getElementById('bottles-matched');
    if (matchedElement) {
        matchedElement.textContent = 'Найдено пар: 0/0';
    }
}

// ================== ОБРАБОТЧИКИ МЕНЮ ==================
document.getElementById('spy-game-btn').addEventListener('click', showSpyGame);
document.getElementById('crocodile-game-btn').addEventListener('click', showCrocodileGame);
document.getElementById('bomb-game-btn').addEventListener('click', showBombGame);
document.getElementById('questions-game-btn').addEventListener('click', showQuestionsGame);
document.getElementById('truth-game-btn').addEventListener('click', showTruthGame);
document.getElementById('dice-game-btn').addEventListener('click', showDiceGame);
document.getElementById('guess-game-btn').addEventListener('click', showGuessGame);
document.getElementById('leader-game-btn').addEventListener('click', showLeaderGame);
document.getElementById('word-association-btn').addEventListener('click', showWordAssociationGame);
document.getElementById('story-game-btn').addEventListener('click', showStoryGame);
document.getElementById('fact-game-btn').addEventListener('click', showFactGame);
document.getElementById('bottles-game-btn').addEventListener('click', showBottlesGame);

// Кнопка звука
document.getElementById('sound-toggle-btn').addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    document.getElementById('sound-toggle-btn').textContent = soundEnabled ? '🔊 Звук: ВКЛ' : '🔇 Звук: ВЫКЛ';
    playSound('click');
});

// Обработчики "Назад в меню"
const backButtons = [
    'back-to-menu-1', 'back-to-menu-2', 'back-to-menu-3', 
    'back-to-menu-4', 'back-to-menu-5', 'back-to-menu-crocodile',
    'back-to-menu-bomb', 'back-to-menu-questions', 'back-to-menu-truth',
    'back-to-menu-dice', 'back-to-menu-guess', 'back-to-menu-leader',
    'back-to-menu-association', 'back-to-menu-story', 'back-to-menu-fact',
    'back-to-menu-bottles'
];

backButtons.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('click', () => {
            playSound('click');
            showMainMenu();
        });
    }
});

// Обработчики правил
document.getElementById('show-rules-spy').addEventListener('click', () => toggleRules('spy'));
document.getElementById('back-from-rules-spy').addEventListener('click', () => showContent('spy'));
document.getElementById('show-rules-crocodile').addEventListener('click', () => toggleRules('crocodile'));
document.getElementById('back-from-rules-crocodile').addEventListener('click', () => showContent('crocodile'));
document.getElementById('show-rules-bomb').addEventListener('click', () => toggleRules('bomb'));
document.getElementById('back-from-rules-bomb').addEventListener('click', () => showContent('bomb'));
document.getElementById('show-rules-questions').addEventListener('click', () => toggleRules('questions'));
document.getElementById('back-from-rules-questions').addEventListener('click', () => showContent('questions'));
document.getElementById('show-rules-truth').addEventListener('click', () => toggleRules('truth'));
document.getElementById('back-from-rules-truth').addEventListener('click', () => showContent('truth'));
document.getElementById('show-rules-leader').addEventListener('click', () => toggleRules('leader'));
document.getElementById('back-from-rules-leader').addEventListener('click', () => showContent('leader'));
document.getElementById('show-rules-association').addEventListener('click', () => toggleRules('association'));
document.getElementById('back-from-rules-association').addEventListener('click', () => showContent('association'));
document.getElementById('show-rules-story').addEventListener('click', () => toggleRules('story'));
document.getElementById('back-from-rules-story').addEventListener('click', () => showContent('story'));
document.getElementById('show-rules-fact').addEventListener('click', () => toggleRules('fact'));
document.getElementById('back-from-rules-fact').addEventListener('click', () => showContent('fact'));
document.getElementById('show-rules-bottles').addEventListener('click', () => toggleRules('bottles'));
document.getElementById('back-from-rules-bottles').addEventListener('click', () => showContent('bottles'));

// Обработчики Банан Шпиона
hideWordBtn.addEventListener('click', handleHideWord);
showWordBtn.addEventListener('click', handleShowWord);
startGameBtn.addEventListener('click', showStartScreen);
revealSpyBtn.addEventListener('click', revealSpy);
restartFromRole.addEventListener('click', resetSpyGame);
restartFromHidden.addEventListener('click', resetSpyGame);
restartFromDone.addEventListener('click', resetSpyGame);
restartFromStart.addEventListener('click', resetSpyGame);

// Обработчики Крокодила
nextCrocodileWordBtn.addEventListener('click', showNextCrocodileWord);

// Обработчики Бомбы
startBombBtn.addEventListener('click', startBombGame);
document.getElementById('set-bomb-5s').addEventListener('click', () => setBombDuration(5));
document.getElementById('set-bomb-10s').addEventListener('click', () => setBombDuration(10));
document.getElementById('set-bomb-15s').addEventListener('click', () => setBombDuration(15));
document.getElementById('set-bomb-30s').addEventListener('click', () => setBombDuration(30));

// Обработчики 20 вопросов
startQuestionsBtn.addEventListener('click', startQuestionsGame);
resetQuestionsBtn.addEventListener('click', resetQuestionsGame);

// Обработчики Правда или Действие
generateTruthBtn.addEventListener('click', generateTruthOrAction);
generateActionBtn.addEventListener('click', generateTruthOrAction);

// Обработчики Кубика
rollDiceBtn.addEventListener('click', rollDice);

// Обработчики Угадай Число
if (guessStartBtn) {
    guessStartBtn.addEventListener('click', startGuessGame);
}
guessHigherBtn.addEventListener('click', () => makeGuess('higher'));
guessCorrectBtn.addEventListener('click', () => makeGuess('correct'));
guessLowerBtn.addEventListener('click', () => makeGuess('lower'));
resetGuessBtn.addEventListener('click', resetGuessGame);

// Обработчики Тайного лидера
startLeaderGameBtn.addEventListener('click', startLeaderGame);

// Обработчики Ассоциаций
nextAssociationWordBtn.addEventListener('click', showNextAssociationWord);

// Обработчики Смешной истории
storyNextBtn.addEventListener('click', submitStoryAnswer);
storyAnswerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitStoryAnswer();
    }
});
storyStartBtn.addEventListener('click', resetStoryGame);

// Обработчики Факт или Фейк
factTrueBtn.addEventListener('click', () => checkFact(true));
factFalseBtn.addEventListener('click', () => checkFact(false));
factNextBtn.addEventListener('click', showNextFact);

// Обработчики Бутылочек
document.getElementById('start-bottles-game').addEventListener('click', startBottlesGame);
document.getElementById('reset-bottles-game').addEventListener('click', resetBottlesGame);
document.getElementById('bottles-4').addEventListener('click', () => setBottlesCount(4));
document.getElementById('bottles-6').addEventListener('click', () => setBottlesCount(6));
document.getElementById('bottles-8').addEventListener('click', () => setBottlesCount(8));
document.getElementById('mode-bottles').addEventListener('click', () => setBottlesMode('bottles'));
document.getElementById('mode-caps').addEventListener('click', () => setBottlesMode('caps'));
document.getElementById('mode-emoji').addEventListener('click', () => setBottlesMode('emoji'));

// ================== ЗАПУСК ==================
initPlayerButtons();
resetBottlesGame();
showMainMenu();
