// Frontend JavaScript for AI Avatar Bot Control Panel

const API_BASE = '';

// DOM Elements
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const refreshBtn = document.getElementById('refresh-btn');
const speakBtn = document.getElementById('speak-btn');
const speakText = document.getElementById('speak-text');
const logsContainer = document.getElementById('logs');

// Status elements
const botStatus = document.getElementById('bot-status');
const inMeeting = document.getElementById('in-meeting');
const isSpeaking = document.getElementById('is-speaking');
const participants = document.getElementById('participants');
const queuedMessages = document.getElementById('queued-messages');
const statusIndicator = document.getElementById('status-indicator');

// Event Listeners
startBtn.addEventListener('click', startBot);
stopBtn.addEventListener('click', stopBot);
refreshBtn.addEventListener('click', refreshStatus);
speakBtn.addEventListener('click', makeSpeak);

// Auto-refresh status every 3 seconds
setInterval(refreshStatus, 3000);

// Initial status fetch
refreshStatus();

/**
 * Start the avatar bot
 */
async function startBot() {
    try {
        startBtn.disabled = true;
        addLog('Starting avatar bot...', 'info');

        const response = await fetch(`${API_BASE}/api/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (data.success) {
            addLog('✅ Avatar bot started successfully!', 'success');
            updateStatus(data.status);
            stopBtn.disabled = false;
            speakBtn.disabled = false;
        } else {
            throw new Error(data.message || 'Failed to start bot');
        }
    } catch (error) {
        addLog(`❌ Error: ${error.message}`, 'error');
        startBtn.disabled = false;
    }
}

/**
 * Stop the avatar bot
 */
async function stopBot() {
    try {
        stopBtn.disabled = true;
        addLog('Stopping avatar bot...', 'info');

        const response = await fetch(`${API_BASE}/api/stop`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (data.success) {
            addLog('✅ Avatar bot stopped successfully!', 'success');
            startBtn.disabled = false;
            speakBtn.disabled = true;
            await refreshStatus();
        } else {
            throw new Error(data.message || 'Failed to stop bot');
        }
    } catch (error) {
        addLog(`❌ Error: ${error.message}`, 'error');
        stopBtn.disabled = false;
    }
}

/**
 * Refresh bot status
 */
async function refreshStatus() {
    try {
        const response = await fetch(`${API_BASE}/api/status`);
        const data = await response.json();
        updateStatus(data);
    } catch (error) {
        console.error('Failed to fetch status:', error);
    }
}

/**
 * Make the avatar speak
 */
async function makeSpeak() {
    const text = speakText.value.trim();

    if (!text) {
        addLog('⚠️ Please enter text to speak', 'warning');
        return;
    }

    try {
        speakBtn.disabled = true;
        addLog(`🗣️ Making avatar speak: "${text}"`, 'info');

        const response = await fetch(`${API_BASE}/api/speak`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();

        if (data.success) {
            addLog('✅ Avatar is speaking!', 'success');
            speakText.value = '';
        } else {
            throw new Error(data.message || 'Failed to make avatar speak');
        }
    } catch (error) {
        addLog(`❌ Error: ${error.message}`, 'error');
    } finally {
        speakBtn.disabled = false;
    }
}

/**
 * Update status display
 */
function updateStatus(status) {
    if (status.isRunning) {
        botStatus.textContent = 'Online';
        statusIndicator.classList.add('online');
        startBtn.disabled = true;
        stopBtn.disabled = false;
        speakBtn.disabled = false;
    } else {
        botStatus.textContent = 'Offline';
        statusIndicator.classList.remove('online');
        startBtn.disabled = false;
        stopBtn.disabled = true;
        speakBtn.disabled = true;
    }

    inMeeting.textContent = status.inMeeting ? 'Yes' : 'No';
    isSpeaking.textContent = status.isSpeaking ? 'Yes' : 'No';
    participants.textContent = status.participants || 0;
    queuedMessages.textContent = status.queuedMessages || 0;
}

/**
 * Add log entry
 */
function addLog(message, type = 'info') {
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;

    const timestamp = new Date().toLocaleTimeString();

    logEntry.innerHTML = `
        <div class="log-timestamp">${timestamp}</div>
        <div class="log-message">${message}</div>
    `;

    logsContainer.insertBefore(logEntry, logsContainer.firstChild);

    // Keep only last 50 logs
    while (logsContainer.children.length > 50) {
        logsContainer.removeChild(logsContainer.lastChild);
    }
}
