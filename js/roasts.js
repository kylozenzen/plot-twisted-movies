(function initPlotTwistedRoasts(global) {
    const bank = {
        defaultIntensity: 'clean',
        fallback: 'The theater has no notes right now.',
        byMode: {
            clean: {
                wrongAnswer: [
                    "Not it, but the confidence had good lighting.",
                    "A noble guess. The theater gently disagrees.",
                    "Close enough to be emotionally confusing, still incorrect.",
                    "That answer took a wrong turn at the concession stand.",
                    "Good energy, wrong title card.",
                    "The vibes were blockbuster, the result was blooper reel.",
                    "Wrong pick, but honestly a fun trailer.",
                    "You aimed for cinema and landed in bonus features."
                ],
                closeAnswer: [
                    "You're circling it like a sequel teaser.",
                    "Very close. The credits almost rolled.",
                    "Near miss. Your brain is warming up.",
                    "Cinematically adjacent. Try one more twist."
                ],
                correctAnswer: [
                    "Roll credits. You nailed it.",
                    "Correct. Your streaming habits were not wasted.",
                    "That’s the one. IMDb who?",
                    "Cinema brain activated. Great pull.",
                    "Textbook solve. If there were a textbook for this.",
                    "You remembered that like it was your comfort movie.",
                    "Award-worthy recall. Popcorn salute.",
                    "Perfect read. The projector approves."
                ],
                revealAnswer: [
                    "The answer was: [TITLE]. A humbling screening, honestly.",
                    "Plot twist: it was [TITLE] the whole time.",
                    "The theater reveals: [TITLE]. Please process privately.",
                    "Director’s cut truth: [TITLE]."
                ],
                skippedQuestion: [
                    "Skipping is legal. Cowardly, but legal.",
                    "A tactical retreat from cinema.",
                    "You left the theater before the third act.",
                    "Skipped. The plot survives to haunt you later."
                ],
                startGame: [
                    "Lights down. Snacks up. Let’s play.",
                    "Projector on. Memory test begins now.",
                    "Welcome to cinematic chaos night.",
                    "Opening scene loaded. Good luck."
                ],
                modeSelected: [
                    "Mode locked. Cue dramatic score.",
                    "Excellent choice. The genre gods are watching.",
                    "Mode selected. Let the guessing begin.",
                    "You picked a lane. Floor it."
                ],
                categorySelected: [
                    "Category selected. Taste detected.",
                    "Great pick. This aisle smells like popcorn.",
                    "Genre locked. No take-backs in the trailer.",
                    "Category loaded. Bring your A-game."
                ],
                lowScoreResult: [
                    "Your movie memory has entered witness protection.",
                    "A brave performance. Not an accurate one.",
                    "The theater thanks you for your donation.",
                    "Tough night, but the comeback arc writes itself."
                ],
                midScoreResult: [
                    "Respectable. Chaotic, but respectable.",
                    "You knew enough to be dangerous.",
                    "Your brain brought snacks and most of the answers.",
                    "Solid showing with premium drama."
                ],
                highScoreResult: [
                    "Certified movie gremlin.",
                    "Your streaming history has finally paid rent.",
                    "That was dangerously competent.",
                    "High score energy. Critics are rattled."
                ],
                perfectScoreResult: [
                    "Perfect score. Roll credits and act humble.",
                    "You are now legally allowed to say ‘cinema’ too much.",
                    "Flawless. Annoying, but flawless.",
                    "No notes. Only applause and sequel talks."
                ],
                dailyChallengeSuccess: [
                    "Daily cleared. Your watchlist salutes you.",
                    "You beat today’s reel. Nicely done.",
                    "Daily challenge conquered with style.",
                    "Today’s cinema trial? Passed."
                ],
                dailyChallengeMiss: [
                    "Daily missed, but the sequel is tomorrow.",
                    "Today got you. Tomorrow gets revenge.",
                    "Rough daily, still iconic effort.",
                    "Missed this one. Keep the popcorn warm."
                ]
            },
            spicy: {
                wrongAnswer: [
                    "Not it, but emotionally adjacent.",
                    "Bold guess. Incorrect, but bold.",
                    "The theater rejects this answer.",
                    "You missed by a whole cinematic universe.",
                    "That guess had trailer hype and no third act.",
                    "Big confidence, tiny accuracy.",
                    "Your answer belongs in a bargain-bin double feature.",
                    "Swing and miss, but excellent dramatics."
                ],
                closeAnswer: [
                    "You’re one rewrite away from correct.",
                    "So close the subtitles almost spoiled it.",
                    "Near miss. I felt the tension.",
                    "Right neighborhood, wrong house, great yard."
                ],
                correctAnswer: [
                    "Okay, film buff. Touch grass after this.",
                    "That was suspiciously fast. Are you the director?",
                    "You got that right like it emotionally damaged you.",
                    "Your recall is terrifying. Join my trivia team.",
                    "You saw one clue and said, ‘bet.’",
                    "That solve had final-boss confidence.",
                    "Correct and slightly intimidating.",
                    "You’re collecting right answers like post-credit scenes."
                ],
                revealAnswer: [
                    "It was [TITLE]. The room would like a moment.",
                    "Reveal time: [TITLE]. Please pretend you knew that.",
                    "Actual answer: [TITLE]. A very public oops.",
                    "Surprise! [TITLE] was the move."
                ],
                skippedQuestion: [
                    "Skip accepted. Character arc postponed.",
                    "You passed like it was an optional side quest.",
                    "Skipped. The plot remains undefeated.",
                    "Strategic dodge. Jury still judging."
                ],
                startGame: [
                    "Welcome back, chaos gremlin.",
                    "Game on. Ego on silent mode, hopefully.",
                    "Cue the trailer voice: ‘In a world… you guess movies.’",
                    "Let’s see if your confidence has receipts."
                ],
                modeSelected: [
                    "Mode picked. No refunds for emotional damage.",
                    "You chose this chaos. Respect.",
                    "Mode locked like a prestige TV finale.",
                    "Excellent. Things are about to get loud."
                ],
                categorySelected: [
                    "Category selected. Taste level: debatable but fun.",
                    "Genre locked. Bring your overconfidence.",
                    "Great choice. Absolute spoiler bait.",
                    "Category set. Let’s make bad decisions quickly."
                ],
                lowScoreResult: [
                    "Score says ‘learning experience.’",
                    "That was rough, but cinematically rough.",
                    "The scoreboard filed a complaint.",
                    "Low score, high drama."
                ],
                midScoreResult: [
                    "Middle of the pack, menace in the heart.",
                    "Decent score. Questionable process.",
                    "You survived with style points.",
                    "Mid score, maximum personality."
                ],
                highScoreResult: [
                    "High score unlocked. Please be normal about it.",
                    "Dangerously competent tonight.",
                    "You cooked. The kitchen is cinematic.",
                    "That score has villain origin energy."
                ],
                perfectScoreResult: [
                    "Perfect run. Please lower your power level.",
                    "Flawless. Incredibly obnoxious. Congrats.",
                    "You just speedran film memory.",
                    "Perfect score. Critics are in shambles."
                ],
                dailyChallengeSuccess: [
                    "Daily challenge: handled.",
                    "You beat the daily like it owed you money.",
                    "Daily clear with premium swagger.",
                    "Today’s quiz got outplayed."
                ],
                dailyChallengeMiss: [
                    "Daily humbled you. It happens to legends.",
                    "Missed today. Redemption arc starts at midnight.",
                    "Rough daily, still watchable performance.",
                    "Today won. Tomorrow’s getting reviewed harshly."
                ]
            },
            nsfw: {
                wrongAnswer: [
                    "That answer tripped over the popcorn and blamed the subtitles.",
                    "Incorrect. Somewhere, a DVD menu just sighed.",
                    "That guess had trailer energy and no third act.",
                    "You launched that guess straight into the sun.",
                    "Nope. That answer got jumped in the parking lot.",
                    "You guessed like the Wi‑Fi cut out mid-thought.",
                    "That was chaos with a title attached.",
                    "Wrong in 4K Ultra HD."
                ],
                closeAnswer: [
                    "You were this close to cooking.",
                    "Near miss. Painfully cinematic.",
                    "You brushed the answer and still whiffed.",
                    "So close I started celebrating early."
                ],
                correctAnswer: [
                    "Well damn, you didn’t even let the clue breathe.",
                    "You smoked that answer like it owed you money.",
                    "That was so fast it felt illegal.",
                    "You didn’t guess. You absolutely knew.",
                    "That solve was feral-level correct.",
                    "You cooked that. No notes.",
                    "Correct and disrespectful to the rest of us.",
                    "You grabbed that answer by the throat."
                ],
                revealAnswer: [
                    "It was [TITLE]. Let that sink in.",
                    "Final answer: [TITLE]. The plot wins today.",
                    "[TITLE]. Yeah, that happened in public.",
                    "Answer reveal: [TITLE]. Cue dramatic collapse."
                ],
                skippedQuestion: [
                    "Skip pressed. Fight postponed.",
                    "You bailed before the plot twist, iconic.",
                    "Skipped like a horror side character.",
                    "You passed. The clue laughed."
                ],
                startGame: [
                    "Welcome to the cinematic battleground.",
                    "Game start. Keep your ego strapped in.",
                    "Lights down, gloves up.",
                    "Let’s make this messy and memorable."
                ],
                modeSelected: [
                    "Mode selected. We ride at dawn.",
                    "You picked this madness on purpose.",
                    "Locked in. No safety rails.",
                    "Mode set. Absolute theater goblin hours."
                ],
                categorySelected: [
                    "Category chosen. Fate sealed.",
                    "Genre locked. May chaos guide you.",
                    "Category selected. Time to stunt or crumble.",
                    "You chose violence and cinema."
                ],
                lowScoreResult: [
                    "Score looks like a deleted scene.",
                    "That run was a beautiful train wreck.",
                    "Low score, legendary meltdown.",
                    "You got humbled in surround sound."
                ],
                midScoreResult: [
                    "Mid score. Wild process, decent outcome.",
                    "You scraped by with cinematic flair.",
                    "Half menace, half miracle.",
                    "Not bad. Not sane."
                ],
                highScoreResult: [
                    "High score. You absolute menace.",
                    "You balled out in the trivia arena.",
                    "That score is rude in the best way.",
                    "Certified chaos professional."
                ],
                perfectScoreResult: [
                    "Perfect score. Disgustingly impressive.",
                    "Flawless run. Please touch grass immediately.",
                    "You broke the game and smiled.",
                    "Perfect. Annoying. Legendary."
                ],
                dailyChallengeSuccess: [
                    "Daily challenge got cooked.",
                    "Today’s puzzle just got body-slammed.",
                    "Daily clear. Absolute cinema.",
                    "You aced the daily like a gremlin savant."
                ],
                dailyChallengeMiss: [
                    "Daily smoked you today.",
                    "Missed it. Pride on life support.",
                    "Today was cursed. Tomorrow we throw punches.",
                    "Daily L secured; comeback trailer drops soon."
                ]
            }
        }
    };

    global.PLOT_TWISTED_ROASTS = bank;
})(window);
