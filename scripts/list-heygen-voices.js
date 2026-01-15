import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.HEYGEN_API_KEY;

async function listAvailableVoices() {
    try {
        console.log('Fetching available HeyGen voices...\n');

        const response = await axios.get(
            'https://api.heygen.com/v1/voice.list',
            {
                headers: {
                    'X-Api-Key': apiKey,
                },
            }
        );

        console.log('✅ Available voices:\n');
        const voices = response.data.data.voices;

        voices.slice(0, 20).forEach(voice => {
            console.log(`ID: ${voice.voice_id}`);
            console.log(`Name: ${voice.display_name}`);
            console.log(`Language: ${voice.language}`);
            console.log(`Gender: ${voice.gender}`);
            console.log('---');
        });

        console.log(`\nTotal voices available: ${voices.length}`);
        console.log('\nRecommended for Iron Man (Male, English):');
        const maleEnglish = voices.filter(v =>
            v.gender === 'Male' &&
            v.language &&
            v.language.includes('English')
        ).slice(0, 5);

        maleEnglish.forEach(voice => {
            console.log(`- ${voice.voice_id} (${voice.display_name})`);
        });

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

listAvailableVoices();
