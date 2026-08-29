// ================== СОСТОЯНИЕ БАНАН ШПИОНА ==================
let totalPlayers = 3;
let currentPlayerIndex = 0;
let currentPair = null;
let spyIndex = -1;
let recentlyUsedPairs = [];
const MAX_RECENT_PAIRS = 200;

// ================== СОСТОЯНИЕ КРОКОДИЛА ==================
let recentlyUsedCrocodileWords = [];
const MAX_RECENT_CROCODILE_WORDS = 100;

// ================== СОСТОЯНИЕ УЛЬТИМАТУМА ==================
let currentSituationIndex = -1;
let recentlyUsedSituations = [];
const MAX_RECENT_SITUATIONS = 10;

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

// ================== СОСТОЯНИЕ МАФИИ ==================
let mafiaPlayers = 6;
let mafiaRoles = [];
let rolesRevealed = [];

// ================== СОСТОЯНИЕ АССОЦИАЦИЙ ==================
let recentlyUsedAssociationWords = [];
const MAX_RECENT_ASSOCIATION_WORDS = 50;

// ================== ЭЛЕМЕНТЫ ==================
const gameMenu = document.getElementById('game-menu');
const mafiaGame = document.getElementById('mafia-game');
const spyGame = document.getElementById('spy-game');
const crocodileGame = document.getElementById('crocodile-game');
const bombGame = document.getElementById('bomb-game');
const questionsGame = document.getElementById('questions-game');
const truthGame = document.getElementById('truth-game');
const diceGame = document.getElementById('dice-game');
const guessGame = document.getElementById('guess-game');
const leaderGame = document.getElementById('leader-game');
const ultimatumGame = document.getElementById('ultimatum-game');
const wordAssociationGame = document.getElementById('word-association-game');

// Элементы Мафии
const mafiaPlayerSelectDiv = document.getElementById('mafia-player-select');
const mafiaRoleDisplay = document.getElementById('mafia-role-display');
const mafiaRolesList = document.getElementById('mafia-roles-list');
const mafiaRedistributeBtn = document.getElementById('mafia-redistribute-btn');

// Элементы Банан Шпиона
const screenSelect = document.getElementById('screen-select');
const screenRole = document.getElementById('screen-role');
const screenHidden = document.getElementById('screen-hidden');
const screenAllDone = document.getElementById('screen-all-done');
const screenStart = document.getElementById('screen-start');
const playerSelectDiv = document.getElementById('player-select');
const playerHeader = document.getElementById('player-header');
const roleDisplay = document.getElementById('role-display');
const hideWordBtn = document.getElementById('hide-word-btn');
const restartFromRole = document.getElementById('restart-from-role');
const nextPlayerHeader = document.getElementById('next-player-header');
const passMessageHidden = document.getElementById('pass-message-hidden');
const showWordBtn = document.getElementById('show-word-btn');
const restartFromHidden = document.getElementById('restart-from-hidden');
const startGameBtn = document.getElementById('start-game-btn');
const restartFromDone = document.getElementById('restart-from-done');
const restartFromStart = document.getElementById('restart-from-start');
const finalWords = document.getElementById('final-words');
const revealSpyBtn = document.getElementById('reveal-spy-btn');

// Элементы Крокодила
const crocodileWordDisplay = document.getElementById('crocodile-word-display');
const nextCrocodileWordBtn = document.getElementById('next-crocodile-word');

// Элементы Бомбы
const bombTimerDisplay = document.getElementById('bomb-timer');
const bombWordDisplay = document.getElementById('bomb-word-display');
const startBombBtn = document.getElementById('start-bomb-game');

// Элементы 20 вопросов
const questionsWordDisplay = document.getElementById('questions-word-display');
const questionsCounter = document.getElementById('questions-counter');
const startQuestionsBtn = document.getElementById('start-questions-game');
const resetQuestionsBtn = document.getElementById('reset-questions-game');

// Элементы Правда или Действие
const truthCardDisplay = document.getElementById('truth-card-display');
const generateTruthBtn = document.getElementById('generate-truth');
const generateActionBtn = document.getElementById('generate-action');

// Элементы Кубика
const diceDisplay = document.getElementById('dice-display');
const rollDiceBtn = document.getElementById('roll-dice');

