import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.HEYGEN_API_KEY;

async function listInteractiveAvatars() {
    try {
        console.log('🔍 Checking HeyGen Streaming Avatar options...\n');

        // Try to create a session without avatar_id to use default
        console.log('Option 1: Testing DEFAULT streaming avatar (no avatar_id specified)...');
        try {
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
            console.log('✅ SUCCESS! Default streaming avatar is available!');
            console.log('Session ID:', response.data.data.session_id);

            // Clean up the session
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
            console.log('✅ Session cleaned up\n');
        } catch (error) {
            console.log('❌ Default avatar failed:', error.response?.data?.message || error.message);
        }

        // Check what avatars are in the account
        console.log('\nOption 2: Listing all avatars in your account...');
        try {
            const response = await axios.get(
                'https://api.heygen.com/v2/avatars',
                {
                    headers: {
                        'X-Api-Key': apiKey,
                    },
                }
            );

            if (response.data.data && response.data.data.avatars) {
                const avatars = response.data.data.avatars;
                console.log(`Found ${avatars.length} avatars:\n`);

                avatars.forEach((avatar, index) => {
                    console.log(`${index + 1}. ${avatar.avatar_name || avatar.name || 'Unnamed'}`);
                    console.log(`   ID: ${avatar.avatar_id}`);
                    console.log(`   Type: ${avatar.avatar_type || 'Unknown'}`);
                    if (avatar.is_streaming) console.log(`   🎥 STREAMING ENABLED`);
                    console.log('');
                });

                const streamingAvatars = avatars.filter(a => a.is_streaming || a.avatar_type === 'streaming');
                if (streamingAvatars.length > 0) {
                    console.log('\n✅ Interactive/Streaming Avatars Found:');
                    streamingAvatars.forEach(a => {
                        console.log(`- ${a.avatar_id} (${a.avatar_name || a.name})`);
                    });
                } else {
                    console.log('\n⚠️  No interactive/streaming avatars found in your account.');
                    console.log('You may need to subscribe to HeyGen\'s Interactive Avatar plan.');
                }
            }
        } catch (error) {
            console.log('❌ Failed to list avatars:', error.response?.data || error.message);
        }

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

listInteractiveAvatars();
