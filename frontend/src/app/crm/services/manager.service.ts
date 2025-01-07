import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ManagerService {
    constructor(private httpClient: HttpClient) {}

    getUserNameList(queryParams: string) : Observable<any> {
       return this.httpClient.get(`api/users/list?columns=${queryParams}`);
    }
}