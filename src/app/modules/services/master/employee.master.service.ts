import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from '../../../../environments/environment';
import { Employee } from '../../models/employee/employee';

const API_URL = environment.apiUrl;




@Injectable({
  providedIn: "root"
})
export class EmployeeMasterService {

  constructor(private _httpClient: HttpClient) { }

  addEmployee(element: any) {
    debugger;
    console.log(element);
    return this._httpClient.post(API_URL + "Employee/CreateEmployee", element)
      .pipe(catchError(this.handleError));
  } 

  addEmployeeWithPhoto(element: any) {
    debugger;
    console.log(element);
    return this._httpClient.post(API_URL + "Employee/CreateEmployeeWithPhoto", element)
      .pipe(catchError(this.handleError));
  } 

  modifyEmployee(element) {
    return this._httpClient.post(API_URL + "Employee/UpdateEmployee", element)
      .pipe(catchError(this.handleError));
  }

  modifyEmployeeWithPhoto(element) {
    return this._httpClient.post(API_URL + "Employee/UpdateEmployee", element)
      .pipe(catchError(this.handleError));
  }

  getAllEmployee(element) {
    return this._httpClient.post(API_URL + "Employee/GetAllEmployees", element)
      .pipe(catchError(this.handleError));
  }
  removeEmployee(element) {
    debugger;
    return this._httpClient.post(API_URL + "Employee/RemoveEmployee", element)
      .pipe(catchError(this.handleError));
  }

  addBank(element) {
    return this._httpClient
      .post(API_URL + "Employee/CreateEmployeeBankDtl", element)
      .pipe(catchError(this.handleError));
  }
  modifyBank(element) {
    return this._httpClient
      .post(API_URL + "Employee/UpdateEmployeeBankDtl", element)
      .pipe(catchError(this.handleError));
  }

  getBankDetail(obj) {
    return this._httpClient
      .post(API_URL + "Employee/GetEmployeeBankDtlById", obj)
      .pipe(catchError(this.handleError));
  }

  removebank(element) {
    return this._httpClient
      .post(API_URL + "Employee/RemoveEmployeeBankDtl", element)
      .pipe(catchError(this.handleError));
  }
  getCompany(element?: any) {
    debugger;
    return this._httpClient
      .get(API_URL + "Company/AllCompany", element)
      .pipe(catchError(this.handleError));
  }

  getDesignationById(element) {
    debugger;
    return this._httpClient
      .get(API_URL + "Designation/AllDesignations/" + element)
      .pipe(catchError(this.handleError));
  }


  getState(element) {
    debugger;
    return this._httpClient
      .get(API_URL + "State/AllState", element)
      .pipe(catchError(this.handleError));
  }

  getCity(element?: any) {
    return this._httpClient
      .get(API_URL + "City/GetCityByStateId/" + element)
      .pipe(catchError(this.handleError));
  }
  
  getReport(element): Observable<any> {
    return this._httpClient.post<any>(API_URL + "Target/GetAllEmployeeByReportTo", element)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error instanceof ErrorEvent) {
      console.log("Client side={0}", error.message);
    } else {
      console.log("Server side={0}", error.message);
    }
    return throwError(error);
  }
}
