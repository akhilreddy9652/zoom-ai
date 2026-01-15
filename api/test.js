// Simple test endpoint for Vercel
export default function handler(req, res) {
    try {
        // Test basic functionality
        const envCheck = {
            hasHeyGenKey: !!process.env.HEYGEN_API_KEY,
            hasOpenRouterKey: !!process.env.OPENROUTER_API_KEY,
            hasDeepgramKey: !!process.env.DEEPGRAM_API_KEY,
            hasZoomKeys: !!(process.env.ZOOM_SDK_KEY && process.env.ZOOM_SDK_SECRET),
            nodeVersion: process.version,
            envCount: Object.keys(process.env).filter(k => k.startsWith('HEYGEN') || k.startsWith('OPENROUTER') || k.startsWith('DEEPGRAM') || k.startsWith('ZOOM')).length
        };

        res.status(200).json({
            status: 'ok',
            message: 'API is working',
            timestamp: new Date().toISOString(),
            environment: envCheck,
            url: req.url,
            method: req.method
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
}
