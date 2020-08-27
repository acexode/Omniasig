import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomStorageService } from '../custom-storage/custom-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient, private storeS: CustomStorageService) {}

  /**
   * GET wrapper.
   *
   * @param endpoint - Full path.
   */
  get<T>(endpoint: string): Observable<T> {
    let token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvY2pib3Njb0BnbWFpbC5jb20iLCJqdGkiOiIwODY4MjYwOS1iMjUzLTQ0ZjUtODJiMy1kZGU2ODI3YjNjZjYiLCJ1bmlxdWVfbmFtZSI6IjA3MzM2ODczMzIiLCJBcGlDZW50ZXIvUGVybWlzc2lvbiI6WyJDbGllbnRpUmVzZXRhcmVQYXNzY29kZSIsIkNsaWVudGlSZXZhbGlkYXJlRW1haWwiLCJDbGllbnRpUmV2YWxpZGFyZVRlbGVmb24iXSwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiTW9iaWxlVXNlciIsImV4cCI6MTU5ODUyMDYxMSwiaXNzIjoibG9jYWxob3N0IiwiYXVkIjoib21uaWFzaWcuY29tIn0.rqXQGjL7J99PN8lHWA7byniUyGoUOVuK-eap35bAa10"
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    };
    return this.http.get<T>(endpoint,httpOptions );
  }

  /**
   * DELETE wrapper.
   *
   * @param endpoint - Full path.
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(endpoint);
  }

  /**
   * POST wrapper.
   *
   * @param endpoint - Full path.
   * @param data - Post data.
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    let token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvY2pib3Njb0BnbWFpbC5jb20iLCJqdGkiOiIwODY4MjYwOS1iMjUzLTQ0ZjUtODJiMy1kZGU2ODI3YjNjZjYiLCJ1bmlxdWVfbmFtZSI6IjA3MzM2ODczMzIiLCJBcGlDZW50ZXIvUGVybWlzc2lvbiI6WyJDbGllbnRpUmVzZXRhcmVQYXNzY29kZSIsIkNsaWVudGlSZXZhbGlkYXJlRW1haWwiLCJDbGllbnRpUmV2YWxpZGFyZVRlbGVmb24iXSwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiTW9iaWxlVXNlciIsImV4cCI6MTU5ODUyMDYxMSwiaXNzIjoibG9jYWxob3N0IiwiYXVkIjoib21uaWFzaWcuY29tIn0.rqXQGjL7J99PN8lHWA7byniUyGoUOVuK-eap35bAa10"
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    };
    return this.http.post<T>(endpoint, data,httpOptions);
  }

  /**
   * PUT wrapper.
   *
   * @param endpoint - Full path.
   * @param data - Put data.
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(endpoint, data);
  }

  /**
   * PATCH wrapper.
   *
   * @param endpoint - Full path.
   * @param data - Patch data.
   */
  patch<T>(endpoint: string, data: any): Observable<T> {
    return this.http.patch<T>(endpoint, data);
  }
}
