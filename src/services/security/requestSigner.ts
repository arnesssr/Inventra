import { securityConfig } from '../../config/securityConfig';
import type { RequestSignature } from '../../types/security.types';

export class RequestSigner {
  private static async generateHash(message: string): Promise<string> {
    // Using SubtleCrypto for browser-safe HMAC
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const key = encoder.encode(securityConfig.signatureSecret);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  static async sign(payload: any): Promise<RequestSignature> {
    const timestamp = Date.now().toString();
    const nonce = crypto.randomUUID();
    const message = `${timestamp}.${nonce}.${JSON.stringify(payload)}`;
    
    const signature = await this.generateHash(message);

    return {
      signature,
      timestamp,
      nonce
    };
  }

  static async verify(signature: RequestSignature, payload: any): Promise<boolean> {
    const message = `${signature.timestamp}.${signature.nonce}.${JSON.stringify(payload)}`;
    const computedSignature = await this.generateHash(message);
    
    return computedSignature === signature.signature;
  }
}