// Элементы Угадай Число
const guessCardDisplay = document.getElementById('guess-card-display');
const guessHigherBtn = document.getElementById('guess-higher');
const guessCorrectBtn = document.getElementById('guess-correct');
const guessLowerBtn = document.getElementById('guess-lower');
const resetGuessBtn = document.getElementById('reset-guess-game');

// Элементы Тайного лидера
const leaderRoleDisplay = document.getElementById('leader-role-display');
const startLeaderGameBtn = document.getElementById('start-leader-game');

// Элементы Ультиматума
const ultimatumSituation = document.getElementById('ultimatum-situation');
const ultimatumRoles = document.getElementById('ultimatum-roles');
const startUltimatumGameBtn = document.getElementById('start-ultimatum-game');

// Элементы Ассоциаций
const associationWordDisplay = document.getElementById('association-word-display');
const nextAssociationWordBtn = document.getElementById('next-association-word');

// ================== ФУНКЦИИ МЕНЮ ==================
function showMainMenu() {
    gameMenu.classList.remove('hidden');
    mafiaGame.classList.add('hidden');
    spyGame.classList.add('hidden');
    crocodileGame.classList.add('hidden');
    bombGame.classList.add('hidden');
    questionsGame.classList.add('hidden');
    truthGame.classList.add('hidden');
    diceGame.classList.add('hidden');
    guessGame.classList.add('hidden');
    leaderGame.classList.add('hidden');
    ultimatumGame.classList.add('hidden');
    wordAssociationGame.classList.add('hidden');
}

function showGame(gameElement) {
    gameMenu.classList.add('hidden');
    mafiaGame.classList.add('hidden');
    spyGame.classList.add('hidden');
    crocodileGame.classList.add('hidden');
    bombGame.classList.add('hidden');
    questionsGame.classList.add('hidden');
    truthGame.classList.add('hidden');
    diceGame.classList.add('hidden');
    guessGame.classList.add('hidden');
    leaderGame.classList.add('hidden');
    ultimatumGame.classList.add('hidden');
    wordAssociationGame.classList.add('hidden');
    gameElement.classList.remove('hidden');
}

