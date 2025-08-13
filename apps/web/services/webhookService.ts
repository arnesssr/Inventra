import type { WebhookEventType, WebhookPayload } from "@/types/webhookTypes";
import { verifyWebhookSignature } from "@/utils/webhookUtils";

export const webhookHandlers = {
  'product.updated': async (payload: WebhookPayload) => {
    const productStore = useProductStore// .getState() - TODO: Replace with React Query;
    await productStore.updateProduct(payload.data.id, payload.data);
  },
  // Add other handlers
};
