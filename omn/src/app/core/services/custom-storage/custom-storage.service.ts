import { Injectable } from '@angular/core';
import {
  SecureStorage,
  SecureStorageObject,
} from '@ionic-native/secure-storage/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { CustomMemoryStorage } from './custom-memory-storage';

@Injectable({
  providedIn: 'root',
})
export class CustomStorageService {
  secureStorageInitSuccess: BehaviorSubject<boolean> = new BehaviorSubject(
    null
  );
  storageInitSuccess: BehaviorSubject<boolean> = new BehaviorSubject(null);
  secureStorageInstance: SecureStorageObject;
  constructor(
    private storage: Storage,
    private secureStorage: SecureStorage,
    private platform: Platform
  ) {
    this.initStorage();
  }

  private initStorage() {
    this.storage.ready().then(() => {
      console.log(this.storage.driver);
      this.storageInitSuccess.next(true);
    });
    this.platform.ready().then(() => {
      const conn = this.secureStorage.create('omniasig_secure');
      if (conn instanceof Promise) {
        conn
          .then((storage: SecureStorageObject) => {
            this.secureStorageInstance = storage;
            this.secureStorageInitSuccess.next(true);
          })
          .catch((err) => {
            // Default to not storing secure data.
            console.log('mem-storage');
            this.secureStorageInstance = new CustomMemoryStorage();
            this.secureStorageInitSuccess.next(true);
          });
      } else {
        // Default to not storing secure data.
        console.log('mem-storage');
        this.secureStorageInstance = new CustomMemoryStorage();
        this.secureStorageInitSuccess.next(true);
      }
    });
  }

  private waitStorageBeforeOp(opObs: Observable<any>) {
    return this.storageInitSuccess.asObservable().pipe(
      filter((vv) => {
        return vv !== null;
      }),
      switchMap((ss) => {
        return opObs;
      }),
      take(1)
    );
  }

  private waitSecStorageBeforeOp(opObs: Observable<any>) {
    return this.secureStorageInitSuccess.asObservable().pipe(
      filter((vv) => {
        return vv !== null;
      }),
      switchMap((ss) => {
        return opObs;
      }),
      take(1)
    );
  }

  public getItem<T>(key: string): Observable<T> {
    return this.waitStorageBeforeOp(from(this.storage.get(key)));
  }

  public setItem<T>(key: string, data: T): Observable<T> {
    return this.waitStorageBeforeOp(from(this.storage.set(key, data)));
  }

  public removeItem(key: string) {
    return this.waitStorageBeforeOp(from(this.storage.remove(key)));
  }

  public keys(): Observable<string[]> {
    return this.waitStorageBeforeOp(from(this.storage.keys()));
  }

  public clear(): Observable<void> {
    return this.waitStorageBeforeOp(from(this.storage.clear()));
  }

  public getSecureItem<T>(key: string): Observable<T> {
    return this.waitSecStorageBeforeOp(
      from(this.secureStorageInstance.get(key))
    );
  }

  public setSecureItem<T>(key: string, data: string): Observable<T> {
    return this.waitSecStorageBeforeOp(
      from(this.secureStorageInstance.set(key, data))
    );
  }

  public removeSecureItem(key: string): Observable<boolean> {
    return this.waitSecStorageBeforeOp(
      from(this.secureStorageInstance.remove(key))
    );
  }
}
