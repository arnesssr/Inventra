import { RequestSigner } from "@/services/security/requestSigner";

export async function handleWebhook(request: Request) {
  // Verify webhook signature
  const signature = request.headers.get('x-webhook-signature');
  const timestamp = request.headers.get('x-webhook-timestamp');
  const nonce = request.headers.get('x-webhook-nonce');

  if (!signature || !timestamp || !nonce) {
    return new Response('Invalid webhook signature', { status: 401 });
  }

  const body = await request.json();
  
  const isValid = await RequestSigner.verify(
    { signature, timestamp, nonce },
    body
  );

  if (!isValid) {
    return new Response('Invalid webhook signature', { status: 401 });
  }

  // Process webhook based on type
  switch (body.type) {
    case 'inventory.updated':
      // Handle inventory update
      break;
    case 'order.created':
      // Handle new order
      break;
    // Add other webhook types
  }

  return new Response('OK', { status: 200 });
}
