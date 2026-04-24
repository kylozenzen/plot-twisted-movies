(function initPlotTwistedRoasts(global) {
    function combine(prefixes, middles, suffixes) {
        const lines = [];
        for (const p of prefixes) {
            for (const m of middles) {
                for (const s of suffixes) {
                    lines.push(`${p} ${m} ${s}`.replace(/\s+/g, ' ').trim());
                }
            }
        }
        return lines;
    }

    function unique(lines) {
        return [...new Set(lines)];
    }

    const bank = {
        fallback: 'The theater has no notes right now.',
        responses: {
            wrongAnswer: unique(combine(
                ['Bold guess.', 'Strong swing.', 'Dramatic choice.', 'Trailer-level confidence.', 'Cinema chaos alert.'],
                ['Wrong title card.', 'Not the movie.', 'Incorrect pick.', 'That is not it.', 'Accuracy left the chat.'],
                ['Please continue the saga.', 'The projector is judging.', 'Your popcorn looked worried.', 'The usher wrote this down.', 'Act two is still available.']
            )),
            nearMiss: unique(combine(
                ['So close.', 'Almost.', 'Near miss.', 'Spiritual accuracy.', 'Cinematic proximity achieved.'],
                ['You grazed the right franchise.', 'You were one trailer away.', 'Your brain found the neighborhood.', 'The title was almost in frame.', 'The vibe was right-ish.'],
                ['Take one more shot.', 'The sequel of this guess might land.', 'You can recover this scene.', 'The audience believes in you.', 'One rewrite away from glory.']
            )),
            correctAnswer: unique(combine(
                ['Roll credits.', 'Correct.', 'Nailed it.', 'Direct hit.', 'The crowd goes mild.'],
                ['You found the title.', 'Your movie memory clocked in.', 'Your brain did practical effects.', 'That guess had Oscar energy.', 'The projector approves.'],
                ['Tiny standing ovation granted.', 'Popcorn bucket salutes you.', 'Please act humble on social media.', 'IMDb fears this momentum.', 'Another win for cinema goblins.']
            )),
            skip: unique(combine(
                ['Skipping is legal.', 'Strategic retreat accepted.', 'You chose peace.', 'You left mid-scene.', 'Tactical skip deployed.'],
                ['The clue remains undefeated.', 'The title escaped custody.', 'This round entered witness protection.', 'Your memory requested a stunt double.', 'The theater marked this as a soft surrender.'],
                ['Next reel, less fear.', 'The popcorn saw everything.', 'No refund, but emotional closure.', 'Onward to the next trailer.', 'The credits for bravery are pending.']
            )),
            revealAnswer: unique(combine(
                ['Answer reveal:', 'Plot twist:', 'The curtain lifts:', 'The theater announces:', 'Final reveal:'],
                ['[TITLE].', 'it was [TITLE].', '[TITLE] was the move.', 'the movie was [TITLE].', '[TITLE] all along.'],
                ['Please process privately.', 'A humbling screening, honestly.', 'The clue tried to help.', 'Your popcorn knew first.', 'Cinema remains undefeated.']
            )),
            giveUp: unique(combine(
                ['White flag raised.', 'You surrendered gracefully.', 'Give-up registered.', 'You tapped out.', 'Retreat confirmed.'],
                ['The movie wins this round.', 'The clue takes the W.', 'Your brain called a timeout.', 'This battle goes to the title.', 'The scoreboard felt that.'],
                ['Next round gets a redemption arc.', 'We pretend this was tactical.', 'The theater accepts your surrender.', 'No shame, just sequel energy.', 'On to the next cinematic mission.']
            )),
            modeSelected: unique(combine(
                ['Mode locked.', 'Great choice.', 'Selection confirmed.', 'Ticket scanned.', 'Runtime updated.'],
                ['You picked a path.', 'You chose your cinematic weapon.', 'The reels are spinning.', 'The house lights dimmed.', 'The lobby gasped slightly.'],
                ['Proceed when emotionally ready.', 'The snacks are expensive but supportive.', 'Cue dramatic intro music.', 'The opening logos begin now.', 'Your destiny has subtitles.']
            )),
            categorySelected: unique(combine(
                ['Category chosen.', 'Genre selected.', 'Shelf pulled.', 'Aisle targeted.', 'Algorithm shocked.'],
                ['The clues are warming up.', 'Your watchlist is trembling.', 'The genre spirits are awake.', 'The projector changed color grading.', 'The trailer voice got louder.'],
                ['Let the guessing begin.', 'Bring your finest guesswork.', 'No spoilers, only chaos.', 'Reel one starts now.', 'Popcorn is mandatory in spirit.']
            )),
            gameStart: unique(combine(
                ['And we begin.', 'Action.', 'Game on.', 'Opening scene.', 'Lights down.'],
                ['Five clues await.', 'Your score starts at hope.', 'Three strikes stand by.', 'The reel is loaded.', 'The audience is seated.'],
                ['May your memory be cinematic.', 'Try not to overthink act one.', 'Cue confidence montage.', 'No trailers, straight to plot.', 'Let chaos direct this film.']
            )),
            lowScoreResult: unique(combine(
                ['Rough screening.', 'Tough night at the movies.', 'Character-building result.', 'Critical flop energy.', 'Box office underperformed.'],
                ['Your movie memory went off-grid.', 'The clues won most rounds.', 'The title cards fought back.', 'Accuracy was on vacation.', 'The script needed rewrites.'],
                ['Come back for the sequel.', 'Redemption arc unlocked.', 'Tomorrow is a reboot.', 'The theater still believes.', 'Practice montage recommended.']
            )),
            midScoreResult: unique(combine(
                ['Respectable run.', 'Solid outing.', 'Balanced performance.', 'Not bad at all.', 'Good hustle.'],
                ['You won some, lost some.', 'The reel had mixed reviews.', 'Your guesses had range.', 'Critics call it "chaotically competent."', 'You survived the plot twists.'],
                ['Sequel potential confirmed.', 'One more run and it pops.', 'The franchise can continue.', 'Your audience returns next week.', 'Keep this momentum rolling.']
            )),
            highScoreResult: unique(combine(
                ['Huge run.', 'Great screening.', 'Top-shelf performance.', 'Cinema wizardry.', 'Prime-time result.'],
                ['Your watch history paid rent.', 'The projector trusts you now.', 'Your guesses had director’s-cut confidence.', 'Most clues got outplayed.', 'The title cards bowed down.'],
                ['Take a tiny victory lap.', 'Save some wins for tomorrow.', 'Popcorn bucket MVP energy.', 'This belongs on a poster.', 'The sequel just got funded.']
            )),
            perfectScoreResult: unique(combine(
                ['Perfect score.', 'Flawless run.', 'Untouchable night.', 'Masterclass achieved.', 'Zero notes.'],
                ['Every clue got solved.', 'You ran the table.', 'No title survived.', 'The game got speedrun.', 'Cinema bowed politely.'],
                ['Roll credits and act normal.', 'Please share your powers responsibly.', 'The theater grants legend status.', 'Award season starts now.', 'Frame this performance.']
            )),
            dailyChallengeSuccess: unique(combine(
                ['Daily complete.', 'Puzzle conquered.', 'Today’s challenge handled.', 'Calendar mission cleared.', 'Daily run secured.'],
                ['Your memory showed up.', 'You brought elite guess energy.', 'The clue gods nodded once.', 'The scoreboard smiled.', 'The reel respected your effort.'],
                ['Return tomorrow for more drama.', 'Streak dreams remain alive.', 'Group chat bragging rights unlocked.', 'Your coffee earned this.', 'See you at the next premiere.']
            )),
            dailyChallengeMiss: unique(combine(
                ['Daily humbled you.', 'Today fought back.', 'Challenge escaped.', 'Calendar took a win.', 'Not your best screening.'],
                ['The clues got messy.', 'Your memory hit buffering.', 'Some titles ghosted you.', 'Act three got away.', 'The scoreboard stayed honest.'],
                ['Tomorrow offers a rematch.', 'Come back with sequel energy.', 'No spoilers for your comeback arc.', 'The theater doors stay open.', 'Reboot at midnight.']
            )),
            copyResultSuccess: unique(combine(
                ['Copied.', 'Share text ready.', 'Clipboard loaded.', 'Result captured.', 'Message armed.'],
                ['Go flex responsibly.', 'Group chat is in danger.', 'Your friends will be notified.', 'Social brag protocol active.', 'Cinema receipts prepared.'],
                ['Try to stay humble.', 'Use this power carefully.', 'No fake modesty required.', 'Post and prosper.', 'May reactions be dramatic.']
            )),
            fallback: unique(combine(
                ['Theater note:', 'House message:', 'Projection update:', 'Cinema bulletin:', 'Lobby announcement:'],
                ['keep playing.', 'you got this.', 'the story continues.', 'the reel rolls on.', 'another clue awaits.'],
                ['Next scene incoming.', 'Stay dramatic.', 'Popcorn optional, confidence required.', 'Intermission is cancelled.', 'Carry on, protagonist.']
            ))
        }
    };

    global.PLOT_TWISTED_ROASTS = bank;
})(window);
