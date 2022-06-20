import { useInjection } from 'inversify-react';
import Bindings from '../containers/global.bindings';
import { UIStoreType } from '../stores/types';

/**
 * Hook to get the global instance of UIStore
 */

export default function useUIStore(): UIStoreType {
  return useInjection<UIStoreType>(Bindings.UIStore);
}
