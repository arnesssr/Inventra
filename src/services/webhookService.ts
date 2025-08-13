import type { WebhookEventType, WebhookPayload } from "@/types/webhookTypes";
import { verifyWebhookSignature } from "@/utils/webhookUtils";
import { useNotificationStore } from "@/store/notificationStore";
import { useProductStore } from "@/store/productStore";
import { useInventoryStore } from "@/store/inventoryStore";

export const webhookHandlers = {
  'product.updated': async (payload: WebhookPayload) => {
    const productStore = useProductStore.getState();
    await productStore.updateProduct(payload.data.id, payload.data);
  },
  // Add other handlers
};
