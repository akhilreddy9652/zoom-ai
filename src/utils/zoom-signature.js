import crypto from 'crypto';
import { config } from '../config.js';

/**
 * Generate Zoom SDK signature for joining meetings
 * Required for Zoom Meeting SDK authentication
 */
export function generateZoomSignature(meetingNumber, role = 0) {
    try {
        const sdkKey = config.zoom.meetingSdkKey || process.env.ZOOM_SDK_KEY;
        const sdkSecret = config.zoom.meetingSdkSecret || process.env.ZOOM_SDK_SECRET;

        if (!sdkKey || !sdkSecret) {
            throw new Error('Zoom SDK credentials not configured');
        }

        // Generate timestamp (current time - 30 seconds for clock skew)
        const timestamp = new Date().getTime() - 30000;

        // Create message for HMAC
        const message = Buffer.from(`${sdkKey}${meetingNumber}${timestamp}${role}`).toString('base64');

        // Create HMAC SHA-256 hash
        const hash = crypto
            .createHmac('sha256', sdkSecret)
            .update(message)
            .digest('base64');

        // Create final signature
        const signature = Buffer.from(
            `${sdkKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
        ).toString('base64');

        return {
            signature,
            sdkKey,
            meetingNumber: meetingNumber.toString(),
            role,
            timestamp,
        };
    } catch (error) {
        console.error('Error generating Zoom signature:', error);
        throw error;
    }
}

/**
 * Validate Zoom meeting number format
 */
export function validateMeetingNumber(meetingNumber) {
    // Remove any non-digit characters
    const cleaned = meetingNumber.toString().replace(/\D/g, '');

    // Zoom meeting IDs are typically 9-11 digits
    if (cleaned.length < 9 || cleaned.length > 11) {
        return null;
    }

    return cleaned;
}
