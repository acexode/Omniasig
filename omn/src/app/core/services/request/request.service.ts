import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  /**
   * GET wrapper.
   *
   * @param endpoint - Full path.
   */
  get<T>(endpoint: string): Observable<T> {
    let token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aWJlcml1LmlvbmVzY3VAc29mdGVzY3UuY29tIiwianRpIjoiNTM3NTY3ODYtMWNiMi00MzE0LTkwMWEtNTAxMTRmMDMzZjQ1IiwidW5pcXVlX25hbWUiOiIwNzMzNjg3MzMyIiwiQXBpQ2VudGVyL1Blcm1pc3Npb24iOlsiQ2xpZW50aVJlc2V0YXJlUGFzc2NvZGUiLCJDbGllbnRpUmV2YWxpZGFyZUVtYWlsIiwiQ2xpZW50aVJldmFsaWRhcmVUZWxlZm9uIl0sImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6Ik1vYmlsZVVzZXIiLCJleHAiOjE1OTg0MzYzMDYsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6Im9tbmlhc2lnLmNvbSJ9.ic66FlW4vuWHu5r_cD1s2GDb8AzxmyNZxiYyBQWovj8"
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': token })
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
    return this.http.post<T>(endpoint, data);
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
