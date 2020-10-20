import { SecureStorageObject } from '@ionic-native/secure-storage/ngx';

export class CustomMemoryStorage extends SecureStorageObject {
  private memoryInstance: { [key: string]: string } = {};
  constructor() {
    super({});
    this.memoryInstance = {};
  }
  /**
   * Gets a stored item
   * @param key {string}
   * @returns {Promise<string>}
   */
  get(key: string) {
    return Promise.resolve(this.memoryInstance[key]);
  }
  /**
   * Stores a value
   * @param key {string}
   * @param value {string}
   * @returns {Promise<any>}
   */
  set(key: string, value: string) {
    this.memoryInstance[key] = value;
    return Promise.resolve(value);
  }
  /**
   * Removes a single stored item
   * @param key {string}
   * @returns {Promise<string>} returns a promise that resolves with the key that was removed
   */
  remove(key: string) {
    delete this.memoryInstance[key];
    return Promise.resolve(key);
  }
}
