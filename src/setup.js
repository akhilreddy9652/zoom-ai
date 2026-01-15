import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     🤖 AI Zoom Avatar Bot - Setup Wizard 🦾                  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

Welcome! This wizard will help you set up your AI Avatar Bot.

You'll need:
  1. HeyGen API Key (https://heygen.com)
  2. OpenAI API Key (https://platform.openai.com)
  3. Zoom Meeting ID (optional now, can add later)

Let's get started!
`);

async function setup() {
    try {
        // Collect API keys
        console.log('\n📝 Step 1: HeyGen Configuration');
        console.log('─'.repeat(60));
        const heygenKey = await question('Enter your HeyGen API Key: ');
        const avatarId = await question('Enter HeyGen Avatar ID (or press Enter for default): ');

        console.log('\n📝 Step 2: OpenAI Configuration');
        console.log('─'.repeat(60));
        const openaiKey = await question('Enter your OpenAI API Key: ');

        console.log('\n📝 Step 3: Zoom Configuration (Optional)');
        console.log('─'.repeat(60));
        const meetingId = await question('Enter Zoom Meeting ID (or press Enter to skip): ');
        const meetingPassword = await question('Enter Zoom Meeting Password (or press Enter to skip): ');

        console.log('\n📝 Step 4: Avatar Customization');
        console.log('─'.repeat(60));
        const avatarName = await question('Avatar Name (press Enter for "Iron Man Assistant"): ') || 'Iron Man Assistant';

        // Create .env file
        const envContent = `# HeyGen API Configuration
HEYGEN_API_KEY=${heygenKey}
${avatarId ? `HEYGEN_AVATAR_ID=${avatarId}` : '# HEYGEN_AVATAR_ID=default_avatar'}

# Zoom Configuration
${meetingId ? `ZOOM_MEETING_ID=${meetingId}` : '# ZOOM_MEETING_ID='}
${meetingPassword ? `ZOOM_MEETING_PASSWORD=${meetingPassword}` : '# ZOOM_MEETING_PASSWORD='}

# OpenAI Configuration (for AI responses)
OPENAI_API_KEY=${openaiKey}

# Avatar Configuration
AVATAR_NAME=${avatarName}
AVATAR_VOICE=en-US-Neural2-J

# Server Configuration
PORT=3000
`;

        const envPath = path.join(__dirname, '..', '.env');
        fs.writeFileSync(envPath, envContent);

        console.log('\n✅ Configuration saved successfully!');
        console.log('\n📋 Next Steps:');
        console.log('─'.repeat(60));
        console.log('  1. Review your .env file if needed');
        console.log('  2. Start the server with: npm start');
        console.log('  3. Open http://localhost:3000 in your browser');
        console.log('  4. Click "Start Avatar Bot" to join your meeting');
        console.log('\n🎉 Setup complete! Time to let Iron Man attend your meetings!');
        console.log('');

    } catch (error) {
        console.error('\n❌ Setup failed:', error.message);
    } finally {
        rl.close();
    }
}

setup();
