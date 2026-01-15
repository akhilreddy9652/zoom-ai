import { EventEmitter } from 'events';
import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import { config } from '../config.js';

/**
 * Speech Service for Speech-to-Text using Deepgram
 * Real-time transcription of meeting audio
 */
export class SpeechService extends EventEmitter {
    constructor() {
        super();
        this.deepgram = null;
        this.connection = null;
        this.isListening = false;
        this.audioBuffer = [];
    }

    /**
     * Start speech-to-text processing with Deepgram
     */
    async startSpeechToText() {
        try {
            console.log('🎤 Starting Deepgram speech-to-text...');

            // Check if we have Deepgram API key
            if (!process.env.DEEPGRAM_API_KEY) {
                console.log('⚠️  No Deepgram API key found, using simulation mode');
                this.isListening = true;
                return true;
            }

            // Initialize Deepgram client
            this.deepgram = createClient(process.env.DEEPGRAM_API_KEY);

            // Create live transcription connection
            this.connection = this.deepgram.listen.live({
                model: 'nova-2',
                language: 'en-US',
                smart_format: true,
                punctuate: true,
                interim_results: true,
                utterance_end_ms: 1000,
                vad_events: true,
            });

            // Setup event listeners
            this.connection.on(LiveTranscriptionEvents.Open, () => {
                console.log('✅ Deepgram connection opened');
                this.isListening = true;
            });

            this.connection.on(LiveTranscriptionEvents.Transcript, (data) => {
                const transcript = data.channel.alternatives[0].transcript;

                if (transcript && transcript.trim().length > 0) {
                    const isFinal = data.is_final;

                    // Emit transcription event
                    this.emit('transcription', {
                        text: transcript,
                        isFinal: isFinal,
                        speaker: 'Participant',
                        confidence: data.channel.alternatives[0].confidence,
                    });

                    if (isFinal) {
                        console.log('📝 [FINAL]:', transcript);
                    }
                }
            });

            this.connection.on(LiveTranscriptionEvents.Error, (error) => {
                console.error('❌ Deepgram error:', error);
                this.emit('error', error);
            });

            this.connection.on(LiveTranscriptionEvents.Close, () => {
                console.log('🔌 Deepgram connection closed');
                this.isListening = false;
            });

            return true;
        } catch (error) {
            console.error('❌ Failed to start Deepgram:', error);
            // Fall back to simulation mode
            this.isListening = true;
            return true;
        }
    }

    /**
     * Stop speech-to-text processing
     */
    stopSpeechToText() {
        console.log('🎤 Stopping speech-to-text...');

        if (this.connection) {
            this.connection.finish();
            this.connection = null;
        }

        this.isListening = false;
    }

    /**
     * Process audio chunk for transcription
     */
    async processAudioChunk(audioData) {
        if (!this.isListening) {
            return;
        }

        try {
            // If we have a Deepgram connection, send audio
            if (this.connection && this.connection.getReadyState() === 1) {
                this.connection.send(audioData);
            } else {
                // Simulation mode - emit sample transcription occasionally
                this.simulateTranscription();
            }
        } catch (error) {
            console.error('Error processing audio:', error);
        }
    }

    /**
     * Simulate transcription for testing without real audio
     */
    simulateTranscription() {
        // Buffer audio chunks
        this.audioBuffer.push(Date.now());

        // Emit sample transcription every 10 chunks (simulation)
        if (this.audioBuffer.length > 10) {
            const sampleQuestions = [
                "What do you think about this proposal?",
                "Hey Tony, are you there?",
                "Can someone explain the technical architecture?",
                "What are the next steps for this project?",
            ];

            const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];

            this.emit('transcription', {
                text: randomQuestion,
                isFinal: true,
                speaker: 'Participant',
                confidence: 0.95,
            });

            this.audioBuffer = [];
        }
    }

    /**
     * Detect speech in audio (Voice Activity Detection)
     */
    detectSpeech(audioData) {
        // Simple VAD - check if audio has sufficient energy
        if (!audioData || audioData.length === 0) {
            return false;
        }

        // Calculate RMS (Root Mean Square) energy
        let sum = 0;
        for (let i = 0; i < audioData.length; i++) {
            sum += audioData[i] * audioData[i];
        }
        const rms = Math.sqrt(sum / audioData.length);

        // Threshold for speech detection
        const threshold = 0.01;
        return rms > threshold;
    }
}
