import { UIStoreType } from '@stores/UIStore';
import { useInjection } from 'inversify-react';
import Bindings from '../containers/global.bindings';

/**
 * Hook to get the global instance of UIStore
 */

export default function useUIStore(): UIStoreType {
  return useInjection<UIStoreType>(Bindings.UIStore);
}
