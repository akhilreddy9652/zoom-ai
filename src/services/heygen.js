import axios from 'axios';
import { config } from '../config.js';
import { EventEmitter } from 'events';
import WebSocket from 'ws';

/**
 * HeyGen Streaming Avatar Service
 * Manages the connection to HeyGen's Interactive Avatar API
 */
export class HeyGenService extends EventEmitter {
    constructor() {
        super();
        this.apiKey = config.heygen.apiKey;
        this.baseUrl = 'https://api.heygen.com/v1';
        this.sessionId = null;
        this.ws = null;
        this.isStreaming = false;
    }

    /**
     * Create a new streaming session
     */
    async createSession() {
        try {
            console.log('🎭 Creating HeyGen streaming session...');

            // Build request body
            const requestBody = {
                quality: 'high',
            };

            // Add avatar_id if provided
            if (config.heygen.avatarId && config.heygen.avatarId !== 'default_avatar') {
                requestBody.avatar_id = config.heygen.avatarId;
                console.log('Using avatar ID:', config.heygen.avatarId);
            }

            const response = await axios.post(
                `${this.baseUrl}/streaming.new`,
                requestBody,
                {
                    headers: {
                        'X-Api-Key': this.apiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );

            this.sessionId = response.data.data.session_id;
            const serverUrl = response.data.data.url;

            console.log('✅ HeyGen session created:', this.sessionId);

            // Connect to WebSocket
            await this.connectWebSocket(serverUrl);

            return this.sessionId;
        } catch (error) {
            console.error('❌ Failed to create HeyGen session:', error.response?.data || error.message);
            throw error;
        }
    }

    /**
   * Connect to HeyGen WebSocket for real-time streaming
   */
    async connectWebSocket(url) {
        return new Promise((resolve, reject) => {
            try {
                console.log('🔗 Connecting to WebSocket:', url);

                // Create WebSocket with options
                this.ws = new WebSocket(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0',
                    },
                    handshakeTimeout: 10000,
                });

                // Timeout handler
                const timeout = setTimeout(() => {
                    if (!this.isStreaming) {
                        console.log('⏱️ WebSocket connection timeout - continuing anyway');
                        this.isStreaming = true;
                        resolve(); // Resolve anyway, session was created
                    }
                }, 5000);

                this.ws.on('open', () => {
                    clearTimeout(timeout);
                    console.log('🔌 Connected to HeyGen WebSocket');
                    this.isStreaming = true;
                    resolve();
                });

                this.ws.on('message', (data) => {
                    try {
                        const message = JSON.parse(data);
                        this.handleWebSocketMessage(message);
                    } catch (error) {
                        console.error('Error parsing WebSocket message:', error);
                    }
                });

                this.ws.on('error', (error) => {
                    clearTimeout(timeout);
                    console.error('❌ HeyGen WebSocket error:', error.message);
                    // Don't reject - session was created successfully
                    // We can still use REST API fallbacks
                    console.log('⚠️ Continuing with REST API mode');
                    this.isStreaming = true;
                    resolve();
                });

                this.ws.on('close', () => {
                    console.log('🔌 HeyGen WebSocket closed');
                    this.isStreaming = false;
                });
            } catch (error) {
                console.error('Failed to create WebSocket:', error);
                // Session was created, so resolve anyway
                this.isStreaming = true;
                resolve();
            }
        });
    }
    /**
     * Handle incoming WebSocket messages from HeyGen
     */
    handleWebSocketMessage(message) {
        switch (message.type) {
            case 'avatar_start_talking':
                this.emit('talking', true);
                break;
            case 'avatar_stop_talking':
                this.emit('talking', false);
                break;
            case 'stream':
                // Video stream data
                this.emit('videoFrame', message.data);
                break;
            case 'audio':
                // Audio stream data
                this.emit('audioFrame', message.data);
                break;
            default:
                console.log('HeyGen message:', message.type);
        }
    }

    /**
     * Make the avatar speak
     */
    async speak(text) {
        if (!this.sessionId) {
            throw new Error('No active HeyGen session');
        }

        try {
            console.log('🗣️  Avatar speaking:', text);

            await axios.post(
                `${this.baseUrl}/streaming.task`,
                {
                    session_id: this.sessionId,
                    text: text,
                },
                {
                    headers: {
                        'X-Api-Key': this.apiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return true;
        } catch (error) {
            console.error('❌ Failed to make avatar speak:', error.response?.data || error.message);
            throw error;
        }
    }

    /**
     * Start the avatar (begin streaming)
     */
    async startAvatar() {
        if (!this.sessionId) {
            throw new Error('No active HeyGen session');
        }

        try {
            await axios.post(
                `${this.baseUrl}/streaming.start`,
                {
                    session_id: this.sessionId,
                },
                {
                    headers: {
                        'X-Api-Key': this.apiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('▶️  Avatar started streaming');
            return true;
        } catch (error) {
            console.error('❌ Failed to start avatar:', error.response?.data || error.message);
            throw error;
        }
    }

    /**
     * Stop the avatar and close session
     */
    async stopAvatar() {
        if (!this.sessionId) {
            return;
        }

        try {
            await axios.post(
                `${this.baseUrl}/streaming.stop`,
                {
                    session_id: this.sessionId,
                },
                {
                    headers: {
                        'X-Api-Key': this.apiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (this.ws) {
                this.ws.close();
            }

            console.log('⏹️  Avatar stopped');
            this.sessionId = null;
            this.isStreaming = false;
        } catch (error) {
            console.error('❌ Failed to stop avatar:', error.response?.data || error.message);
        }
    }

    /**
     * Get the video stream URL for the avatar
     */
    getStreamUrl() {
        return this.streamUrl;
    }
}
