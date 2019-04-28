import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from '../../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CustomerAssignService {

  constructor(private _httpClient: HttpClient) { }

  addContractMaster(element?): Observable<any> {
    return this._httpClient.post<any>(API_URL + "CustomerAssign/CreateContractMaster", element)
      .pipe(catchError(this.handleError));
  }

  updateContractMaster(element?): Observable<any> {
    return this._httpClient.post<any>(API_URL + "CustomerAssign/UpdateContractMaster", element)
      .pipe(catchError(this.handleError));
  }
  removeContractMaster(element?): Observable<any> {
    return this._httpClient.post<any>(API_URL + "  CustomerAssign/RemoveContractMasterById", element)
      .pipe(catchError(this.handleError));
  }

  getAllContractMaster(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "CustomerAssign/GetAllContractMasters")
      .pipe(catchError(this.handleError));
  }

  getAllCustomer(element?:any) {
    return this._httpClient.post(API_URL + "Customer/GetAllCustomers", element)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
