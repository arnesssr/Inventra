import { securityConfig } from '../../config/securityConfig';
import { RequestSignature } from '../../types/security.types';
import { createHmac } from 'crypto';

export class RequestSigner {
  static sign(payload: any): RequestSignature {
    const timestamp = Date.now().toString();
    const nonce = crypto.randomUUID();
    
    const message = `${timestamp}.${nonce}.${JSON.stringify(payload)}`;
    const signature = createHmac('sha256', securityConfig.signingSecret)
      .update(message)
      .digest('hex');

    return { timestamp, signature, nonce };
  }

  static verify(signature: RequestSignature, payload: any): boolean {
    const message = `${signature.timestamp}.${signature.nonce}.${JSON.stringify(payload)}`;
    const computedSignature = createHmac('sha256', securityConfig.signingSecret)
      .update(message)
      .digest('hex');

    return computedSignature === signature.signature;
  }
}