function showMafiaGame() {
    showGame(mafiaGame);
    showMafiaContent();
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

function showUltimatumGame() {
    showGame(ultimatumGame);
    showUltimatumContent();
}

function showWordAssociationGame() {
    showGame(wordAssociationGame);
    showWordAssociationContent();
    showNextAssociationWord();
}

// ================== ФУНКЦИИ ПРАВИЛ ==================
function toggleRules(type) {
    let contentId, rulesId;
    
    if (type === 'mafia') {
        contentId = 'mafia-content';
        rulesId = 'rules-mafia';
    } else if (type === 'spy') {
        contentId = 'screen-select';
        rulesId = 'rules-spy';
    } else if (type === 'crocodile') {
        contentId = 'crocodile-content';
        rulesId = 'rules-crocodile';
    } else if (type === 'bomb') {
        contentId = 'bomb-content';
        rulesId = 'rules-bomb';
    } else if (type === 'questions') {
        contentId = 'questions-content';
        rulesId = 'rules-questions';
    } else if (type === 'truth') {
        contentId = 'truth-content';
        rulesId = 'rules-truth';
    } else if (type === 'leader') {
        contentId = 'leader-content';
        rulesId = 'rules-leader';
    } else if (type === 'ultimatum') {
        contentId = 'ultimatum-content';
        rulesId = 'rules-ultimatum';
    } else if (type === 'association') {
        contentId = 'word-association-content';
        rulesId = 'rules-association';
    }
    
    if (contentId && rulesId) {
        document.getElementById(contentId).classList.add('hidden');
        document.getElementById(rulesId).classList.remove('hidden');
    }
}

function showContent(type) {
    let contentId, rulesId;
    
    if (type === 'mafia') {
        contentId = 'mafia-content';
        rulesId = 'rules-mafia';
    } else if (type === 'spy') {
        contentId = 'screen-select';
        rulesId = 'rules-spy';
    } else if (type === 'crocodile') {
        contentId = 'crocodile-content';
        rulesId = 'rules-crocodile';
    } else if (type === 'bomb') {
        contentId = 'bomb-content';
        rulesId = 'rules-bomb';
    } else if (type === 'questions') {
        contentId = 'questions-content';
        rulesId = 'rules-questions';
    } else if (type === 'truth') {
        contentId = 'truth-content';
        rulesId = 'rules-truth';
    } else if (type === 'leader') {
        contentId = 'leader-content';
        rulesId = 'rules-leader';
    } else if (type === 'ultimatum') {
        contentId = 'ultimatum-content';
        rulesId = 'rules-ultimatum';
    } else if (type === 'association') {
        contentId = 'word-association-content';
        rulesId = 'rules-association';
    }
    
    if (contentId && rulesId) {
        document.getElementById(rulesId).classList.add('hidden');
        document.getElementById(contentId).classList.remove('hidden');
    }
}

// ================== ФУНКЦИИ МАФИИ ==================
function showMafiaContent() {
    document.getElementById('mafia-content').classList.remove('hidden');
    document.getElementById('rules-mafia').classList.add('hidden');
    initMafiaPlayerButtons();
}

function initMafiaPlayerButtons() {
    mafiaPlayerSelectDiv.innerHTML = '';
    for (let i = 6; i <= 17; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = 'btn';
        btn.style.minWidth = '50px';
        btn.style.padding = '12px';
        btn.addEventListener('click', () => {
            mafiaPlayers = i;
            distributeMafiaRoles();
        });
        mafiaPlayerSelectDiv.appendChild(btn);
    }
}

function distributeMafiaRoles() {
    const numPlayers = mafiaPlayers;
    const roles = [];
    const numMafia = Math.floor(numPlayers / 4);
    
    // Добавляем мафию
    for (let i = 0; i < numMafia; i++) {
        if (i === 0 && numPlayers >= 10) {
            roles.push({ role: 'Дон Мафии', emoji: '🔫', type: 'don' });
        } else {
            roles.push({ role: 'Мафия', emoji: '🔪', type: 'mafia' });
        }
    }
    
    // Добавляем доктора и комиссара
    roles.push({ role: 'Доктор', emoji: '💉', type: 'doctor' });
    roles.push({ role: 'Комиссар', emoji: '🔍', type: 'commissar' });
    
    // Добавляем любовницу для 10+ игроков
    if (numPlayers >= 10) {
        roles.push({ role: 'Любовница', emoji: '💋', type: 'mistress' });
    }
    
    // Добавляем мирных жителей
    const numCiviliansFinal = numPlayers - roles.length;
    for (let i = 0; i < numCiviliansFinal; i++) {
        roles.push({ role: 'Мирный житель', emoji: '👤', type: 'civilian' });
    }
    
    // Перемешиваем роли
    mafiaRoles = shuffleArray(roles);
    rolesRevealed = new Array(mafiaRoles.length).fill(false);
    
    // Отображаем роли
    displayMafiaRoles();
}

function displayMafiaRoles() {
    mafiaRoleDisplay.classList.remove('hidden');
    
    let rolesHTML = '<div style="font-size: 1.2rem; margin-bottom: 15px;">Нажмите на игрока, чтобы показать его роль:</div>';
    
    mafiaRoles.forEach((role, index) => {
        let cardClass = 'mafia-role-card ';
        if (role.type === 'civilian') cardClass += 'civilian';
        else if (role.type === 'mafia' || role.type === 'don') cardClass += 'mafia';
        else if (role.type === 'doctor') cardClass += 'doctor';
        else if (role.type === 'commissar') cardClass += 'commissar';
        else if (role.type === 'mistress') cardClass += 'mistress';
        
        const isRevealed = rolesRevealed[index];
        
        rolesHTML += `
            <div class="player-role-toggle ${isRevealed ? 'role-revealed' : ''}" data-index="${index}">
                <div style="font-size: 1.1rem; font-weight: bold;">
                    ${isRevealed ? `${role.emoji} ${role.role}` : `🎴 Игрок ${index + 1} (нажмите, чтобы показать)`}
                </div>
            </div>
        `;
    });
    
    mafiaRolesList.innerHTML = rolesHTML;
    
    // Добавляем обработчики кликов
    document.querySelectorAll('.player-role-toggle').forEach(element => {
        element.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            rolesRevealed[index] = !rolesRevealed[index];
            displayMafiaRoles();
        });
    });
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
    currentPlayerIndex++;
    showRoleScreen();
}

function showStartScreen() {
    // Не показываем слова и шпиона до нажатия кнопки
    finalWords.innerHTML = `
        <div>🔵 Мирные: <b>${currentPair.civilian}</b></div>
        <div>🔴 Шпион: <b>${currentPair.spy}</b> (игрок №${spyIndex + 1})</div>
    `;
    finalWords.classList.add('hidden');
    revealSpyBtn.classList.remove('hidden');
    showSpyScreen(screenStart);
}

