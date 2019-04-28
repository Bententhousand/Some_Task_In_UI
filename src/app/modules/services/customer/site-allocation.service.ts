import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from '../../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SiteAllocationService {


  constructor(private _httpClient: HttpClient) { }

  addSiteAllocation(element) {
    debugger;
    return this._httpClient.post(API_URL + "SiteMapping/CreateSiteAllocation", element)
      .pipe(catchError(this.handleError));
  }

  getAllSiteAllocation(element?: any) {
    return this._httpClient.post(API_URL + "SiteMapping/getAllSiteAllocation", element)
      .pipe(catchError(this.handleError));
  }

  getCustomer(element?: any) {
    return this._httpClient.post(API_URL + "SiteMapping/getAllCustomer", element)
      .pipe(catchError(this.handleError));
  }
  getBranch(element?: any) {
    return this._httpClient.post(API_URL + "SiteMapping/getBranch", element)
      .pipe(catchError(this.handleError));
  }
  getSite(element?: any) {
    return this._httpClient.post(API_URL + "SiteMapping/getSite", element)
      .pipe(catchError(this.handleError));
  }
  getClassification(element?: any) {
    return this._httpClient.post(API_URL + "SiteMapping/getClassification", element)
      .pipe(catchError(this.handleError));
  }
  getService(element) {
    return this._httpClient
      .post(API_URL + "SiteMapping/getService", element)
      // .get(API_URL + "Designation/AllDesignations/")
      .pipe(catchError(this.handleError));
  }
  getmanpowerList(element) {
    debugger;
    return this._httpClient.post(API_URL + "SiteMapping/getManpowerList", element)
      .pipe(catchError(this.handleError));
  }
  removeSiteAllocation(element?) {
    return this._httpClient.post(API_URL + "SiteMapping/removeSiteAllocation", element)
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
