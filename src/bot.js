import { EventEmitter } from 'events';
import { HeyGenService } from './services/heygen.js';
import { AIService } from './services/ai.js';
import { ZoomService } from './services/zoom.js';
import { SpeechService } from './services/speech.js';
import { config } from './config.js';

/**
 * Main AI Avatar Bot
 * Orchestrates all services to create an AI avatar that attends Zoom meetings
 */
export class AvatarBot extends EventEmitter {
    constructor() {
        super();

        // Initialize services
        this.heygen = new HeyGenService();
        this.ai = new AIService();
        this.zoom = new ZoomService();
        this.speech = new SpeechService();

        // State
        this.isRunning = false;
        this.isSpeaking = false;
        this.messageQueue = [];

        this.setupEventHandlers();
    }

    /**
     * Setup event handlers for all services
     */
    setupEventHandlers() {
        // HeyGen events
        this.heygen.on('talking', (isTalking) => {
            this.isSpeaking = isTalking;
            if (!isTalking) {
                this.processNextMessage();
            }
        });

        this.heygen.on('videoFrame', (frame) => {
            // Send video frame to Zoom
            if (this.zoom.isInMeeting) {
                this.zoom.sendVideoStream(frame);
            }
        });

        this.heygen.on('audioFrame', (frame) => {
            // Send audio frame to Zoom
            if (this.zoom.isInMeeting) {
                this.zoom.sendAudioStream(frame);
            }
        });

        // Speech events
        this.speech.on('transcription', async (data) => {
            await this.handleTranscription(data);
        });

        // Zoom events
        this.zoom.on('joined', () => {
            this.emit('meetingJoined');
            this.greetMeeting();
        });

        this.zoom.on('participantJoined', (participant) => {
            this.greetParticipant(participant);
        });

        this.zoom.on('audioReceived', (audioData) => {
            // Process audio for transcription
            this.speech.processAudioChunk(audioData);
        });
    }

    /**
     * Start the avatar bot
     */
    async start() {
        try {
            console.log('🚀 Starting AI Avatar Bot...');
            console.log(`👤 Avatar: ${config.avatar.name}`);
            console.log(`📞 Meeting: ${config.zoom.meetingId}`);

            // Initialize AI
            this.ai.initialize();

            // Create HeyGen session (starts automatically)
            await this.heygen.createSession();

            // Join Zoom meeting
            await this.zoom.joinMeeting();

            // Start listening to meeting
            this.zoom.startListening();
            await this.speech.startSpeechToText();

            this.isRunning = true;
            console.log('✅ Avatar bot is now active in the meeting!');

            this.emit('started');
        } catch (error) {
            console.error('❌ Failed to start avatar bot:', error);
            throw error;
        }
    }

    /**
     * Stop the avatar bot
     */
    async stop() {
        try {
            console.log('🛑 Stopping AI Avatar Bot...');

            // Say goodbye
            await this.speak("Thanks everyone! Iron Man out. ✌️");

            // Wait for speech to finish
            await this.waitForSpeechToFinish();

            // Stop all services
            this.speech.stopSpeechToText();
            this.zoom.stopListening();
            await this.zoom.leaveMeeting();
            await this.heygen.stopAvatar();

            this.isRunning = false;
            console.log('✅ Avatar bot stopped');

            this.emit('stopped');
        } catch (error) {
            console.error('❌ Error stopping avatar bot:', error);
        }
    }

    /**
     * Handle transcribed speech from meeting
     */
    async handleTranscription(data) {
        const { text, speaker } = data;

        console.log(`📝 Transcription from ${speaker}: "${text}"`);

        // Check if message is addressed to avatar or contains question
        const isForAvatar = this.ai.isAddressedToAvatar(text);
        const hasQuestion = this.ai.containsQuestion(text);

        if (isForAvatar || hasQuestion) {
            console.log('🎯 Message is for the avatar, generating response...');

            // Generate AI response
            const response = await this.ai.generateResponse(text, { speaker });

            // Queue the response
            this.queueMessage(response);
        }
    }

    /**
     * Queue a message to be spoken
     */
    queueMessage(message) {
        this.messageQueue.push(message);
        if (!this.isSpeaking) {
            this.processNextMessage();
        }
    }

    /**
     * Process next message in queue
     */
    async processNextMessage() {
        if (this.messageQueue.length === 0 || this.isSpeaking) {
            return;
        }

        const message = this.messageQueue.shift();
        await this.speak(message);
    }

    /**
     * Make the avatar speak
     */
    async speak(text) {
        try {
            console.log(`💬 Avatar speaking: "${text}"`);
            this.isSpeaking = true;
            await this.heygen.speak(text);
        } catch (error) {
            console.error('❌ Error speaking:', error);
            this.isSpeaking = false;
        }
    }

    /**
     * Greet the meeting when joining
     */
    async greetMeeting() {
        const greeting = "Hey everyone! Tony Stark here - well, my AI avatar anyway. " +
            "I'm here to sit in on this meeting. Feel free to ask me anything!";
        await this.speak(greeting);
    }

    /**
     * Greet a new participant
     */
    async greetParticipant(participant) {
        const greeting = `Welcome ${participant.name}! Good to have you here.`;
        this.queueMessage(greeting);
    }

    /**
     * Wait for current speech to finish
     */
    async waitForSpeechToFinish(timeout = 10000) {
        const startTime = Date.now();
        while (this.isSpeaking && Date.now() - startTime < timeout) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    /**
     * Get bot status
     */
    getStatus() {
        return {
            isRunning: this.isRunning,
            isSpeaking: this.isSpeaking,
            inMeeting: this.zoom.isInMeeting,
            queuedMessages: this.messageQueue.length,
            participants: this.zoom.getParticipants().length,
        };
    }
}
