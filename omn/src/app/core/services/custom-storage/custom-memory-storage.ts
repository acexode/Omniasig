import { SecureStorageObject } from '@ionic-native/secure-storage/ngx';

export class CustomMemoryStorage extends SecureStorageObject {
  private memoryInstance: { [key: string]: string } = {};
  constructor() {
    super({});
    this.memoryInstance = {};
  }

  get(key: string) {
    return Promise.resolve(this.memoryInstance[key]);
  }

  set(key: string, value: string) {
    this.memoryInstance[key] = value;
    return Promise.resolve(value);
  }
  remove(key: string) {
    delete this.memoryInstance[key];
    return Promise.resolve(key);
  }
}
