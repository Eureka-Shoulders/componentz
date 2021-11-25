import { useInjection } from 'inversify-react';
import TYPES from '../containers/global.types';
import { UIStoreType } from '../stores/types';

export default function useUIStore() {
  return useInjection<UIStoreType>(TYPES.UIStore);
}
