class PlotTwistedAudioManager {
    constructor() {
        this.storageKeys = {
            enabled: 'plotTwistedMusicEnabled',
            volume: 'plotTwistedMusicVolume'
        };

        this.trackMap = {
            menu: './audio/menu-loop.mp3',
            gameplay: './audio/gameplay-loop.mp3'
        };

        this.defaultVolume = 0.35;
        this.enabled = false;
        this.volume = this.defaultVolume;
        this.currentTrackName = null;
        this.currentAudio = null;
        this.pendingTrackName = null;
        this.hasUserGesture = false;
        this.wasPlayingBeforeHide = false;

        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    initAudio() {
        const savedEnabled = localStorage.getItem(this.storageKeys.enabled);
        const savedVolume = localStorage.getItem(this.storageKeys.volume);

        this.enabled = savedEnabled === 'true';

        const parsedVolume = Number.parseFloat(savedVolume);
        this.volume = Number.isFinite(parsedVolume)
            ? Math.min(1, Math.max(0, parsedVolume))
            : this.defaultVolume;

        this.setMusicVolume(this.volume, { persist: false });

        const markGesture = () => {
            this.hasUserGesture = true;
            if (this.enabled && this.pendingTrackName) {
                this.switchMusicTrack(this.pendingTrackName);
            }
        };

        ['pointerdown', 'keydown', 'touchstart'].forEach((eventName) => {
            document.addEventListener(eventName, markGesture, { passive: true, once: true });
        });

        document.addEventListener('visibilitychange', this.handleVisibilityChange);

        return {
            enabled: this.enabled,
            volume: this.volume
        };
    }

    setMusicEnabled(enabled) {
        this.enabled = !!enabled;
        localStorage.setItem(this.storageKeys.enabled, String(this.enabled));

        if (!this.enabled) {
            this.stopMusic();
            this.pendingTrackName = null;
            return;
        }

        this.hasUserGesture = true;

        if (this.pendingTrackName) {
            this.switchMusicTrack(this.pendingTrackName);
        }
    }

    setMusicVolume(volume, options = {}) {
        const safeVolume = Number.isFinite(volume)
            ? Math.min(1, Math.max(0, volume))
            : this.defaultVolume;

        this.volume = safeVolume;

        if (this.currentAudio) {
            this.currentAudio.volume = safeVolume;
        }

        if (options.persist !== false) {
            localStorage.setItem(this.storageKeys.volume, String(safeVolume));
        }
    }

    playMenuMusic() {
        this.switchMusicTrack('menu');
    }

    playGameplayMusic() {
        this.switchMusicTrack('gameplay');
    }

    stopMusic() {
        if (!this.currentAudio) return;

        try {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        } catch (_error) {
            // fail silently
        }
    }

    switchMusicTrack(trackName) {
        if (!this.trackMap[trackName]) return;

        if (!this.enabled) {
            this.pendingTrackName = trackName;
            this.stopMusic();
            return;
        }

        if (!this.hasUserGesture) {
            this.pendingTrackName = trackName;
            return;
        }

        this.pendingTrackName = trackName;

        if (!this.currentAudio) {
            this.currentAudio = new Audio();
            this.currentAudio.loop = true;
            this.currentAudio.preload = 'none';
        }

        if (this.currentTrackName === trackName && !this.currentAudio.paused) {
            return;
        }

        const source = this.trackMap[trackName];

        try {
            this.currentAudio.pause();
            this.currentAudio.src = source;
            this.currentAudio.currentTime = 0;
            this.currentAudio.volume = this.volume;
            this.currentTrackName = trackName;

            const playPromise = this.currentAudio.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {
                    // Fail silently for autoplay restrictions / missing files.
                });
            }
        } catch (_error) {
            // fail silently
        }
    }

    handleVisibilityChange() {
        if (!this.currentAudio) return;

        if (document.visibilityState === 'hidden') {
            this.wasPlayingBeforeHide = this.enabled && !this.currentAudio.paused;
            try {
                this.currentAudio.pause();
            } catch (_error) {
                // fail silently
            }
            return;
        }

        if (document.visibilityState === 'visible' && this.wasPlayingBeforeHide && this.enabled) {
            this.wasPlayingBeforeHide = false;
            if (this.currentTrackName) {
                this.switchMusicTrack(this.currentTrackName);
            }
        }
    }
}

window.PlotTwistedAudioManager = PlotTwistedAudioManager;
