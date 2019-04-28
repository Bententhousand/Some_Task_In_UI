import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from '../../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CustomerSiteMappingService {

  constructor(private _httpClient: HttpClient) { }

  addBranch(element) {
    return this._httpClient.post(API_URL + "CustomerSiteMapping/CreateBranch", element)
      .pipe(catchError(this.handleError));
  }
  addSite(element) {
    return this._httpClient.post(API_URL + "CustomerSiteMapping/CreateSite", element)
      .pipe(catchError(this.handleError));
  }
  addClassification(element) {
    return this._httpClient.post(API_URL + "CustomerSiteMapping/CreateClassfication", element)
      .pipe(catchError(this.handleError));
  }

  getCustomer(element?: any) {
    return this._httpClient.post(API_URL + "Customer/GetAllSuccessCustomers", element)
      .pipe(catchError(this.handleError));
  }
  getBranch(element?: any) {
    return this._httpClient.post(API_URL + "CustomerSiteMapping/getBranch", element)
      .pipe(catchError(this.handleError));
  }
  getSite(element?: any) {
    return this._httpClient.post(API_URL + "CustomerSiteMapping/getSite", element)
      .pipe(catchError(this.handleError));
  }
  getClassification(element?: any) {
    return this._httpClient.post(API_URL + "SiteMapping/getClassification", element)
      .pipe(catchError(this.handleError));
  }
  removeBranch(element?) {
    return this._httpClient.post(API_URL + "CustomerSiteMapping/removeBranch", element)
      .pipe(catchError(this.handleError));
  }
  removeSite(element?) {
    return this._httpClient.post(API_URL + "CustomerSiteMapping/removeSite", element)
      .pipe(catchError(this.handleError));
  }
  removeClassification(element?) {
    return this._httpClient.post(API_URL + "CustomerSiteMapping/removeClassification", element)
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
