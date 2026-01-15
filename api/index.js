import express from 'express';
import cors from 'cors';
import { config } from '../src/config.js';
import { AvatarBot } from '../src/bot.js';

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Global bot instance
let bot = null;

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start the bot
app.post('/api/start', async (req, res) => {
    try {
        if (bot && bot.isRunning) {
            return res.status(400).json({ error: 'Bot is already running' });
        }

        bot = new AvatarBot();

        bot.on('started', () => {
            console.log('🎉 Bot started successfully');
        });

        bot.on('stopped', () => {
            console.log('👋 Bot stopped');
            bot = null;
        });

        await bot.start();

        res.json({
            success: true,
            message: 'Avatar bot started successfully',
            status: bot.getStatus(),
        });
    } catch (error) {
        console.error('Start error:', error);
        res.status(500).json({
            error: 'Failed to start bot',
            message: error.message
        });
    }
});

// Stop the bot
app.post('/api/stop', async (req, res) => {
    try {
        if (!bot || !bot.isRunning) {
            return res.status(400).json({ error: 'Bot is not running' });
        }

        await bot.stop();

        res.json({
            success: true,
            message: 'Avatar bot stopped successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to stop bot',
            message: error.message
        });
    }
});

// Get bot status
app.get('/api/status', (req, res) => {
    if (!bot) {
        return res.json({
            isRunning: false,
            message: 'Bot is not initialized',
        });
    }

    res.json(bot.getStatus());
});

// Make the bot speak
app.post('/api/speak', async (req, res) => {
    try {
        if (!bot || !bot.isRunning) {
            return res.status(400).json({ error: 'Bot is not running' });
        }

        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        await bot.speak(text);

        res.json({
            success: true,
            message: 'Avatar is speaking',
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to make avatar speak',
            message: error.message
        });
    }
});

// Zoom signature endpoint
app.post('/api/zoom/signature', async (req, res) => {
    try {
        const { meetingNumber, role } = req.body;

        if (!meetingNumber) {
            return res.status(400).json({ error: 'Meeting number required' });
        }

        const { generateZoomSignature } = await import('../src/utils/zoom-signature.js');
        const signatureData = generateZoomSignature(meetingNumber, role || 0);

        res.json(signatureData);
    } catch (error) {
        console.error('Error generating Zoom signature:', error);
        res.status(500).json({
            error: 'Failed to generate signature',
            message: error.message
        });
    }
});

// Export for Vercel
export default app;