function revealSpy() {
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
        bombDuration = seconds;
        bombCountdown = seconds;
        bombTimerDisplay.textContent = bombCountdown;
        bombTimerDisplay.className = 'bomb-timer';
    }
}

function startBombGame() {
    if (bombActive) {
        // Пауза
        clearInterval(bombTimer);
        bombTimer = null;
        bombActive = false;
        startBombBtn.textContent = '▶️ Продолжить';
    } else {
        // Старт или рестарт
        if (bombCountdown === 0) {
            bombCountdown = bombDuration;
            bombTimerDisplay.textContent = bombCountdown;
            bombTimerDisplay.className = 'bomb-timer';
            bombWordDisplay.textContent = 'НАЖМИ СТАРТ';
            bombWordDisplay.className = 'bomb-word';
        }
        bombActive = true;
        startBombBtn.textContent = '⏸️ Пауза';
        
        // Показываем первое слово
        if (bombWordDisplay.textContent === 'НАЖМИ СТАРТ') {
            showNextBombWord();
        }
        
        bombTimer = setInterval(() => {
            bombCountdown--;
            bombTimerDisplay.textContent = bombCountdown;
            
            if (bombCountdown <= 3 && bombCountdown > 0) {
                bombTimerDisplay.className = 'bomb-timer warning';
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

function generateTruth() {
    truthCardDisplay.textContent = `🎭 ПРАВДА: ${getRandomTruth()}`;
    truthCardDisplay.style.background = '#fff9c4';
    truthCardDisplay.style.color = '#333';
}

function generateAction() {
    truthCardDisplay.textContent = `🎯 ДЕЙСТВИЕ: ${getRandomAction()}`;
    truthCardDisplay.style.background = '#e3f2fd';
    truthCardDisplay.style.color = '#333';
}

// ================== ФУНКЦИИ КУБИКА ==================
function showDiceContent() {
    document.getElementById('dice-content').classList.remove('hidden');
}

function rollDice() {
    diceDisplay.classList.add('rolling');
    const randomResult = Math.floor(Math.random() * 6) + 1;
    
    setTimeout(() => {
        diceDisplay.textContent = randomResult;
        diceDisplay.classList.remove('rolling');
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
    guessCardDisplay.textContent = 'Загадай число от 1 до 100';
    document.getElementById('guess-buttons').classList.remove('hidden');
}

function makeGuess(response) {
    guessTries++;
    
    if (response === 'higher') {
        guessMin = guessCurrent + 1;
    } else if (response === 'lower') {
        guessMax = guessCurrent - 1;
    } else if (response === 'correct') {
        guessCardDisplay.textContent = `🎉 Я угадал за ${guessTries} попыток!`;
        document.getElementById('guess-buttons').classList.add('hidden');
        return;
    }
    
    if (guessMin > guessMax) {
        guessCardDisplay.textContent = 'Ты меня обманул! Начнём заново.';
        document.getElementById('guess-buttons').classList.add('hidden');
        return;
    }
    
    guessCurrent = Math.floor((guessMin + guessMax) / 2);
    guessCardDisplay.textContent = `Я думаю, это число ${guessCurrent}?`;
}

// ================== ФУНКЦИИ ТАЙНОГО ЛИДЕРА ==================
function startLeaderGame() {
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

// ================== ФУНКЦИИ УЛЬТИМАТУМА ==================
function getRandomSituationIndex() {
    let availableIndices = [];
    for (let i = 0; i < ULTIMATUM_SITUATIONS.length; i++) {
        if (!recentlyUsedSituations.includes(i)) {
            availableIndices.push(i);
        }
    }
    
    if (availableIndices.length === 0) {
        availableIndices = ULTIMATUM_SITUATIONS.map((_, index) => index);
    }
    
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    return availableIndices[randomIndex];
}

function startUltimatumGame() {
    const situationIndex = getRandomSituationIndex();
    currentSituationIndex = situationIndex;
    
    recentlyUsedSituations.push(situationIndex);
    while (recentlyUsedSituations.length > MAX_RECENT_SITUATIONS) {
        recentlyUsedSituations.shift();
    }
    
    const shuffledRoles = shuffleArray(ULTIMATUM_ROLES);
    
    ultimatumSituation.textContent = ULTIMATUM_SITUATIONS[situationIndex];
    
    ultimatumRoles.innerHTML = `
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <div class="role-badge">${shuffledRoles[0].emoji} Игрок 1: ${shuffledRoles[0].role}</div>
            <div class="role-badge">${shuffledRoles[1].emoji} Игрок 2: ${shuffledRoles[1].role}</div>
            <div class="role-badge">${shuffledRoles[2].emoji} Игрок 3: ${shuffledRoles[2].role}</div>
        </div>
        <div style="margin-top: 15px; color: #a0a0b0; font-size: 0.9rem;">
            Обсуждайте 60 секунд, затем голосуйте!
        </div>
    `;
}

function showUltimatumContent() {
    document.getElementById('ultimatum-content').classList.remove('hidden');
    document.getElementById('rules-ultimatum').classList.add('hidden');
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
    const word = getRandomAssociationWord();
    associationWordDisplay.textContent = word;
}

function showWordAssociationContent() {
    document.getElementById('word-association-content').classList.remove('hidden');
    document.getElementById('rules-association').classList.add('hidden');
}

// ================== ОБРАБОТЧИКИ МЕНЮ ==================
document.getElementById('mafia-game-btn').addEventListener('click', showMafiaGame);
document.getElementById('spy-game-btn').addEventListener('click', showSpyGame);
document.getElementById('crocodile-game-btn').addEventListener('click', showCrocodileGame);
document.getElementById('bomb-game-btn').addEventListener('click', showBombGame);
document.getElementById('questions-game-btn').addEventListener('click', showQuestionsGame);
document.getElementById('truth-game-btn').addEventListener('click', showTruthGame);
document.getElementById('dice-game-btn').addEventListener('click', showDiceGame);
document.getElementById('guess-game-btn').addEventListener('click', showGuessGame);
document.getElementById('leader-game-btn').addEventListener('click', showLeaderGame);
document.getElementById('ultimatum-game-btn').addEventListener('click', showUltimatumGame);
document.getElementById('word-association-btn').addEventListener('click', showWordAssociationGame);

// Обработчики "Назад в меню"
const backButtons = [
    'back-to-menu-mafia', 'back-to-menu-1', 'back-to-menu-2', 
    'back-to-menu-3', 'back-to-menu-4', 'back-to-menu-5',
    'back-to-menu-crocodile', 'back-to-menu-bomb', 'back-to-menu-questions',
    'back-to-menu-truth', 'back-to-menu-dice', 'back-to-menu-guess',
    'back-to-menu-leader', 'back-to-menu-ultimatum', 'back-to-menu-association'
];

backButtons.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('click', showMainMenu);
    }
});

// Обработчики правил
document.getElementById('show-rules-mafia').addEventListener('click', () => toggleRules('mafia'));
document.getElementById('back-from-rules-mafia').addEventListener('click', () => showContent('mafia'));
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
document.getElementById('show-rules-ultimatum').addEventListener('click', () => toggleRules('ultimatum'));
document.getElementById('back-from-rules-ultimatum').addEventListener('click', () => showContent('ultimatum'));
document.getElementById('show-rules-association').addEventListener('click', () => toggleRules('association'));
document.getElementById('back-from-rules-association').addEventListener('click', () => showContent('association'));

// Обработчики Мафии
mafiaRedistributeBtn.addEventListener('click', distributeMafiaRoles);

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
generateTruthBtn.addEventListener('click', generateTruth);
generateActionBtn.addEventListener('click', generateAction);

// Обработчики Кубика
rollDiceBtn.addEventListener('click', rollDice);

// Обработчики Угадай Число
guessHigherBtn.addEventListener('click', () => makeGuess('higher'));
guessCorrectBtn.addEventListener('click', () => makeGuess('correct'));
guessLowerBtn.addEventListener('click', () => makeGuess('lower'));
resetGuessBtn.addEventListener('click', resetGuessGame);

// Обработчики Тайного лидера
startLeaderGameBtn.addEventListener('click', startLeaderGame);

// Обработчики Ультиматума
startUltimatumGameBtn.addEventListener('click', startUltimatumGame);

// Обработчики Ассоциаций
nextAssociationWordBtn.addEventListener('click', showNextAssociationWord);

// ================== ЗАПУСК ==================
initPlayerButtons();
showMainMenu();
