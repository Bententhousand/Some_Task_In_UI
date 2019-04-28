import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from '../../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class ContractDetailService {

  constructor(private _httpClient: HttpClient) { }

  addContractDetail(element) {
    return this._httpClient
      .post(API_URL + "ContractDetails/CreateContractDetail", element)
      .pipe(catchError(this.handleError));
  }
  modifyContractDetail(element) {
    return this._httpClient
      .post(API_URL + "ContractDetails/UpdateContractDetail", element)
      .pipe(catchError(this.handleError));
  }
  getAllContractDetail(element) {
    return this._httpClient
      .post(API_URL + "ContractDetails/GetAllContractDetails", element)
      .pipe(catchError(this.handleError));
  }
  getAllContractDetailById(element) {
    return this._httpClient
      .post(API_URL + "ContractDetails/GetContractDetailById", element)
      .pipe(catchError(this.handleError));
  }
  removeContractDetail(element) {
    return this._httpClient
      .post(API_URL + "ContractDetails/RemoveContractDetail", element)
      .pipe(catchError(this.handleError));
  }
  addConsume(element) {
    return this._httpClient
      .post(API_URL + "ContractDetails/CreateConsumeRequirement", element)
      .pipe(catchError(this.handleError));
  }
  modifyConsume(element) {
    return this._httpClient
      .post(API_URL + "ContractDetails/UpdateConsumeRequirement", element)
      .pipe(catchError(this.handleError));
  }
  getAllConsumeById(element) {
    return this._httpClient
      .post(API_URL + "ContractDetails/GetAllConsumeById", element)
      .pipe(catchError(this.handleError));
  }
  getDesignation(element) {
    return this._httpClient
      // .post(API_URL + "Designation/GetDesignationByStatusId", element)
      .get(API_URL + "Designation/GetDesigByDepId/" + element)
      .pipe(catchError(this.handleError));
  }
  getService(element) {

    return this._httpClient
      // .post(API_URL + "ServiceMaster/GetAllServices", element)
      .get(API_URL + "Department/AllCompany_Department")
      .pipe(catchError(this.handleError));
  }
  getAllSuccessCustomer(element) {
    return this._httpClient
      .post(API_URL + "ContractMaster/GetAllContractMasters", element)
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
