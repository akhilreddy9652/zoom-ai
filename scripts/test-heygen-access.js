import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.HEYGEN_API_KEY;

async function cleanupSessions() {
    console.log('🔍 Checking for active HeyGen streaming sessions...\n');

    try {
        // Try to list all active sessions (if API supports it)
        console.log('Note: There might be an active session preventing new ones.\n');
        console.log('Attempting to create a test session to verify access...\n');

        const response = await axios.post(
            'https://api.heygen.com/v1/streaming.new',
            {
                quality: 'high',
            },
            {
                headers: {
                    'X-Api-Key': apiKey,
                },
            }
        );

        console.log('✅ SUCCESS! Session created:', response.data.data.session_id);
        console.log('\nYour HeyGen plan now allows streaming avatars!');
        console.log('\nCleaning up test session...');

        // Clean up
        await axios.post(
            'https://api.heygen.com/v1/streaming.stop',
            {
                session_id: response.data.data.session_id,
            },
            {
                headers: {
                    'X-Api-Key': apiKey,
                },
            }
        );

        console.log('✅ Test session cleaned up');
        console.log('\n🎉 You can now use the avatar bot!');
        console.log('Go to http://localhost:3000 and click "Start Avatar Bot"');

    } catch (error) {
        if (error.response?.data?.code === 10004) {
            console.log('❌ Still getting concurrent limit error\n');
            console.log('This means:');
            console.log('1. Your HeyGen plan has not been upgraded yet, OR');
            console.log('2. There is an active streaming session running\n');
            console.log('Solutions:');
            console.log('- Go to https://app.heygen.com/ and check for active sessions');
            console.log('- OR upgrade your plan at https://app.heygen.com/settings/billing');
            console.log('- OR wait 5-10 minutes for any previous sessions to timeout');
        } else {
            console.log('Error:', error.response?.data || error.message);
        }
    }
}

cleanupSessions();
