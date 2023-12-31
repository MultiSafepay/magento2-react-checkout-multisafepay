import { useContext } from 'react';

import AppContext from '@hyva/react-checkout/context/App/AppContext';

export default function useMultiSafepayAppContext() {
  const [
    { isLoggedIn, checkoutAgreements },
    { setErrorMessage, setPageLoader },
  ] = useContext(AppContext);

  return {
    isLoggedIn,
    setPageLoader,
    setErrorMessage,
    checkoutAgreements,
  };
}
