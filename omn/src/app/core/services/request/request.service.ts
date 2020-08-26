import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomStorageService } from '../custom-storage/custom-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private storeS: CustomStorageService) {
    this.setHeaderWithToken();
  }

  private setHeaderWithToken() {
    this.storeS.getItem('token').subscribe((token: string) => {
    if (token) {
      this.headers = new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      });
    } else {
      this.headers = new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: null,
      });
    }
    });
    console.log(this.headers);
    
  }



  /**
   * GET wrapper.
   *
   * @param endpoint - Full path.
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(endpoint, { headers: this.headers });
  }

  /**
   * DELETE wrapper.
   *
   * @param endpoint - Full path.
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(endpoint, { headers: this.headers });
  }

  /**
   * POST wrapper.
   *
   * @param endpoint - Full path.
   * @param data - Post data.
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(endpoint, data, { headers: this.headers });
  }

  /**
   * PUT wrapper.
   *
   * @param endpoint - Full path.
   * @param data - Put data.
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(endpoint, data, { headers: this.headers });
  }

  /**
   * PATCH wrapper.
   *
   * @param endpoint - Full path.
   * @param data - Patch data.
   */
  patch<T>(endpoint: string, data: any): Observable<T> {
    return this.http.patch<T>(endpoint, data, { headers: this.headers });
  }
}
