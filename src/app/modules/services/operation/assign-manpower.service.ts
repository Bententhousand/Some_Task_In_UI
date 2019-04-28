import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from '../../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AssignManpowerService {

  constructor(private _httpClient: HttpClient) { }

  addAssignManpower(element?): Observable<string> {
    return this._httpClient.post<string>(API_URL + "AssignManpower/CreateManpower", element)
      .pipe(catchError(this.handleError));
  }

  removeAssignManpower(element?): Observable<string> {
    return this._httpClient.post<string>(API_URL + "AssignManpower/RemoveAssignManpower", element)
      .pipe(catchError(this.handleError));
  }

  getCustomers(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "AssignManpower/GetContractByAllCustomer", element)
      .pipe(catchError(this.handleError));
  }

  getArea(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "AssignManpower/GetAllBranch", element)
      .pipe(catchError(this.handleError));
  }

  getSite(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "AssignManpower/GetAllSite", element)
      .pipe(catchError(this.handleError));
  }

  getAssignManpowers(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "AssignManpower/getAllAssignManpower", element)
      .pipe(catchError(this.handleError));
  }

  getClassification(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "AssignManpower/GetAllClassification", element)
      .pipe(catchError(this.handleError));
  }

  getService(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "AssignManpower/GetAllService", element)
      .pipe(catchError(this.handleError));
  }

  getManpower(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "AssignManpower/GetAllManpowerList", element)
      .pipe(catchError(this.handleError));
  }

  getStateMaster(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "AssignManpower/GetAllClassification", element)
      .pipe(catchError(this.handleError));
  }

  // getPayment(): Observable<any> {
  //   return this._httpClient.get<any>("TestingController/TestingMethod")
  //     .pipe(catchError(this.handleError));
  // }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
