import { Server } from '../src/server.js';

// Create server instance
const serverInstance = new Server();

// For Vercel serverless, export the express app
export default serverInstance.app;
