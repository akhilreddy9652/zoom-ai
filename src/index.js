import { config, validateConfig } from './config.js';
import { Server } from './server.js';

/**
 * Main entry point for AI Avatar Bot
 */
async function main() {
    try {
        console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║        🤖 AI ZOOM AVATAR BOT - Iron Man Edition 🦾           ║
║                                                               ║
║  An AI-powered avatar that attends Zoom meetings using       ║
║  HeyGen's streaming avatar technology and GPT intelligence   ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
    `);

        // Validate configuration
        console.log('⚙️  Validating configuration...');
        validateConfig();
        console.log('✅ Configuration valid\n');

        // Start the server
        const server = new Server();
        server.start();

    } catch (error) {
        console.error('\n❌ Fatal Error:', error.message);
        console.error('\n📝 Please check your .env file and ensure all required variables are set.');
        console.error('   See .env.example for reference.\n');
        process.exit(1);
    }
}

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n\n👋 Shutting down gracefully...');
    process.exit(0);
});

// Start the application
main();
