import { AsyncLocalStorage } from 'async_hooks';

const storage = new AsyncLocalStorage<Map<string, any>>();

export class RequestContext {
  static set(key: string, value: any) {
    const store = storage.getStore() || new Map();
    store.set(key, value);
    storage.enterWith(store);
  }

  static get(key: string): any {
    return storage.getStore()?.get(key);
  }
}
