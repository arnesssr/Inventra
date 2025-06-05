import { createHmac } from 'crypto';
import { getCurrentConfig } from '../config/environment';

export const verifyWebhookSignature = (payload: string, signature: string): boolean => {
  const config = getCurrentConfig();
  const hmac = createHmac('sha256', config.webhookSecret);
  const calculatedSignature = hmac.update(payload).digest('hex');
  return calculatedSignature === signature;
};
