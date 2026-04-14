import { shape, string } from 'prop-types';
import { get } from 'lodash';
import { config } from '@hyva/react-checkout/config';

export const paymentMethodShape = shape({ title: string, code: string });

export function generateRedirectToken() {
  if (window.crypto && window.crypto.getRandomValues) {
    const bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);

    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  return (Date.now().toString(16) + Math.random().toString(16).slice(2))
    .replace('.', '')
    .slice(0, 32)
    .padEnd(32, '0');
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
