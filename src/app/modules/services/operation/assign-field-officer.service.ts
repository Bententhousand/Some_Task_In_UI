import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from '../../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AssignFieldOfficerService {

  constructor(private _httpClient: HttpClient) { }

  addFieldOfficer(element?): Observable<string> {
    return this._httpClient.post<string>(API_URL + "AssignFieldOfficer/CreateAssignFieldOfficer", element)
      .pipe(catchError(this.handleError));
  }

  removeFieldOfficer(element?): Observable<string> {
    return this._httpClient.post<string>(API_URL + "AssignFieldOfficer/RemoveAssignFieldOfficer", element)
      .pipe(catchError(this.handleError));
  }

  getEmployees(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "AssignFieldOfficer/getAllEmployeeList", element)
      .pipe(catchError(this.handleError));
  }

  getFieldOfficer(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "AssignFieldOfficer/getAllFieldOfficer", element)
      .pipe(catchError(this.handleError));
  }

  getCustomers(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "AssignManpower/getAllCustomer", element)
      .pipe(catchError(this.handleError));
  }

  getArea(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "AssignFieldOfficer/getAllBranch", element)
      .pipe(catchError(this.handleError));
  }

  getSite(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "AssignFieldOfficer/getAllSite", element)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
