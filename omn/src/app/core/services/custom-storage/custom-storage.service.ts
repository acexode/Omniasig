import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  SecureStorage,
  SecureStorageObject,
} from '@ionic-native/secure-storage/ngx';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CustomMemoryStorage } from './custom-memory-storage';

@Injectable({
  providedIn: 'root',
})
export class CustomStorageService {
  secureStorageInitSuccess: BehaviorSubject<boolean> = new BehaviorSubject(
    null
  );
  secureStorageInstance: SecureStorageObject;
  constructor(
    private storage: Storage,
    private secureStorage: SecureStorage,
    private platform: Platform
  ) {
    this.initStorage();
  }

  private initStorage() {
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
  public getItem<T>(key: string): Observable<T> {
    return from(this.storage.get(key));
  }
  public setItem<T>(key: string, data: T): Observable<T> {
    return from(this.storage.set(key, data));
  }

  public removeItem(key: string) {
    this.storage.remove(key);
  }

  public keys(): Observable<string[]> {
    return from(this.storage.keys());
  }

  public clear(): Observable<void> {
    return from(this.storage.clear());
  }

  public getSecureItem<T>(key: string): Observable<T> {
    console.log(this.secureStorageInitSuccess);
    return this.secureStorageInitSuccess.pipe(
      filter((vv) => {
        return vv !== null;
      }),
      switchMap((ss) => {
        console.log(key);
        console.log(this.secureStorageInstance);
        if (ss) {
          console.log(Promise.resolve(this.secureStorageInstance.get(key)));
          return from(this.secureStorageInstance.get(key)).pipe(
            tap((v) => {
              console.log(v);
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  public setSecureItem<T>(key: string, data: string): Observable<T> {
    return this.secureStorageInitSuccess.pipe(
      filter((vv) => {
        return vv !== null;
      }),
      switchMap((ss) => {
        if (ss) {
          console.log(data);
          return from(this.secureStorageInstance.set(key, data));
        } else {
          return of(false);
        }
      })
    );
  }

  public removeSecureItem(key: string): Observable<boolean> {
    return this.secureStorageInitSuccess.pipe(
      filter((vv) => {
        return vv !== null;
      }),
      switchMap((ss) => {
        if (ss) {
          return from(this.secureStorageInstance.remove(key));
        } else {
          return of(false);
        }
      }),
      map((sv) => {
        return !!sv;
      })
    );
  }
}
