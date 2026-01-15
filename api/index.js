import { Server } from './server.js';

const server = new Server();
server.start();

// Export for Vercel serverless
export default server.app;
