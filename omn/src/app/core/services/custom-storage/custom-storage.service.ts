import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomStorageService {
  constructor(private storage: Storage) {}

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
}
