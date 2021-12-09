import { useInjection } from 'inversify-react';
import TYPES from '../containers/global.types';
import { UIStoreType } from '../stores/types';

/**
 * Hook to get the UIStore
 */

export default function useUIStore(): UIStoreType {
  return useInjection<UIStoreType>(TYPES.UIStore);
}
