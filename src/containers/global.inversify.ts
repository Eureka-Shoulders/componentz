import { Container } from 'inversify';
import UIStore from '../stores/UIStore';
import Bindings from './global.bindings';

/**
 * container that holds all the stores and should be used on inversify provider
 *
 * @exemple ```typescript
 * import globalContainer from "@euk-labs/componentz";
 *
 *  function MyApp({ Component, pageProps }) {
 *    return (
 *      <Provider container={globalContainer}>
 *          <CssBaseline />
 *          <Component {...pageProps} />
 *      </Provider>
 *    );
 *  }
 * ```
 *
 */

export default function globalContainer() {
  const container = new Container();

  container.bind(Bindings.UIStore).to(UIStore).inSingletonScope();

  return container;
}
