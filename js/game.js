// ============================================
// SVG ICONS FOR CATEGORIES
// ============================================

const CATEGORY_ICONS = {
    "Family": `<svg viewBox="0 0 48 48" fill="currentColor"><path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-2 30l-8-8 2.83-2.83L22 28.34l13.17-13.17L38 18 22 34z" opacity="0"/><path d="M35 16c0-2.76-2.24-5-5-5s-5 2.24-5 5c0 1.86 1.03 3.47 2.54 4.33L24 28l-3.54-7.67C21.97 19.47 23 17.86 23 16c0-2.76-2.24-5-5-5s-5 2.24-5 5c0 1.86 1.03 3.47 2.54 4.33L8 38h32L32.46 20.33C33.97 19.47 35 17.86 35 16zM18 14c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6 20l3-8 3 8H24zm6-18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>`,
    "Sci-Fi": `<svg viewBox="0 0 48 48" fill="currentColor"><path d="M24 2L4 14v20l20 12 20-12V14L24 2zm0 4.5l14 8.4v15.2l-14 8.4-14-8.4V14.9l14-8.4zM24 16c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>`,
    "Fantasy": `<svg viewBox="0 0 48 48" fill="currentColor"><path d="M24 4l-6 18h-14l11.5 8.5-4.5 13.5 13-9.5 13 9.5-4.5-13.5L44 22H30L24 4z"/></svg>`,
    "Superhero": `<svg viewBox="0 0 48 48" fill="currentColor"><path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 6c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 28c-5.52 0-10.29-3.23-12.54-7.9.06-4.15 8.36-6.43 12.54-6.43s12.48 2.28 12.54 6.43C33.29 34.77 29.52 38 24 38z"/><path d="M15 20l-3 4 6 2-3-6zm18 0l-3 6 6-2-3-4z"/></svg>`,
    "Emotional Damage": `<svg viewBox="0 0 48 48" fill="currentColor"><path d="M24 44l-2.5-2.27C10.3 31.52 4 25.79 4 18.5 4 12.42 8.42 8 14.5 8c3.43 0 6.73 1.6 8.86 4.11L24 12.8l.64-.69C26.77 9.6 30.07 8 33.5 8 39.58 8 44 12.42 44 18.5c0 7.29-6.3 13.02-17.5 23.23L24 44z"/><path d="M19 22l5 5 5-5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
    "Streaming Hits": `<svg viewBox="0 0 48 48" fill="currentColor"><rect x="6" y="10" width="36" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="3"/><path d="M20 18v8l7-4-7-4z"/><line x1="16" y1="38" x2="32" y2="38" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`
};

const DAILY_QUOTES = [
    { quote: "Every great film should seem new every time you see it.", source: "Roger Ebert" },
    { quote: "Cinema is a matter of what's in the frame and what's out.", source: "Martin Scorsese" },
    { quote: "A film is never really good unless the camera is an eye in the head of a poet.", source: "Orson Welles" },
    { quote: "Movies are like an expensive form of therapy for me.", source: "Tim Burton" },
    { quote: "The cinema is truth twenty-four times per second.", source: "Jean-Luc Godard" },
    { quote: "Film lovers are sick people.", source: "François Truffaut" },
    { quote: "I don't dream at night, I dream all day; I dream for a living.", source: "Steven Spielberg" },
    { quote: "Cinema is the most beautiful fraud in the world.", source: "Jean-Luc Godard" },
    { quote: "A story should have a beginning, a middle and an end, but not necessarily in that order.", source: "Jean-Luc Godard" },
    { quote: "Every single movie is a miracle.", source: "Guillermo del Toro" },
    { quote: "The length of a film should be directly related to the endurance of the human bladder.", source: "Alfred Hitchcock" },
    { quote: "If it can be written, or thought, it can be filmed.", source: "Stanley Kubrick" }
];

// ============================================
// GAME ENGINE
// ============================================

class PlotTwisted {
    constructor() {
        this.state = {
            currentScreen: 'start',
            selectedCategory: null,
            currentMode: 'classic',
            questions: [],
            currentIndex: 0,
            totalScore: 0,
            strikes: 3,
            currentPot: 500,
            revealedIndices: [],
            guessedLetters: [],
            results: [],
            seenClues: {},
            // Daily
            dailyQuestions: [],
            dailyIndex: 0,
            dailyResults: [],
            dailyCompleted: false
        };
        
        this.config = {
            maxPot: 500,
            wrongLetterCost: 30,
            minPot: 50,
            questionsPerRound: 5
        };
        
        this.clueBank = null;
        this.settings = { sound: false };
        this.lastRoastIndexByType = {};
    }

    async init() {
        this.cacheDOM();
        this.bindEvents();
        this.loadSettings();
        this.loadSeenClues();
        this.runAnswerMatcherSelfTest();
        
        await this.loadClueDatabase();
        
        this.loadDailyQuote();
        this.checkDailyStatus();
        this.showScreen('start');
    }
    
    async loadClueDatabase() {
        try {
            const response = await fetch('./clues.json');
            if (!response.ok) throw new Error('Failed to load clues');
            this.clueBank = await response.json();
            
            document.getElementById('quickPlayBtn').disabled = false;
            document.getElementById('dailyBtn').disabled = false;
            document.getElementById('loadingOverlay').classList.add('hidden');
            
            console.log('✅ Clue database loaded:', Object.keys(this.clueBank));
        } catch (err) {
            console.error("❌ Clues failed to load:", err);
            document.querySelector('.loading-text').textContent = 'Failed to load. Please refresh.';
        }
    }

    cacheDOM() {
        this.screens = {
            start: document.getElementById('startScreen'),
            mode: document.getElementById('modeScreen'),
            category: document.getElementById('categoryScreen'),
            howToPlay: document.getElementById('howToPlayScreen'),
            settings: document.getElementById('settingsScreen'),
            game: document.getElementById('gameScreen'),
            daily: document.getElementById('dailyScreen'),
            dailyResults: document.getElementById('dailyResultsScreen'),
            gameOver: document.getElementById('gameOverScreen')
        };
        
        this.dom = {
            categoryGrid: document.getElementById('categoryGrid'),
            startGameBtn: document.getElementById('startGameBtn'),
            modeContinueBtn: document.getElementById('modeContinueBtn'),
            gameMeta: document.getElementById('gameMeta'),
            clueText: document.getElementById('clueText'),
            clueCategory: document.getElementById('clueCategory'),
            clueCard: document.getElementById('clueCard'),
            titleLetters: document.getElementById('titleLetters'),
            potValue: document.getElementById('potValue'),
            potMultiplier: document.getElementById('potMultiplier'),
            totalScore: document.getElementById('totalScore'),
            strikesDisplay: document.getElementById('strikesDisplay'),
            progressTrack: document.getElementById('progressTrack'),
            keyboard: document.getElementById('keyboard'),
            giveUpBtn: document.getElementById('giveUpBtn'),
            solveBtn: document.getElementById('solveBtn'),
            marqueePanel: document.getElementById('marqueePanel'),
            classicPanel: document.getElementById('classicPanel'),
            classicGuessInput: document.getElementById('classicGuessInput'),
            classicSubmitBtn: document.getElementById('classicSubmitBtn'),
            classicRevealBtn: document.getElementById('classicRevealBtn'),
            classicNextBtn: document.getElementById('classicNextBtn'),
            feedbackText: document.getElementById('feedbackText'),
            feedbackPanel: document.getElementById('feedbackPanel'),
            revealText: document.getElementById('revealText'),
            solveModal: document.getElementById('solveModal'),
            solveInput: document.getElementById('solveInput'),
            quitModal: document.getElementById('quitModal'),
            resultOverlay: document.getElementById('resultOverlay'),
            resultIcon: document.getElementById('resultIcon'),
            resultTitle: document.getElementById('resultTitle'),
            resultMovie: document.getElementById('resultMovie'),
            resultPoints: document.getElementById('resultPoints'),
            continueBtn: document.getElementById('continueBtn'),
            soundToggle: document.getElementById('soundToggle'),
            finalScore: document.getElementById('finalScore'),
            finalSubtitle: document.getElementById('finalSubtitle'),
            finalBreakdown: document.getElementById('finalBreakdown'),
            dailyQuote: document.getElementById('dailyQuote'),
            dailyQuoteSource: document.getElementById('dailyQuoteSource'),
            // Daily
            dailyDateDisplay: document.getElementById('dailyDateDisplay'),
            dailyProgressTrack: document.getElementById('dailyProgressTrack'),
            dailyClueCard: document.getElementById('dailyClueCard'),
            dailyClueText: document.getElementById('dailyClueText'),
            dailyInput: document.getElementById('dailyInput'),
            dailySkipBtn: document.getElementById('dailySkipBtn'),
            dailySubmitBtn: document.getElementById('dailySubmitBtn'),
            dailyScoreDisplay: document.getElementById('dailyScoreDisplay'),
            dailyScoreText: document.getElementById('dailyScoreText'),
            dailyBreakdown: document.getElementById('dailyBreakdown'),
            dailyResultsDate: document.getElementById('dailyResultsDate'),
            dailyNextPuzzle: document.getElementById('dailyNextPuzzle'),
            dailyResultLine: document.getElementById('dailyResultLine'),
            finalResultLine: document.getElementById('finalResultLine'),
            copyToast: document.getElementById('copyToast')
        };
    }

    bindEvents() {
        // Start screen
        document.getElementById('quickPlayBtn').onclick = () => this.showModeScreen();
        document.getElementById('dailyBtn').onclick = () => this.startDaily();
        document.getElementById('howToPlayBtn').onclick = () => this.showScreen('howToPlay');
        document.getElementById('howToBackBtn').onclick = () => this.showScreen('start');
        document.getElementById('settingsBtn').onclick = () => this.showScreen('settings');
        document.getElementById('settingsBackBtn').onclick = () => this.showScreen('start');
        
        // Settings
        this.dom.soundToggle.onclick = () => this.toggleSound();
        
        // Category
        document.getElementById('modeBackBtn').onclick = () => this.showScreen('start');
        this.dom.modeContinueBtn.onclick = () => this.showCategoryScreen();
        document.querySelectorAll('.mode-card').forEach((card) => {
            card.addEventListener('click', () => this.selectMode(card.dataset.mode));
        });

        document.getElementById('categoryBackBtn').onclick = () => this.showScreen('mode');
        this.dom.startGameBtn.onclick = () => this.startGame();
        
        // Game
        this.dom.giveUpBtn.onclick = () => this.giveUp();
        this.dom.solveBtn.onclick = () => this.openSolveModal();
        this.dom.classicSubmitBtn.onclick = () => this.submitClassicGuess();
        this.dom.classicRevealBtn.onclick = () => this.revealClassicAnswer();
        this.dom.classicNextBtn.onclick = () => this.nextQuestion();
        this.dom.classicGuessInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.submitClassicGuess();
            }
        });
        
        // Quit
        document.getElementById('quitBtn').onclick = () => this.dom.quitModal.classList.add('active');
        document.getElementById('cancelQuitBtn').onclick = () => this.dom.quitModal.classList.remove('active');
        document.getElementById('confirmQuitBtn').onclick = () => this.confirmQuit();
        
        // Solve modal
        document.getElementById('cancelSolveBtn').onclick = () => this.closeSolveModal();
        document.getElementById('submitSolveBtn').onclick = () => this.submitSolve();
        this.dom.solveInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.submitSolve();
            }
        });
        
        // Game over
        document.getElementById('playAgainBtn').onclick = () => this.playAgain();
        document.getElementById('copyResultBtn').onclick = () => this.shareScore();
        document.getElementById('menuBtn').onclick = () => this.showScreen('start');
        
        // Daily
        this.dom.dailySubmitBtn.onclick = () => this.submitDailyGuess();
        this.dom.dailySkipBtn.onclick = () => this.skipDailyQuestion();
        this.dom.dailyInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.submitDailyGuess();
            }
        });
        document.getElementById('dailyShareBtn').onclick = () => this.shareDailyScore();
        document.getElementById('dailyMenuBtn').onclick = () => this.showScreen('start');
    }

    // ============================================
    // SETTINGS
    // ============================================
    
    loadSettings() {
        const saved = localStorage.getItem('plotTwistedSettings');
        const parsed = saved ? JSON.parse(saved) : {};
        this.settings = { sound: !!parsed.sound };
        this.dom.soundToggle?.classList.toggle('active', this.settings.sound);
        localStorage.removeItem('roastIntensity');
    }

    saveSettings() {
        localStorage.setItem('plotTwistedSettings', JSON.stringify(this.settings));
    }

    toggleSound() {
        this.settings.sound = !this.settings.sound;
        this.dom.soundToggle?.classList.toggle('active', this.settings.sound);
        this.saveSettings();
    }

    // ============================================
    // SCREENS
    // ============================================

    showScreen(name) {
        Object.values(this.screens).forEach(s => s.classList.remove('active'));
        this.screens[name]?.classList.add('active');
        this.state.currentScreen = name;
    }

    confirmQuit() {
        this.dom.quitModal.classList.remove('active');
        this.showScreen('start');
    }

    // ============================================
    // DAILY QUOTE
    // ============================================

    loadDailyQuote() {
        const today = new Date().toDateString();
        const stored = localStorage.getItem('ptQuoteDate');
        let index = parseInt(localStorage.getItem('ptQuoteIndex'), 10);
        
        if (stored !== today || isNaN(index)) {
            index = Math.floor(Math.random() * DAILY_QUOTES.length);
            localStorage.setItem('ptQuoteDate', today);
            localStorage.setItem('ptQuoteIndex', String(index));
        }
        
        const quote = DAILY_QUOTES[index] || DAILY_QUOTES[0];
        this.dom.dailyQuote.textContent = `"${quote.quote}"`;
        this.dom.dailyQuoteSource.textContent = `— ${quote.source}`;
    }

    // ============================================
    // CATEGORY SCREEN
    // ============================================

    showCategoryScreen() {
        if (!this.state.currentMode) {
            this.showModeScreen();
            return;
        }
        this.renderCategories();
        this.state.selectedCategory = null;
        this.dom.startGameBtn.disabled = true;
        this.showScreen('category');
    }

    showModeScreen() {
        this.state.currentMode = null;
        this.dom.modeContinueBtn.disabled = true;
        document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));
        this.showScreen('mode');
    }

    selectMode(mode) {
        this.state.currentMode = mode;
        document.querySelectorAll('.mode-card').forEach(c => c.classList.toggle('selected', c.dataset.mode === mode));
        this.dom.modeContinueBtn.disabled = false;
    }

    renderCategories() {
        if (!this.clueBank) return;
        
        this.dom.categoryGrid.innerHTML = '';
        
        Object.keys(this.clueBank).forEach(name => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.dataset.category = name;
            
            const icon = CATEGORY_ICONS[name] || CATEGORY_ICONS["Family"];
            
            card.innerHTML = `
                <div class="category-icon">${icon}</div>
                <div class="category-name">${name}</div>
            `;
            
            card.onclick = () => this.selectCategory(name);
            this.dom.categoryGrid.appendChild(card);
        });
    }

    selectCategory(name) {
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
        document.querySelector(`.category-card[data-category="${name}"]`)?.classList.add('selected');
        this.state.selectedCategory = name;
        this.dom.startGameBtn.disabled = false;
    }

    // ============================================
    // QUICK PLAY GAME
    // ============================================

    startGame() {
        const category = this.state.selectedCategory;
        if (!this.state.currentMode) this.state.currentMode = 'classic';
        const allClues = this.clueBank[category];
        
        const seenTitles = this.state.seenClues[category] || [];
        const unseenClues = allClues.filter(c => !seenTitles.includes(c.title));
        const seenClues = allClues.filter(c => seenTitles.includes(c.title));
        
        let pool = this.shuffle(unseenClues);
        if (pool.length < this.config.questionsPerRound) {
            pool = [...pool, ...this.shuffle(seenClues)];
        }
        
        this.state.questions = pool.slice(0, this.config.questionsPerRound);
        
        if (!this.state.seenClues[category]) this.state.seenClues[category] = [];
        this.state.questions.forEach(q => {
            if (!this.state.seenClues[category].includes(q.title)) {
                this.state.seenClues[category].push(q.title);
            }
        });
        this.saveSeenClues();
        
        this.state.currentIndex = 0;
        this.state.totalScore = 0;
        this.state.strikes = 3;
        this.state.results = [];
        
        this.renderProgress();
        this.updateTotalScore();
        this.updateStrikes();
        
        this.showScreen('game');
        this.loadQuestion();
    }

    loadQuestion() {
        const q = this.state.questions[this.state.currentIndex];
        
        this.state.currentPot = this.config.maxPot;
        this.state.revealedIndices = [];
        this.state.guessedLetters = [];
        
        // Auto-reveal numbers since keyboard has no number keys
        const displayTitle = this.getDisplayTitle(q.title).toUpperCase();
        displayTitle.split('').forEach((char, i) => {
            if (/[0-9]/.test(char)) {
                this.state.revealedIndices.push(i);
            }
        });
        
        this.dom.clueText.textContent = q.clue;
        this.dom.clueCategory.textContent = `${this.state.selectedCategory} • ${this.state.currentMode === 'classic' ? 'Classic Mode' : 'Marquee Mode'}`;
        this.dom.gameMeta.textContent = `${this.state.currentMode === 'classic' ? 'Classic' : 'Marquee'} • ${this.state.selectedCategory}`;
        this.updatePot();
        this.updateProgress();
        this.renderModeLayout();

        if (this.state.currentMode === 'marquee') {
            this.renderTitle();
            this.renderKeyboard();
        } else {
            this.dom.classicGuessInput.value = '';
            this.dom.classicGuessInput.disabled = false;
            this.dom.classicSubmitBtn.disabled = false;
            this.dom.classicRevealBtn.disabled = false;
            this.dom.classicNextBtn.textContent = 'Next Question';
            this.dom.classicNextBtn.style.display = 'none';
            this.setFeedback('Type the title. Trust your movie memory. Dangerous, but brave.', 'helper');
            this.setRevealText('Answer reveal appears here if you need a humbling screening.');
        }
    }

    renderModeLayout() {
        const classic = this.state.currentMode === 'classic';
        this.dom.classicPanel.style.display = classic ? 'flex' : 'none';
        this.dom.marqueePanel.style.display = classic ? 'none' : 'flex';
    }

    setFeedback(text, tone='helper') {
        this.dom.feedbackText.textContent = text;
        this.dom.feedbackText.className = `feedback-text ${tone}`;
        this.dom.feedbackPanel.classList.remove('feedback-animate');
        void this.dom.feedbackPanel.offsetWidth;
        this.dom.feedbackPanel.classList.add('feedback-animate');
    }

    setRevealText(text) {
        this.dom.revealText.textContent = text;
    }

    renderTitle() {
        const q = this.state.questions[this.state.currentIndex];
        const displayTitle = this.getDisplayTitle(q.title).toUpperCase();
        
        this.dom.titleLetters.innerHTML = '';
        
        displayTitle.split('').forEach((char, i) => {
            const slot = document.createElement('span');
            slot.className = 'letter-slot';
            
            if (char === ' ') {
                slot.classList.add('space');
            } else if (/[A-Z0-9]/.test(char)) {
                if (this.state.revealedIndices.includes(i)) {
                    slot.textContent = char;
                    slot.classList.add('revealed');
                } else {
                    slot.textContent = '_';
                    slot.classList.add('hidden');
                }
            } else {
                slot.textContent = char;
            }
            
            this.dom.titleLetters.appendChild(slot);
        });
    }

    renderKeyboard() {
        const rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
        
        this.dom.keyboard.innerHTML = '';
        
        rows.forEach(row => {
            const rowEl = document.createElement('div');
            rowEl.className = 'keyboard-row';
            
            row.split('').forEach(letter => {
                const key = document.createElement('button');
                key.className = 'key';
                key.textContent = letter;
                key.dataset.letter = letter;
                
                if (this.state.guessedLetters.includes(letter)) {
                    key.disabled = true;
                    key.classList.add(this.isLetterInTitle(letter) ? 'correct' : 'incorrect');
                }
                
                key.onclick = () => this.guessLetter(letter);
                rowEl.appendChild(key);
            });
            
            this.dom.keyboard.appendChild(rowEl);
        });
    }

    isLetterInTitle(letter) {
        const q = this.state.questions[this.state.currentIndex];
        const displayTitle = this.getDisplayTitle(q.title).toUpperCase();
        return displayTitle.includes(letter);
    }

    guessLetter(letter) {
        if (this.state.currentMode !== 'marquee') return;
        if (this.state.guessedLetters.includes(letter)) return;
        
        this.state.guessedLetters.push(letter);
        
        const q = this.state.questions[this.state.currentIndex];
        const displayTitle = this.getDisplayTitle(q.title).toUpperCase();
        
        let found = false;
        displayTitle.split('').forEach((char, i) => {
            if (char === letter) {
                this.state.revealedIndices.push(i);
                found = true;
            }
        });
        
        // Vowels are free - no penalty for wrong vowel guesses
        const vowels = ['A', 'E', 'I', 'O', 'U'];
        const isVowel = vowels.includes(letter);
        
        if (!found && !isVowel) {
            this.state.currentPot = Math.max(this.config.minPot, this.state.currentPot - this.config.wrongLetterCost);
            this.updatePot(true);
        }
        
        this.renderTitle();
        this.renderKeyboard();
        this.updateMultiplier();
        
        // Check if all letters revealed
        const allLetterIndices = [];
        displayTitle.split('').forEach((char, i) => {
            if (/[A-Z0-9]/.test(char)) allLetterIndices.push(i);
        });
        
        if (allLetterIndices.every(i => this.state.revealedIndices.includes(i))) {
            this.autoSolve();
        }
    }

    updateMultiplier() {
        const q = this.state.questions[this.state.currentIndex];
        const displayTitle = this.getDisplayTitle(q.title).toUpperCase();
        
        let totalLetters = 0;
        displayTitle.split('').forEach(char => {
            if (/[A-Z0-9]/.test(char)) totalLetters++;
        });
        
        const hiddenCount = totalLetters - this.state.revealedIndices.length;
        const hiddenPercent = hiddenCount / totalLetters;
        
        let multiplier = '';
        if (hiddenPercent >= 0.8) multiplier = '1.5×';
        else if (hiddenPercent >= 0.5) multiplier = '1.25×';
        
        this.dom.potMultiplier.textContent = multiplier;
    }

    getMultiplier() {
        const q = this.state.questions[this.state.currentIndex];
        const displayTitle = this.getDisplayTitle(q.title).toUpperCase();
        
        let totalLetters = 0;
        displayTitle.split('').forEach(char => {
            if (/[A-Z0-9]/.test(char)) totalLetters++;
        });
        
        const hiddenCount = totalLetters - this.state.revealedIndices.length;
        const hiddenPercent = hiddenCount / totalLetters;
        
        if (hiddenPercent >= 0.8) return 1.5;
        if (hiddenPercent >= 0.5) return 1.25;
        return 1;
    }

    autoSolve() {
        const q = this.state.questions[this.state.currentIndex];
        const multiplier = this.getMultiplier();
        const points = Math.round(this.state.currentPot * multiplier);
        
        this.state.results.push({ title: q.title, points, correct: true });
        this.state.totalScore += points;
        this.updateTotalScore();
        this.showResult(true, q.title, points);
    }

    giveUp() {
        const q = this.state.questions[this.state.currentIndex];
        
        this.state.results.push({ title: q.title, points: 0, correct: false, gaveUp: true });
        
        const displayTitle = this.getDisplayTitle(q.title).toUpperCase();
        displayTitle.split('').forEach((char, i) => {
            if (/[A-Z0-9]/.test(char)) this.state.revealedIndices.push(i);
        });
        this.renderTitle();
        
        this.showResult(false, q.title, 0, false, true);
    }

    openSolveModal() {
        this.dom.solveModal.classList.add('active');
        this.dom.solveInput.value = '';
        setTimeout(() => this.dom.solveInput.focus(), 100);
    }

    closeSolveModal() {
        this.dom.solveModal.classList.remove('active');
    }

    submitSolve() {
        const guess = this.dom.solveInput.value.trim();
        if (!guess) return;

        const q = this.state.questions[this.state.currentIndex];
        this.closeSolveModal();

        const verdict = this.isAnswerMatch(guess, q.title, q);
        if (verdict.isMatch) {
            this.handleCorrect();
        } else {
            this.handleIncorrect(verdict.isNearMiss);
        }
    }

    submitClassicGuess() {
        if (this.state.currentMode !== 'classic') return;
        const guess = this.dom.classicGuessInput.value.trim();
        if (!guess) return;

        const q = this.state.questions[this.state.currentIndex];
        const verdict = this.isAnswerMatch(guess, q.title, q);
        const isCorrect = verdict.isMatch;

        this.dom.classicGuessInput.disabled = true;
        this.dom.classicSubmitBtn.disabled = true;
        this.dom.classicRevealBtn.disabled = true;

        if (isCorrect) {
            const points = this.config.maxPot;
            this.state.results.push({ title: q.title, points, correct: true });
            this.state.totalScore += points;
            this.updateTotalScore();
            this.setFeedback(this.getModeRoast('correctAnswer'), 'correct');
            this.setRevealText(q.title.toUpperCase());
            this.dom.classicNextBtn.style.display = 'inline-flex';
        } else {
            this.state.strikes--;
            this.updateStrikes();
            this.state.results.push({ title: q.title, points: 0, correct: false });
            const roastType = verdict.isNearMiss ? 'nearMiss' : 'wrongAnswer';
            this.setFeedback(this.getModeRoast(roastType), 'incorrect');
            this.setRevealText(this.getModeRoast('revealAnswer', { TITLE: q.title.toUpperCase() }));
            this.dom.classicNextBtn.style.display = 'inline-flex';
            if (this.state.strikes <= 0) this.dom.classicNextBtn.textContent = 'Finish Game';
        }
    }

    revealClassicAnswer() {
        if (this.state.currentMode !== 'classic') return;
        const q = this.state.questions[this.state.currentIndex];
        this.state.results.push({ title: q.title, points: 0, correct: false, gaveUp: true });
        this.dom.classicGuessInput.disabled = true;
        this.dom.classicSubmitBtn.disabled = true;
        this.dom.classicRevealBtn.disabled = true;
        this.setFeedback(this.getModeRoast('revealAnswer', { TITLE: q.title.toUpperCase() }), 'incorrect');
        this.setRevealText(q.title.toUpperCase());
        this.dom.classicNextBtn.style.display = 'inline-flex';
    }

    handleCorrect() {
        const q = this.state.questions[this.state.currentIndex];
        const multiplier = this.getMultiplier();
        const points = Math.round(this.state.currentPot * multiplier);
        
        this.state.results.push({ title: q.title, points, correct: true });
        this.state.totalScore += points;
        this.updateTotalScore();
        
        const displayTitle = this.getDisplayTitle(q.title).toUpperCase();
        displayTitle.split('').forEach((char, i) => {
            if (/[A-Z0-9]/.test(char)) this.state.revealedIndices.push(i);
        });
        this.renderTitle();
        
        this.showResult(true, q.title, points);
        
        try {
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 80,
                    spread: 60,
                    origin: { y: 0.6 },
                    colors: ['#d4a853', '#f0d078', '#ffffff'],
                    disableForReducedMotion: true
                });
            }
        } catch (e) {}
    }

    handleIncorrect(isNearMiss = false) {
        const q = this.state.questions[this.state.currentIndex];
        
        this.state.strikes--;
        this.updateStrikes();
        
        this.dom.clueCard.classList.add('shake');
        setTimeout(() => this.dom.clueCard.classList.remove('shake'), 400);
        
        if (this.state.strikes <= 0) {
            this.state.results.push({ title: q.title, points: 0, correct: false });
            this.showResult(false, q.title, 0, true);
        } else {
            this.showResult(false, q.title, 0, false, false, isNearMiss);
        }
    }

    showResult(isCorrect, title, points, isGameOver = false, gaveUp = false, isNearMiss = false) {
        const resultCard = document.querySelector('.result-card');
        resultCard.classList.remove('celebrate');

        const roastType = isCorrect
            ? 'correctAnswer'
            : (gaveUp ? 'giveUp' : (isGameOver ? 'revealAnswer' : (isNearMiss ? 'nearMiss' : 'wrongAnswer')));
        const commentary = this.getModeRoast(roastType, { TITLE: title });

        this.dom.resultIcon.textContent = isCorrect ? '🎬' : (gaveUp ? '🏳️' : '❌');
        this.dom.resultTitle.textContent = commentary;
        this.dom.resultTitle.className = `result-title ${isCorrect ? 'correct' : 'incorrect'}`;
        
        if (isCorrect || gaveUp || isGameOver) {
            this.dom.resultMovie.textContent = title.toUpperCase();
            this.dom.resultMovie.style.display = 'block';
        } else {
            this.dom.resultMovie.style.display = 'none';
        }
        
        if (isCorrect) {
            resultCard.classList.add('celebrate');
            this.dom.resultPoints.textContent = `+${points} points`;
            this.dom.resultPoints.className = 'result-points';
        } else if (isGameOver) {
            this.dom.resultPoints.textContent = 'Out of strikes!';
            this.dom.resultPoints.className = 'result-points zero';
        } else if (gaveUp) {
            this.dom.resultPoints.textContent = '0 points';
            this.dom.resultPoints.className = 'result-points zero';
        } else {
            this.dom.resultPoints.textContent = `${this.state.strikes} strike${this.state.strikes !== 1 ? 's' : ''} remaining`;
            this.dom.resultPoints.className = 'result-points zero';
        }
        
        if (!isCorrect && !isGameOver && !gaveUp) {
            this.dom.continueBtn.textContent = 'Try Again';
            this.dom.continueBtn.onclick = () => {
                this.dom.resultOverlay.classList.remove('active');
            };
        } else {
            this.dom.continueBtn.textContent = 'Continue';
            this.dom.continueBtn.onclick = () => {
                this.dom.resultOverlay.classList.remove('active');
                if (isGameOver) {
                    this.endGame();
                } else {
                    this.nextQuestion();
                }
            };
        }
        
        this.dom.resultOverlay.classList.add('active');
    }

    getRoast(type, replacements = {}) {
        const roastBank = window.PLOT_TWISTED_ROASTS || {};
        const fallback = roastBank.fallback || 'The theater has no notes.';
        const bank = roastBank.responses || {};
        const list = bank[type] || bank.fallback;

        if (!Array.isArray(list) || !list.length) return fallback;

        let selectedIndex = Math.floor(Math.random() * list.length);
        const lastIndex = this.lastRoastIndexByType[type];
        if (list.length > 1 && selectedIndex === lastIndex) {
            selectedIndex = (selectedIndex + 1 + Math.floor(Math.random() * (list.length - 1))) % list.length;
        }
        this.lastRoastIndexByType[type] = selectedIndex;

        const template = list[selectedIndex] || fallback;
        return template.replace(/\[([A-Z_]+)\]/g, (_, token) => {
            const value = replacements[token];
            return value === undefined || value === null ? '' : String(value);
        });
    }

    nextQuestion() {
        if (this.state.currentMode === 'classic' && this.state.strikes <= 0) {
            this.endGame();
            return;
        }
        this.state.currentIndex++;
        
        if (this.state.currentIndex >= this.state.questions.length) {
            this.endGame();
        } else {
            this.loadQuestion();
        }
    }

    endGame() {
        const solved = this.state.results.filter(r => r.correct).length;
        const total = this.state.results.length;
        
        this.dom.finalScore.textContent = this.state.totalScore;
        this.dom.finalSubtitle.textContent = `${solved} of ${total} movies solved`;
        this.dom.finalResultLine.textContent = this.getResultLine(solved, total);
        
        this.dom.finalBreakdown.innerHTML = '';
        this.state.results.forEach(r => {
            const row = document.createElement('div');
            row.className = 'breakdown-row';
            row.innerHTML = `
                <span class="breakdown-title">${r.title}</span>
                <span class="breakdown-points ${r.correct ? 'earned' : 'missed'}">
                    ${r.correct ? '+' + r.points : '—'}
                </span>
            `;
            this.dom.finalBreakdown.appendChild(row);
        });
        
        this.showScreen('gameOver');
    }
    
    shareScore() {
        const solved = this.state.results.filter(r => r.correct).length;
        const total = this.state.results.length;
        const category = this.state.selectedCategory;
        if (!this.state.currentMode) this.state.currentMode = 'classic';
        const modeLabel = this.state.currentMode === 'classic' ? 'Classic Mode' : 'Marquee Mode';

        const text = `Plot Twisted\nI played ${modeLabel} in ${category} and scored ${this.state.totalScore} (${solved}/${total} correct).\n${this.getResultLine(solved, total)}\nPlay: ${window.location.origin || 'Open Plot Twisted and play.'}`;
        this.copyToClipboard(text);
    }
    
    copyToClipboard(text) {
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.showCopyToast(this.getRoast('copyResultSuccess'));
            }).catch(() => this.copyWithFallback(text));
            return;
        }
        this.copyWithFallback(text);
    }

    copyWithFallback(text) {
        const temp = document.createElement('textarea');
        temp.value = text;
        temp.setAttribute('readonly', '');
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        try {
            document.execCommand('copy');
            this.showCopyToast(this.getRoast('copyResultSuccess'));
        } catch (e) {
            this.showCopyToast('Clipboard blocked. Copy manually from the prompt.');
            prompt('Copy your result:', text);
        }
        document.body.removeChild(temp);
    }

    showCopyToast(message) {
        this.dom.copyToast.textContent = message || this.getRoast('copyResultSuccess');
        this.dom.copyToast.classList.add('show');
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => this.dom.copyToast.classList.remove('show'), 2200);
    }

    playAgain() {
        if (this.state.selectedCategory) {
            this.startGame();
        } else {
            this.showCategoryScreen();
        }
    }

    // ============================================
    // DAILY CHALLENGE
    // ============================================

    getTodayKey() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    }

    checkDailyStatus() {
        const key = `plotTwistedDaily_${this.getTodayKey()}`;
        const saved = localStorage.getItem(key);
        
        if (saved) {
            this.state.dailyCompleted = true;
            this.state.dailyResults = JSON.parse(saved);
        } else {
            this.state.dailyCompleted = false;
            this.state.dailyResults = [];
        }
    }

    startDaily() {
        this.checkDailyStatus();
        
        if (this.state.dailyCompleted) {
            this.showDailyResults();
            return;
        }
        
        // Seed random with today's date
        const seed = this.getTodayKey().replace(/-/g, '');
        const rng = this.seededRandom(parseInt(seed, 10));
        
        // Pick one from each category
        const categories = Object.keys(this.clueBank);
        const shuffledCats = this.shuffleWithRng(categories, rng);
        
        this.state.dailyQuestions = [];
        for (let i = 0; i < 5; i++) {
            const cat = shuffledCats[i % shuffledCats.length];
            const clues = this.clueBank[cat];
            const clueIndex = Math.floor(rng() * clues.length);
            this.state.dailyQuestions.push({ ...clues[clueIndex], category: cat });
        }
        
        this.state.dailyIndex = 0;
        this.state.dailyResults = [];
        
        const today = new Date();
        this.dom.dailyDateDisplay.textContent = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        
        this.renderDailyProgress();
        this.loadDailyQuestion();
        this.showScreen('daily');
    }

    seededRandom(seed) {
        return function() {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };
    }

    shuffleWithRng(arr, rng) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    renderDailyProgress() {
        this.dom.dailyProgressTrack.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const pip = document.createElement('div');
            pip.className = 'progress-pip';
            if (i < this.state.dailyIndex) pip.classList.add('complete');
            if (i === this.state.dailyIndex) pip.classList.add('current');
            this.dom.dailyProgressTrack.appendChild(pip);
        }
    }

    loadDailyQuestion() {
        const q = this.state.dailyQuestions[this.state.dailyIndex];
        this.dom.dailyClueCard.dataset.question = `MOVIE ${this.state.dailyIndex + 1} OF 5`;
        this.dom.dailyClueText.textContent = q.clue;
        this.dom.dailyInput.value = '';
        this.dom.dailyInput.disabled = false;
        this.dom.dailyInput.focus();
    }

    submitDailyGuess() {
        const guess = this.dom.dailyInput.value.trim();
        if (!guess) return;
        
        const q = this.state.dailyQuestions[this.state.dailyIndex];
        const verdict = this.isAnswerMatch(guess, q.title, q);
        const correct = verdict.isMatch;
        
        this.state.dailyResults.push({
            title: q.title,
            guess: guess,
            correct: correct,
            points: correct ? 100 : 0
        });
        
        this.dom.dailyInput.disabled = true;
        this.nextDailyQuestion();
    }

    skipDailyQuestion() {
        const q = this.state.dailyQuestions[this.state.dailyIndex];
        
        this.state.dailyResults.push({
            title: q.title,
            guess: '',
            correct: false,
            skipped: true,
            points: 0
        });

        this.showCopyToast(this.getRoast('skip'));
        
        this.nextDailyQuestion();
    }

    nextDailyQuestion() {
        this.state.dailyIndex++;
        this.renderDailyProgress();
        
        if (this.state.dailyIndex >= 5) {
            this.finishDaily();
        } else {
            this.loadDailyQuestion();
        }
    }

    finishDaily() {
        const key = `plotTwistedDaily_${this.getTodayKey()}`;
        localStorage.setItem(key, JSON.stringify(this.state.dailyResults));
        this.state.dailyCompleted = true;
        this.showDailyResults();
    }

    showDailyResults() {
        const results = this.state.dailyResults;
        const correct = results.filter(r => r.correct).length;
        const total = results.reduce((sum, r) => sum + r.points, 0);
        
        const today = new Date();
        this.dom.dailyResultsDate.textContent = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        
        // Stars
        this.dom.dailyScoreDisplay.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.className = `daily-star ${i < correct ? 'earned' : 'empty'}`;
            star.textContent = '★';
            this.dom.dailyScoreDisplay.appendChild(star);
        }
        
        this.dom.dailyScoreText.textContent = `${correct}/5 Correct • ${total} pts`;
        this.dom.dailyResultLine.textContent = this.getDailyResultLine(correct);
        
        // Breakdown
        this.dom.dailyBreakdown.innerHTML = '';
        results.forEach(r => {
            const row = document.createElement('div');
            row.className = 'daily-breakdown-row';
            row.innerHTML = `
                <span>${r.title}</span>
                <span class="daily-breakdown-result">${r.correct ? '✅' : (r.skipped ? '⏭️' : '❌')}</span>
            `;
            this.dom.dailyBreakdown.appendChild(row);
        });
        
        // Countdown
        this.updateDailyCountdown();
        
        this.showScreen('dailyResults');
    }

    updateDailyCountdown() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const diff = tomorrow - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        this.dom.dailyNextPuzzle.textContent = `Next puzzle in ${hours}h ${minutes}m`;
    }

    shareDailyScore() {
        const results = this.state.dailyResults;
        const correct = results.filter(r => r.correct).length;
        const total = results.reduce((sum, r) => sum + r.points, 0);

        const text = `Today's Plot Twisted Daily\nResult: ${correct}/5 • ${total} pts\n${this.getDailyResultLine(correct)}\nPlay: ${window.location.origin || 'Open Plot Twisted and play.'}`;
        this.copyToClipboard(text);
    }

    getModeRoast(type, replacements = {}) {
        return this.getRoast(type, replacements);
    }

    getResultLine(solved, total) {
        if (solved === total) return this.getRoast('perfectScoreResult');
        if (solved >= Math.ceil(total * 0.75)) return this.getRoast('highScoreResult');
        if (solved >= Math.ceil(total * 0.4)) return this.getRoast('midScoreResult');
        return this.getRoast('lowScoreResult');
    }

    getDailyResultLine(correct) {
        if (correct >= 3) return this.getRoast('dailyChallengeSuccess');
        return this.getRoast('dailyChallengeMiss');
    }

    // ============================================
    // UTILITIES
    // ============================================

    updatePot(animate = false) {
        if (animate) {
            this.dom.potValue.classList.add('dropping');
            setTimeout(() => this.dom.potValue.classList.remove('dropping'), 300);
        }
        this.dom.potValue.textContent = this.state.currentPot;
        this.updateMultiplier();
    }

    updateTotalScore() {
        this.dom.totalScore.textContent = this.state.totalScore;
    }

    updateStrikes() {
        const pips = this.dom.strikesDisplay.querySelectorAll('.strike-pip');
        pips.forEach((pip, i) => {
            pip.classList.toggle('used', i >= this.state.strikes);
        });
    }

    renderProgress() {
        this.dom.progressTrack.innerHTML = '';
        for (let i = 0; i < this.config.questionsPerRound; i++) {
            const pip = document.createElement('div');
            pip.className = 'progress-pip';
            this.dom.progressTrack.appendChild(pip);
        }
    }

    updateProgress() {
        const pips = this.dom.progressTrack.querySelectorAll('.progress-pip');
        pips.forEach((pip, i) => {
            pip.classList.remove('current', 'complete');
            if (i < this.state.currentIndex) pip.classList.add('complete');
            else if (i === this.state.currentIndex) pip.classList.add('current');
        });
    }

    levenshtein(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) matrix[i] = [i];
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    normalizeAnswer(str = '') {
        return String(str)
            .toLowerCase()
            .replace(/[’‘`]/g, "'")
            .replace(/&/g, ' and ')
            .replace(/\([^)]*\b(19|20)\d{2}\b[^)]*\)/g, ' ')
            .replace(/[:\-–—]/g, ' ')
            .replace(/[^a-z0-9'\s]/g, ' ')
            .replace(/\b(the|a|an)\s+/g, '')
            .replace(/\band\b/g, 'and')
            .replace(/\s+/g, ' ')
            .trim();
    }

    buildFranchiseAliases(normalizedTitle) {
        const aliases = new Set();
        const franchiseRoots = [
            'ice age',
            'puss in boots',
            'cloudy with chance of meatballs',
            'cloudy with a chance of meatballs',
            'spongebob movie',
            'spongebob',
            'star wars',
            'jurassic world',
            'matrix',
            'avatar',
            'lord of rings',
            'lord of the rings',
            'harry potter'
        ];

        franchiseRoots.forEach((root) => {
            if (normalizedTitle.includes(root)) aliases.add(root);
        });

        return aliases;
    }

    getAnswerAliases(title, clueObject = {}) {
        const aliases = new Set();
        const add = (value) => {
            const normalized = this.normalizeAnswer(value);
            if (normalized) aliases.add(normalized);
        };

        add(title);
        if (Array.isArray(clueObject.aliases)) clueObject.aliases.forEach(add);

        const rawTitle = String(title || '').replace(/\([^)]*\)/g, '').trim();
        const subtitleParts = rawTitle.split(/\s*[:\-–—]\s*/).filter(Boolean);
        if (subtitleParts.length > 1) {
            add(subtitleParts[0]);
            add(subtitleParts.slice(1).join(' '));
        }

        add(rawTitle.replace(/\s+\d+$/, '').trim());

        const normalizedTitle = this.normalizeAnswer(rawTitle);
        this.buildFranchiseAliases(normalizedTitle).forEach((a) => aliases.add(a));

        if (normalizedTitle.includes('spongebob movie')) add('spongebob');
        if (normalizedTitle.startsWith('star wars ')) add(normalizedTitle.replace(/^star wars\s+/, ''));
        if (normalizedTitle.startsWith('matrix ')) add('matrix');

        return [...aliases];
    }

    getDisplayTitle(title) {
        return title.replace(/\([^)]*\)/g, '').trim();
    }

    getSimilarity(a, b) {
        if (!a || !b) return 0;
        const distance = this.levenshtein(a, b);
        return 1 - distance / Math.max(a.length, b.length);
    }

    isAnswerMatch(userGuess, correctTitle, clueObject = {}) {
        const guess = this.normalizeAnswer(userGuess);
        if (!guess) return { isMatch: false, isNearMiss: false };

        const aliases = this.getAnswerAliases(correctTitle, clueObject);
        const aliasSet = new Set(aliases);
        if (aliasSet.has(guess)) return { isMatch: true, isNearMiss: false };

        const shortestAliasLength = aliases.reduce((min, item) => Math.min(min, item.length), Infinity);
        if (guess.length < 4 || shortestAliasLength < 4) return { isMatch: false, isNearMiss: false };

        const hasMeaningfulSubstring = aliases.some((alias) =>
            (guess.length >= 4 && alias.includes(guess)) ||
            (alias.length >= 4 && guess.includes(alias))
        );
        if (hasMeaningfulSubstring) return { isMatch: true, isNearMiss: false };

        const tokenSet = new Set(guess.split(' '));
        const highTokenOverlap = aliases.some((alias) => {
            const aliasTokens = alias.split(' ');
            const overlap = aliasTokens.filter((t) => tokenSet.has(t)).length;
            return overlap >= 2 && overlap / Math.max(aliasTokens.length, tokenSet.size) >= 0.65;
        });
        if (highTokenOverlap) return { isMatch: true, isNearMiss: false };

        const highestSimilarity = aliases.reduce((best, alias) => Math.max(best, this.getSimilarity(guess, alias)), 0);
        if (highestSimilarity >= 0.82) return { isMatch: true, isNearMiss: false };

        return { isMatch: false, isNearMiss: highestSimilarity >= 0.68 };
    }

    runAnswerMatcherSelfTest() {
        const expectedCorrect = [
            ['Ice Age', 'Ice Age: The Meltdown'],
            ['ice age', 'Ice Age: Continental Drift'],
            ['Puss in Boots', 'Puss in Boots: The Last Wish'],
            ['Star Wars', 'Star Wars: The Empire Strikes Back'],
            ['Empire Strikes Back', 'Star Wars: The Empire Strikes Back'],
            ['Jurassic World', 'Jurassic World: Fallen Kingdom'],
            ['Matrix', 'The Matrix Reloaded'],
            ['Spongebob', 'The SpongeBob Movie: Sponge Out of Water'],
            ['Lion King', 'The Lion King'],
            ['Cloudy with a Chance of Meatballs', 'Cloudy with a Chance of Meatballs 2']
        ];
        const expectedStrict = [
            ['up', 'Up', true],
            ['it', 'The Matrix', false],
            ['cars', 'Cars', true],
            ['cars', 'Scarface', false]
        ];

        const failed = [];
        expectedCorrect.forEach(([guess, answer]) => {
            if (!this.isAnswerMatch(guess, answer).isMatch) failed.push(`Expected match: "${guess}" vs "${answer}"`);
        });
        expectedStrict.forEach(([guess, answer, expected]) => {
            const actual = this.isAnswerMatch(guess, answer).isMatch;
            if (actual !== expected) failed.push(`Expected ${expected} for "${guess}" vs "${answer}", got ${actual}`);
        });

        if (failed.length) {
            console.warn('Matcher self-test found issues:', failed);
        } else {
            console.log('✅ Answer matcher self-test passed.');
        }
    }

    loadSeenClues() {
        const saved = localStorage.getItem('plotTwistedSeen');
        this.state.seenClues = saved ? JSON.parse(saved) : {};
    }

    saveSeenClues() {
        localStorage.setItem('plotTwistedSeen', JSON.stringify(this.state.seenClues));
    }

    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const game = new PlotTwisted();
    game.init();
});
