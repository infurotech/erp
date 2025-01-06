import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerService {
    private apiUrl = '/api/customers';

    constructor(private _httpClient: HttpClient) {}

    getCustomers(): Observable<any> {
       return this._httpClient.get(this.apiUrl);
    }

    createCustomer(customer: any): Observable<any> {
       return this._httpClient.post(this.apiUrl,customer);
    }

    updateCustomer(updatedCustomer:any, index:number): Observable<any> {
        const updateUrl = `${this.apiUrl}/${index}`;
        return this._httpClient.put(updateUrl,updatedCustomer);
    }

    deleteCustomer(requestArray:any): Observable<any> {
        const deleteUrl = `${this.apiUrl}/multiple`;
        return this._httpClient.delete(deleteUrl, { body : { indexes: requestArray } });
    }

    getFieldsData(queryParams: string): Observable<any> {
        const requestUrl = `${this.apiUrl}/list?columns=${queryParams}`;
        return this._httpClient.get(requestUrl);
    }


    createBulkCustomers(bulkCustomers:any): Observable<any> {
        const bulkUrl = `${this.apiUrl}/bulk`;
        return this._httpClient.post(bulkUrl,bulkCustomers);
    }
    
};