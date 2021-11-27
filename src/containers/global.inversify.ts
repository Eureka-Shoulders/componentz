import { Container } from 'inversify';
import UIStore from '../stores/UIStore';
import TYPES from './global.types';

export default function globalContainer() {
  const container = new Container();

  container.bind(TYPES.UIStore).to(UIStore).inSingletonScope();

  return container;
}
