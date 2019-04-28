import { Injectable, ApplicationInitStatus } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../../../environments/environment';
import { HeaderStorageService } from '../../../../shared/header-storage.service';

const API_URL = environment.apiUrl;

@Injectable()
export class UserAccountService {

  userCompany: any;
  isEditing: boolean;
  userDetails: any;

  constructor(private _http: Http, private _headerStorage: HeaderStorageService) { }
  setUserVal(value: any) {
    this.userCompany = value
  }
  getUserVal() {
    debugger
    return this.userCompany;
  }
  saveUserAccount(element) {
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.post(API_URL + 'User/Create', element, { headers: headers }).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }
  setIsEditing(value: boolean) {
    debugger;
    this.isEditing = value
  }
  getIsEditing() {
    return this.isEditing;
  }

  updateUserDetail(element) {
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.put(API_URL + 'User/Modify' + element, { headers: headers }).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }

  companyIdByUserId(element) {
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.get(API_URL + 'User/GetUserById/' + element, { headers: headers }).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }


  RoleIdByUserId(element) {
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    return this._http.get(API_URL + 'User/GetUserById/' + element, { headers: headers }).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }

  listUserAccountDetails(): Observable<any> {
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    const dataUrl = API_URL + 'User/AllUsers';
    return this._http.get(dataUrl, { headers: headers })
  }

  deleteUserDetail(id) {
    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    const dataUrl = API_URL + 'User/Delete/' + id;
    return this._http.delete(dataUrl, { headers: headers }).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }

  CheckUserName(name) {

    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    const dataUrl = API_URL + 'User/CheckUsername/' + name;
    return this._http.post(dataUrl, { headers: headers }).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }

  CheckEmailId(mailId) {

    debugger;
    const headers = new Headers();
    headers.append('Token', this._headerStorage.getToken());
    const dataUrl = API_URL + 'User/CheckUserEmailId/' + mailId;
    return this._http.post(dataUrl, { headers: headers }).map(response => {
      return response;
    }).catch(
      this.handleError
    );
  }
  handleError(error: Response) {
    return Observable.throw(error);
  }


}
