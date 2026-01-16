import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { AvatarBot } from './bot.js';

/**
 * Web server for controlling the avatar bot
 */
export class Server {
    constructor() {
        this.app = express();
        this.bot = null;
        this.setupMiddleware();
        this.setupRoutes();
    }

    setupMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    setupRoutes() {
        // Health check
        this.app.get('/health', (req, res) => {
            res.json({ status: 'ok', timestamp: new Date().toISOString() });
        });

        // Start the bot
        this.app.post('/api/start', async (req, res) => {
            try {
                if (this.bot && this.bot.isRunning) {
                    return res.status(400).json({ error: 'Bot is already running' });
                }

                this.bot = new AvatarBot();

                // Setup event listeners
                this.bot.on('started', () => {
                    console.log('🎉 Bot started successfully');
                });

                this.bot.on('stopped', () => {
                    console.log('👋 Bot stopped');
                    this.bot = null;
                });

                await this.bot.start();

                res.json({
                    success: true,
                    message: 'Avatar bot started successfully',
                    status: this.bot.getStatus(),
                });
            } catch (error) {
                res.status(500).json({
                    error: 'Failed to start bot',
                    message: error.message
                });
            }
        });

        // Stop the bot
        this.app.post('/api/stop', async (req, res) => {
            try {
                if (!this.bot || !this.bot.isRunning) {
                    return res.status(400).json({ error: 'Bot is not running' });
                }

                await this.bot.stop();

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
        this.app.get('/api/status', (req, res) => {
            if (!this.bot) {
                return res.json({
                    isRunning: false,
                    message: 'Bot is not initialized',
                });
            }

            res.json(this.bot.getStatus());
        });

        // Make the bot speak (manual control)
        this.app.post('/api/speak', async (req, res) => {
            try {
                if (!this.bot || !this.bot.isRunning) {
                    return res.status(400).json({ error: 'Bot is not running' });
                }

                const { text } = req.body;
                if (!text) {
                    return res.status(400).json({ error: 'Text is required' });
                }

                await this.bot.speak(text);

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

        // Generate Zoom SDK signature
        this.app.post('/api/zoom/signature', async (req, res) => {
            try {
                const { meetingNumber, role } = req.body;

                if (!meetingNumber) {
                    return res.status(400).json({ error: 'Meeting number required' });
                }

                // Import the signature generator
                const { generateZoomSignature } = await import('./utils/zoom-signature.js');
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
    }

    start() {
        const port = config.server.port;
        const host = '0.0.0.0'; // Listen on all network interfaces for Railway

        this.app.listen(port, host, () => {
            console.log(`\n${'='.repeat(60)}`);
            console.log(`🚀 AI Avatar Bot Server Running`);
            console.log(`${'='.repeat(60)}`);
            console.log(`📡 Server: http://localhost:${port}`);
            console.log(`👤 Avatar: ${config.avatar.name}`);
            console.log(`📞 Meeting ID: ${config.zoom.meetingId || 'Not set'}`);
            console.log(`${'='.repeat(60)}\n`);
            console.log(`Available endpoints:`);
            console.log(`  POST /api/start  - Start the avatar bot`);
            console.log(`  POST /api/stop   - Stop the avatar bot`);
            console.log(`  GET  /api/status - Get bot status`);
            console.log(`  POST /api/speak  - Make avatar speak (manual)`);
            console.log(`\n${'='.repeat(60)}\n`);
        });
    }
}
