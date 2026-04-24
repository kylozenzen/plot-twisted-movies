(function initPlotTwistedRoasts(global) {
    const sharedResult = {
        lowScoreResult: ["Your movie memory has entered witness protection."],
        midScoreResult: ["Respectable. Chaotic, but respectable."],
        highScoreResult: ["Your streaming history has finally paid rent."],
        perfectScoreResult: ["Perfect score. Roll credits and act humble."]
    };

    const bank = {
        defaultIntensity: 'clean',
        fallback: 'The theater has no notes right now.',
        byMode: {
            clean: {
                wrongAnswer: ["A noble guess. The theater gently disagrees.", "Good energy, wrong title card."],
                correctAnswer: ["Cinema brain activated. Great pull.", "Perfect read. The projector approves."],
                revealAnswer: ["The answer was: [TITLE]. A humbling screening, honestly.", "Plot twist: it was [TITLE] the whole time."],
                classic_wrongAnswer: ["Typed with confidence. Accuracy declined to attend.", "Not it, but emotionally adjacent.", "The theater rejects this answer."],
                classic_correctAnswer: ["Roll credits. You nailed it.", "Correct. Your streaming habits were not wasted.", "That’s the one. IMDb who?"],
                classic_revealAnswer: ["The answer was: [TITLE]. A humbling screening, honestly.", "Plot twist: it was [TITLE] the whole time.", "The theater reveals: [TITLE]. Please process privately."],
                marquee_wrongAnswer: ["That letter brought no plot development.", "The marquee flickered and said absolutely not.", "You bought a vowel emotionally. It did not help."],
                marquee_correctAnswer: ["Marquee magic. You solved it clean.", "Final letters, final glory."],
                marquee_revealAnswer: ["Marquee reveal: [TITLE].", "The bulbs spell it out: [TITLE]."],
                dailyChallengeLine: ["One clue. One ego bruise.", "Daily challenge complete. Your movie memory has filed a report.", "Come back tomorrow for another cinematic self-assessment."],
                ...sharedResult
            },
            spicy: {
                wrongAnswer: ["Bold guess. Incorrect, but bold.", "Big confidence, tiny accuracy."],
                correctAnswer: ["That solve had final-boss confidence.", "Correct and slightly intimidating."],
                revealAnswer: ["It was [TITLE]. The room would like a moment.", "Actual answer: [TITLE]. A very public oops."],
                classic_wrongAnswer: ["Typed with confidence. Accuracy declined to attend.", "Not it, but emotionally adjacent.", "The theater rejects this answer."],
                classic_correctAnswer: ["Roll credits. You nailed it.", "Correct. Your streaming habits were not wasted.", "That’s the one. IMDb who?"],
                classic_revealAnswer: ["The answer was: [TITLE]. A humbling screening, honestly.", "Plot twist: it was [TITLE] the whole time.", "The theater reveals: [TITLE]. Please process privately."],
                marquee_wrongAnswer: ["That letter brought no plot development.", "The marquee flickered and said absolutely not.", "You bought a vowel emotionally. It did not help."],
                marquee_correctAnswer: ["Marquee magic. You solved it clean.", "Final letters, final glory."],
                marquee_revealAnswer: ["Marquee reveal: [TITLE].", "The bulbs spell it out: [TITLE]."],
                dailyChallengeLine: ["One clue. One ego bruise.", "Daily challenge complete. Your movie memory has filed a report.", "Come back tomorrow for another cinematic self-assessment."],
                ...sharedResult
            },
            nsfw: {
                wrongAnswer: ["That guess had trailer energy and no third act.", "Wrong in 4K Ultra HD."],
                correctAnswer: ["You cooked that. No notes.", "Correct and disrespectful to the rest of us."],
                revealAnswer: ["Final answer: [TITLE]. The plot wins today.", "Answer reveal: [TITLE]. Cue dramatic collapse."],
                classic_wrongAnswer: ["Typed with confidence. Accuracy declined to attend.", "Not it, but emotionally adjacent.", "The theater rejects this answer."],
                classic_correctAnswer: ["Roll credits. You nailed it.", "Correct. Your streaming habits were not wasted.", "That’s the one. IMDb who?"],
                classic_revealAnswer: ["The answer was: [TITLE]. A humbling screening, honestly.", "Plot twist: it was [TITLE] the whole time.", "The theater reveals: [TITLE]. Please process privately."],
                marquee_wrongAnswer: ["That letter brought no plot development.", "The marquee flickered and said absolutely not.", "You bought a vowel emotionally. It did not help."],
                marquee_correctAnswer: ["Marquee magic. You solved it clean.", "Final letters, final glory."],
                marquee_revealAnswer: ["Marquee reveal: [TITLE].", "The bulbs spell it out: [TITLE]."],
                dailyChallengeLine: ["One clue. One ego bruise.", "Daily challenge complete. Your movie memory has filed a report.", "Come back tomorrow for another cinematic self-assessment."],
                ...sharedResult
            }
        }
    };

    global.PLOT_TWISTED_ROASTS = bank;
})(window);
