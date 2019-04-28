import { Injectable, ApplicationInitStatus } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../../../environments/environment';
import { HeaderStorageService } from '../../../../shared/header-storage.service';
import { State } from '../../../models/administrator/location/state.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable()
export class StateService {
    StateValue: any = [];
    isEditing: boolean;

    constructor(private _http: Http, private _httpClient: HttpClient, _headerStorage: HeaderStorageService) { }

    // setIsEditing(value: boolean) {
    //     this.isEditing = value
    // }
    // getIsEditing() {
    //     return this.isEditing;
    // }


    saveStateDetail(element): Observable<string> {
        return this._httpClient.post<string>(API_URL + "State/Create", element)
            .pipe(catchError(this.handleError));
    }

    // saveStateDetail(element) {
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     return this._http.post(API_URL + 'State/Create', element, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    GetStateNameByCountryId(element): Observable<string> {
        return this._httpClient.get<string>(API_URL + "State/GetStateByCountryId/" + element)
            .pipe(catchError(this.handleError));
    }

    // GetStateNameByCountryId(value): Observable<any> {
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'State/GetStateByCountryId/' + value;
    //     return this._http.get(dataUrl, { headers: headers });
    // }

    listStateDetails(): Observable<string> {
        return this._httpClient.get<string>(API_URL + "State/AllState")
            .pipe(catchError(this.handleError));
    }

    // listStateDetails(): Observable<any> {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'State/AllState';
    //     return this._http.get(dataUrl, { headers: headers })
    // }

    removeState(element): Observable<string> {
        return this._httpClient.delete<string>(API_URL + "State/Delete/" + element.StateId)
            .pipe(catchError(this.handleError));
    }

    // removeState(Id): Observable<any> {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const state = new State
    //     state.StateId = Id.StateId
    //     const dataUrl = API_URL + 'State/Delete/' + Id.StateId;
    //     return this._http.delete(dataUrl, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }


    updateStateDetail(element): Observable<string> {
        return this._httpClient.put<string>(API_URL + "State/Modify", element)
            .pipe(catchError(this.handleError));
    }

    // updateStateDetail(element) {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     return this._http.put(API_URL + 'State/Modify', element, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }


    // setStateVal(element: any = []) {
    //     debugger
    //     this.StateValue = element
    // }
    // getStateVal() {
    //     debugger
    //     return this.StateValue;
    // }

    handleError(error: Response) {
        return Observable.throw(error);
    }
}

