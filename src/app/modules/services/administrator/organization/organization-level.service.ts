import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { environment } from '../../../../../environments/environment';
import { HeaderStorageService } from '../../../../shared/header-storage.service';
import { catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable()
export class OrganizationlevelService {
  orgValue: any;
  isEditing: boolean;

  constructor(private _http: Http, private _httpClient: HttpClient, private _headerStorage: HeaderStorageService) { }


  // setIsEditing(value: boolean) {
  //   this.isEditing = value
  // }
  // getIsEditing() {
  //   return this.isEditing;
  // }

  saveOrganizationLevel(element): Observable<string> {
    return this._httpClient.post<string>(API_URL + "OrganizationLevel/Create", element)
      .pipe(catchError(this.handleError));
  }

  // saveOrganizationLevel(element) {
  //   debugger;
  //   const headers = new Headers();
  //   headers.append('Token', this._headerStorage.getToken());
  //   return this._http.post(API_URL + 'OrganizationLevel/Create', element, { headers: headers }).map(response => {
  //     return response;
  //   }).catch(
  //     this.handleError
  //   );
  // }

  updateOrganizationLevel(element): Observable<string> {
    return this._httpClient.put<string>(API_URL + "OrganizationLevel/Modify", element)
      .pipe(catchError(this.handleError));
  }

  // updateOrganizationLevel(element) {
  //   debugger
  //   const headers = new Headers();
  //   headers.append('Token', this._headerStorage.getToken());
  //   return this._http.put(API_URL + 'OrganizationLevel/Modify', element, { headers: headers }).map(response => {
  //     return response;
  //   }).catch(
  //     this.handleError
  //   );
  // }

  listOrganizationLevel(): Observable<any> {
    return this._httpClient.get<any>(API_URL + "OrganizationLevel/AllOrganizationLevel")
      .pipe(catchError(this.handleError));
  }

  // listOrganizationLevel(): Observable<any> {
  //   debugger;
  //   const headers = new Headers();
  //   headers.append('Token', this._headerStorage.getToken());
  //   const dataUrl = API_URL + 'OrganizationLevel/AllOrganizationLevel';
  //   return this._http.get(dataUrl, { headers: headers })
  // }

  removeOrg(element): Observable<any> {
    return this._httpClient.delete<any>(API_URL + "OrganizationLevel/Delete/" + element.OrganizationLevelId)
      .pipe(catchError(this.handleError));
  }

  // removeOrg(Id): Observable<any> {
  //   debugger;
  //   const headers = new Headers();
  //   headers.append('Token', this._headerStorage.getToken());
  //   const orglevel = new OrganizationLevel()
  //   orglevel.OrganizationLevelId = Id.OrganizationLevelId
  //   const dataUrl = API_URL + 'OrganizationLevel/Delete/' + Id.OrganizationLevelId;
  //   return this._http.delete(dataUrl, { headers: headers }).map(response => {
  //     return response;
  //   }).catch(
  //     this.handleError
  //   );
  // }

  // setOrgVal(element: any = []) {
  //   debugger
  //   this.orgValue = element
  // }
  // getorgVal() {
  //   debugger
  //   return this.orgValue;
  // }

  handleError(error: Response) {
    return Observable.throw(error);
  }


}
