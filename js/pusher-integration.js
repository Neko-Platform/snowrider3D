/**
 * Pusher Integration for Snow Rider 3D
 * Allows remote control of game features like pausing
 */

(function() {
    'use strict';

    // Pusher configuration
    const PUSHER_CONFIG = {
        key: '59418388ba581a7af37d',
        cluster: 'eu',
        encrypted: true
    };

    // Game control wrapper
    const GameControl = {
        gameInstance: null,
        isPaused: false,

        init: function(instance) {
            this.gameInstance = instance;
            console.log('[Pusher] Game control initialized');
        },

        pause: function() {
            if (!this.isPaused && this.gameInstance && typeof SendMessage === 'function') {
                try {
                    // Try to pause the Unity game
                    // Unity games typically respond to time scale changes
                    SendMessage('GameController', 'PauseGame');
                    this.isPaused = true;
                    console.log('[Pusher] Game paused');
                    return true;
                } catch (e) {
                    console.warn('[Pusher] Failed to pause game:', e);
                    return false;
                }
            }
            return false;
        },

        resume: function() {
            if (this.isPaused && this.gameInstance && typeof SendMessage === 'function') {
                try {
                    SendMessage('GameController', 'ResumeGame');
                    this.isPaused = false;
                    console.log('[Pusher] Game resumed');
                    return true;
                } catch (e) {
                    console.warn('[Pusher] Failed to resume game:', e);
                    return false;
                }
            }
            return false;
        },

        restart: function() {
            if (this.gameInstance && typeof SendMessage === 'function') {
                try {
                    SendMessage('GameController', 'RestartGame');
                    this.isPaused = false;
                    console.log('[Pusher] Game restarted');
                    return true;
                } catch (e) {
                    console.warn('[Pusher] Failed to restart game:', e);
                    return false;
                }
            }
            return false;
        },

        setSpeed: function(speed) {
            if (this.gameInstance && typeof SendMessage === 'function') {
                try {
                    SendMessage('GameController', 'SetSpeed', speed);
                    console.log('[Pusher] Game speed set to:', speed);
                    return true;
                } catch (e) {
                    console.warn('[Pusher] Failed to set game speed:', e);
                    return false;
                }
            }
            return false;
        }
    };

    // Pusher connection manager
    const PusherManager = {
        pusher: null,
        channel: null,
        connected: false,

        init: function() {
            if (typeof Pusher === 'undefined') {
                console.error('[Pusher] Pusher library not loaded');
                return false;
            }

            try {
                // Initialize Pusher
                this.pusher = new Pusher(PUSHER_CONFIG.key, {
                    cluster: PUSHER_CONFIG.cluster,
                    encrypted: PUSHER_CONFIG.encrypted
                });

                // Subscribe to game control channel
                this.channel = this.pusher.subscribe('game-control');

                // Connection state listeners
                this.pusher.connection.bind('connected', () => {
                    this.connected = true;
                    console.log('[Pusher] Connected to Pusher');
                });

                this.pusher.connection.bind('disconnected', () => {
                    this.connected = false;
                    console.log('[Pusher] Disconnected from Pusher');
                });

                this.pusher.connection.bind('error', (err) => {
                    console.error('[Pusher] Connection error:', err);
                });

                // Set up event handlers
                this.setupEventHandlers();

                console.log('[Pusher] Pusher manager initialized');
                return true;
            } catch (e) {
                console.error('[Pusher] Failed to initialize Pusher:', e);
                return false;
            }
        },

        setupEventHandlers: function() {
            if (!this.channel) return;

            // Pause game event
            this.channel.bind('pause-game', (data) => {
                console.log('[Pusher] Received pause-game event:', data);
                GameControl.pause();
            });

            // Resume game event
            this.channel.bind('resume-game', (data) => {
                console.log('[Pusher] Received resume-game event:', data);
                GameControl.resume();
            });

            // Restart game event
            this.channel.bind('restart-game', (data) => {
                console.log('[Pusher] Received restart-game event:', data);
                GameControl.restart();
            });

            // Set game speed event
            this.channel.bind('set-speed', (data) => {
                console.log('[Pusher] Received set-speed event:', data);
                if (data && typeof data.speed !== 'undefined') {
                    GameControl.setSpeed(data.speed);
                }
            });

            // Generic command event for extensibility
            this.channel.bind('game-command', (data) => {
                console.log('[Pusher] Received game-command event:', data);
                if (data && data.command) {
                    this.handleGameCommand(data);
                }
            });

            console.log('[Pusher] Event handlers registered');
        },

        handleGameCommand: function(data) {
            switch(data.command) {
                case 'pause':
                    GameControl.pause();
                    break;
                case 'resume':
                    GameControl.resume();
                    break;
                case 'restart':
                    GameControl.restart();
                    break;
                case 'setSpeed':
                    if (typeof data.value !== 'undefined') {
                        GameControl.setSpeed(data.value);
                    }
                    break;
                default:
                    console.warn('[Pusher] Unknown command:', data.command);
            }
        },

        disconnect: function() {
            if (this.pusher) {
                this.pusher.disconnect();
                console.log('[Pusher] Disconnected');
            }
        }
    };

    // Initialize when Unity game is ready
    window.addEventListener('load', function() {
        // Wait for game instance to be available
        const checkGameInstance = setInterval(function() {
            if (typeof gameInstance !== 'undefined' && gameInstance) {
                clearInterval(checkGameInstance);
                
                // Initialize game control
                GameControl.init(gameInstance);
                
                // Initialize Pusher after a short delay to ensure Unity is fully loaded
                setTimeout(function() {
                    PusherManager.init();
                }, 2000);
            }
        }, 100);
    });

    // Expose for debugging
    window.PusherGameControl = {
        manager: PusherManager,
        control: GameControl,
        getStatus: function() {
            return {
                connected: PusherManager.connected,
                paused: GameControl.isPaused
            };
        }
    };

    console.log('[Pusher] Pusher integration script loaded');
})();
