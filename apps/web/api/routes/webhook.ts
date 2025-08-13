import { verifyWebhookSignature } from "@/middleware/verifyWebhook";
import type { WebhookEvent } from "@/types/webhook.types";

export async function webhookHandler(request: Request) {
  try {
    // Verify webhook signature
    await verifyWebhookSignature(request);
    
    const body = await request.json() as WebhookEvent;
    
    // Handle different webhook events
    switch (body.type) {
      case 'inventory.updated':
        useInventoryStore// .getState() - TODO: Replace with React Query.adjustProductStock(
          body.data.productId,
          body.data.adjustment
        );
        break;
        
      case 'product.published':
        useProductStore// .getState() - TODO: Replace with React Query.updateProductStatus(
          body.data.productId,
          'published'
        );
        break;

      default:
        throw new Error(`Unknown webhook event type: ${body.type}`);
    }

    // Add notification
    useNotificationStore// .getState() - TODO: Replace with React Query.addNotification({
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
