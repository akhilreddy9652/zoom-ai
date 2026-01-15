import OpenAI from 'openai';
import { config } from '../config.js';

/**
 * AI Service for generating intelligent responses
 * Uses OpenAI GPT to respond as Iron Man
 */
export class AIService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: config.openai.apiKey,
            baseURL: config.openai.baseURL,
        });
        this.conversationHistory = [];
    }

    /**
     * Initialize the conversation with system prompt
     */
    initialize() {
        this.conversationHistory = [
            {
                role: 'system',
                content: config.avatar.systemPrompt,
            },
        ];
        console.log('🤖 AI Service initialized as Iron Man');
    }

    /**
     * Generate a response to a question or statement
     */
    async generateResponse(message, context = {}) {
        try {
            // Add user message to history
            this.conversationHistory.push({
                role: 'user',
                content: message,
            });

            // Add context if available
            let contextPrompt = message;
            if (context.speaker) {
                contextPrompt = `${context.speaker} says: ${message}`;
            }

            console.log(`💭 Generating AI response for: "${message}"`);

            const completion = await this.openai.chat.completions.create({
                model: config.openai.model,
                messages: [
                    ...this.conversationHistory.slice(0, 1), // Keep system prompt
                    ...this.conversationHistory.slice(-10), // Keep last 10 messages
                ],
                max_tokens: 150,
                temperature: 0.8,
            });

            const response = completion.choices[0].message.content;

            // Add assistant response to history
            this.conversationHistory.push({
                role: 'assistant',
                content: response,
            });

            console.log(`🎯 AI Response: "${response}"`);
            return response;
        } catch (error) {
            console.error('❌ Failed to generate AI response:', error.message);
            return "Jarvis seems to be experiencing technical difficulties. Let me get back to you on that.";
        }
    }

    /**
     * Detect if a message is directed at the avatar
     */
    isAddressedToAvatar(message) {
        const keywords = [
            'iron man',
            'tony',
            'stark',
            'jarvis',
            'friday',
            'hey avatar',
            'mr. stark',
        ];

        const lowerMessage = message.toLowerCase();
        return keywords.some(keyword => lowerMessage.includes(keyword));
    }

    /**
     * Extract questions from a message
     */
    containsQuestion(message) {
        const questionWords = ['what', 'why', 'how', 'when', 'where', 'who', 'can you', 'could you', 'would you'];
        const lowerMessage = message.toLowerCase();

        return questionWords.some(word => lowerMessage.includes(word)) || message.includes('?');
    }

    /**
     * Reset conversation history
     */
    resetConversation() {
        this.initialize();
        console.log('🔄 Conversation history reset');
    }
}
