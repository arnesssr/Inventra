import type { WebhookEventType, WebhookPayload } from "@/types/webhookTypes";
import { verifyWebhookSignature } from "@/utils/webhookUtils";

export const webhookHandlers = {
  'product.updated': async (payload: WebhookPayload) => {
    await productStore.updateProduct(payload.data.id, payload.data);
  },
  // Add other handlers
};
