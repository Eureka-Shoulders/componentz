/**
 * The types that represents the contract of the global UI state.
 *
 * Should be used on inversify hook to get a instance of the global UI state
 */
const TYPES = {
  UIStore: Symbol('UIStore'),
};

export default TYPES;
