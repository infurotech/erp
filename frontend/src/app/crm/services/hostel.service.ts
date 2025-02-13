// src/app/services/property.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HostelService {
  private apiUrl = '/api/properties';

  constructor(private http: HttpClient) {}

  getAllProperties(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPropertyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createProperty(property: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, property);
  }

  updateProperty(id: number, property: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, property);
  }

  bulkUploadProperty(properties: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bulk`, properties);
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
