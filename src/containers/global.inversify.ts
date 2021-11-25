import { Container } from 'inversify';
import TYPES from './global.types';
import UIStore from '../stores/UIStore';

export default function globalContainer() {
  const container = new Container();

  container.bind(TYPES.UIStore).to(UIStore).inSingletonScope();

  return container;
}
