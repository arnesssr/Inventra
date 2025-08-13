import { RequestSigner } from "@/services/security/requestSigner";

export async function verifyWebhookSignature(request: Request): Promise<void> {
  const signature = request.headers.get('x-webhook-signature');
  const timestamp = request.headers.get('x-webhook-timestamp');
  const nonce = request.headers.get('x-webhook-nonce');

  if (!signature || !timestamp || !nonce) {
    throw new Error('Missing webhook signature headers');
  }

  const payload = await request.clone().json();
  const isValid = await RequestSigner.verify(
    { signature, timestamp, nonce },
    payload
  );

  if (!isValid) {
    throw new Error('Invalid webhook signature');
  }
}
