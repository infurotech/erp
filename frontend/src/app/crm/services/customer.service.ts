import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManagerService } from './manager.service';

@Injectable()
export class CustomerService {
    private apiUrl = '';

    constructor(private _httpClient: HttpClient, private managerService: ManagerService) {}

    setEndPoint(url: any) {
        this.apiUrl = url;
    }

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
        return this._httpClient.delete(deleteUrl, { body : { ids: requestArray } });
    }

    getCustomerById(id: number): Observable<any> {
        const getUrl  =  `${this.apiUrl}/${id}`;
        return this._httpClient.get(getUrl);
     }

    getFieldsData(queryParams: string): Observable<any> {
        const requestUrl = `${this.apiUrl}/list?columns=${queryParams}`;
        return this._httpClient.get(requestUrl);
    }

    createBulkCustomers(bulkCustomers:any): Observable<any> {
        const bulkUrl = `${this.apiUrl}/bulk`;
        return this._httpClient.post(bulkUrl,bulkCustomers);
    }
    
    getAdminNameList(queryParams:string) : Observable<any> {
        return this.managerService.getUserNameList(queryParams);
    }

    getVehicles() {
        return this._httpClient.get('/api/vehicles');
    }
};