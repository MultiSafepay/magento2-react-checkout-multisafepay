import { shape, string } from 'prop-types';
import { get } from 'lodash';
import { config } from '@hyva/react-checkout/config';

export const paymentMethodShape = shape({ title: string, code: string });

export function fetchRedirectToken() {
  const cryptoObject = window.crypto || window.msCrypto;

  if (cryptoObject && typeof cryptoObject.randomUUID === 'function') {
    return cryptoObject.randomUUID().replace(/-/g, '');
  }

  if (cryptoObject && typeof cryptoObject.getRandomValues === 'function') {
    const bytes = new Uint8Array(16);
    cryptoObject.getRandomValues(bytes);

    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  throw new Error('Secure redirect token generation is unavailable in this environment.');
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
