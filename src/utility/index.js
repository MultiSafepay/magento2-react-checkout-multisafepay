import { shape, string } from 'prop-types';
import { get } from 'lodash';
import { config } from '@hyva/react-checkout/config';

export const paymentMethodShape = shape({ title: string, code: string });

export function generateRedirectToken() {
  const runtimeCrypto =
    typeof globalThis !== 'undefined' ? globalThis.crypto : undefined;

  if (runtimeCrypto?.randomUUID) {
    return runtimeCrypto.randomUUID().replace(/-/g, '');
  }

  if (runtimeCrypto?.getRandomValues) {
    const bytes = new Uint8Array(16);
    runtimeCrypto.getRandomValues(bytes);

    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  throw new Error('Unable to generate secure redirect token');
}

export function performRedirect(order, redirectToken = '') {
  const orderNumber = get(order, 'order_number');

  if (orderNumber) {
    const baseRedirectUrl = `${config.baseUrl}/multisafepay/connect/redirect/`;
    const redirectUrl = redirectToken
      ? `${baseRedirectUrl}?token=${encodeURIComponent(redirectToken)}`
      : baseRedirectUrl;

    window.location.replace(redirectUrl);
  }
}
