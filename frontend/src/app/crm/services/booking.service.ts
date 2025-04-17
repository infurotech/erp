// src/app/services/property.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = '/api/booking';

  constructor(private http: HttpClient) {}

  getAllBookins(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getBookingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBooking(property: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, property);
  }

  updateBooking(id: number, property: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, property);
  }

  bulkUploadBooking(properties: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bulk`, properties);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
