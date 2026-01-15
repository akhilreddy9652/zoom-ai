// Vercel Serverless Function Handler
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { url, method } = req;

    try {
        // Health check
        if (url === '/api/health' && method === 'GET') {
            return res.status(200).json({
                status: 'ok',
                timestamp: new Date().toISOString()
            });
        }

        // Status endpoint
        if (url === '/api/status' && method === 'GET') {
            return res.status(200).json({
                isRunning: false,
                message: 'Bot is not initialized',
                note: 'Serverless functions are stateless - bot needs persistent connection'
            });
        }

        // Test endpoint
        if (url === '/api/test' && method === 'GET') {
            const envCheck = {
                hasHeyGenKey: !!process.env.HEYGEN_API_KEY,
                hasOpenRouterKey: !!process.env.OPENROUTER_API_KEY,
                hasDeepgramKey: !!process.env.DEEPGRAM_API_KEY,
                hasZoomKeys: !!(process.env.ZOOM_SDK_KEY && process.env.ZOOM_SDK_SECRET),
                deployedAt: new Date().toISOString()
            };

            return res.status(200).json({
                status: 'working',
                environment: envCheck,
                message: 'API is functional'
            });
        }

        // Info endpoint
        if (url === '/api/info' || url === '/api' || url === '/') {
            return res.status(200).json({
                name: 'AI Zoom Avatar Bot API',
                version: '1.0.0',
                status: 'online',
                endpoints: {
                    health: '/api/health',
                    status: '/api/status',
                    test: '/api/test',
                    info: '/api/info'
                },
                note: 'For full bot functionality, a persistent server is required. Vercel serverless functions are stateless.'
            });
        }

        // Not found
        return res.status(404).json({
            error: 'Endpoint not found',
            url: url,
            availableEndpoints: ['/api/health', '/api/status', '/api/test', '/api/info']
        });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
