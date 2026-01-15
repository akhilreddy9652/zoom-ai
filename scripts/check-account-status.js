import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.HEYGEN_API_KEY;

async function checkStreamingAccess() {
    console.log('🔍 Checking your HeyGen account status...\n');

    try {
        // Check account info
        console.log('1️⃣ Getting account information...');
        const accountResponse = await axios.get(
            'https://api.heygen.com/v1/user/remaining_quota',
            {
                headers: {
                    'X-Api-Key': apiKey,
                },
            }
        );

        console.log('\n📊 Your Current Plan:');
        console.log('Credits Available:', accountResponse.data.data || 'N/A');
        console.log('---\n');

        // Try to create a streaming session
        console.log('2️⃣ Testing streaming avatar access...');
        const streamingResponse = await axios.post(
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

        console.log('✅ SUCCESS! Streaming avatars ARE available on your plan!');
        console.log('Session ID:', streamingResponse.data.data.session_id);
        console.log('\n🎉 Good news: The bot will work without upgrading!');
        console.log('⚠️  However, there might be session limits or timeouts.\n');

        // Clean up
        await axios.post(
            'https://api.heygen.com/v1/streaming.stop',
            {
                session_id: streamingResponse.data.data.session_id,
            },
            {
                headers: {
                    'X-Api-Key': apiKey,
                },
            }
        );
        console.log('✅ Test session cleaned up');

    } catch (error) {
        if (error.response?.data?.code === 10004) {
            console.log('\n❌ CONFIRMED: Streaming NOT available on current plan');
            console.log('Error:', error.response.data.message);
            console.log('\n📋 Your Options:\n');
            console.log('Option 1: Upgrade to get streaming access');
            console.log('  - HeyGen Creator Plan: ~$24-48/month');
            console.log('  - Includes real-time streaming avatars');
            console.log('  - Go to: https://app.heygen.com/settings/billing\n');
            console.log('Option 2: Use Virtual Camera (FREE!)');
            console.log('  - Use your 10 credits to create avatar videos');
            console.log('  - Stream through OBS Virtual Camera');
            console.log('  - Works with current plan, zero extra cost\n');
            console.log('Option 3: Contact HeyGen Support');
            console.log('  - Ask about streaming avatar trials');
            console.log('  - Explain your use case');
            console.log('  - They might offer a test period\n');
        } else {
            console.log('Error checking account:', error.response?.data || error.message);
        }
    }
}

checkStreamingAccess();
