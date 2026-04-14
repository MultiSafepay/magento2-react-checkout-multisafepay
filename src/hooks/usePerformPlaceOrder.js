import { useCallback } from 'react';
import { get, set } from 'lodash';
import { __ } from '@hyva/react-checkout/i18n';
import { LOGIN_FORM } from '@hyva/react-checkout/config';
import { generateRedirectToken, performRedirect } from '../utility';
import useMultiSafepayAppContext from './useMultiSafepayAppContext';
import useMultiSafepayCartContext from './useMultiSafepayCartContext';

export default function usePerformPlaceOrder(paymentMethodCode) {
  const { cartId, setRestPaymentMethod, setOrderInfo } =
    useMultiSafepayCartContext();
  const { isLoggedIn, setPageLoader, setErrorMessage } =
    useMultiSafepayAppContext();

  return useCallback(
    async (values, additionalData = {}) => {
      try {
        const redirectToken = generateRedirectToken();

        const paymentMethodData = {
          paymentMethod: {
            method: paymentMethodCode,
            additional_data: {
              ...additionalData,
              redirect_token: redirectToken,
            },
          },
        };
        const email = get(values, `${LOGIN_FORM}.email`);

        if (!isLoggedIn) {
          set(paymentMethodData, 'email', email);
        } else {
          set(paymentMethodData, 'cartId', cartId);
        }

        setPageLoader(true);
        const order = await setRestPaymentMethod(paymentMethodData, isLoggedIn);

        if (order) {
          setOrderInfo(order);
        }

        setPageLoader(false);
        performRedirect(order, redirectToken);
      } catch (error) {
        console.error(error);
        setErrorMessage(
          __(
            'This transaction could not be performed. Please select another payment method.'
          )
        );
        setPageLoader(false);
      }
    },
    [
      cartId,
      isLoggedIn,
      setOrderInfo,
      setPageLoader,
      setErrorMessage,
      paymentMethodCode,
      setRestPaymentMethod,
    ]
  );
}
