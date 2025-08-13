import { verifyWebhookSignature } from "@/middleware/verifyWebhook";
import type { WebhookEvent } from "@/types/webhook.types";
import { useNotificationStore } from "@/store/notificationStore";
import { useInventoryStore } from "@/store/inventoryStore";
import { useProductStore } from "@/store/productStore";

export async function webhookHandler(request: Request) {
  try {
    // Verify webhook signature
    await verifyWebhookSignature(request);
    
    const body = await request.json() as WebhookEvent;
    
    // Handle different webhook events
    switch (body.type) {
      case 'inventory.updated':
        useInventoryStore.getState().adjustProductStock(
          body.data.productId,
          body.data.adjustment
        );
        break;
        
      case 'product.published':
        useProductStore.getState().updateProductStatus(
          body.data.productId,
          'published'
        );
        break;

      default:
        throw new Error(`Unknown webhook event type: ${body.type}`);
    }

    // Add notification
    useNotificationStore.getState().addNotification({
        title: 'Webhook Received',
        message: `Processed ${body.type} event`,
        type: 'info',
        read: false
    });

    return new Response('OK', { status: 200 });
  } catch (err: unknown) {
    const error = err as Error;
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error occurred',
        timestamp: new Date().toISOString()
      }), 
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
