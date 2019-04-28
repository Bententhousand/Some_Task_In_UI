import { Injectable, ApplicationInitStatus } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../../../environments/environment';
import { HeaderStorageService } from '../../../../shared/header-storage.service';
import { CountryEntity } from '../../../models/administrator/location/country.model';
import { catchError } from 'rxjs/operators';


const API_URL = environment.apiUrl;

@Injectable()
export class CountryService {
    CountryValue: any = [];
    isEditing: boolean;

    constructor(private _http: Http, private _httpClient: HttpClient, private _headerStorage: HeaderStorageService) { }
    // setIsEditing(value: boolean) {
    //     this.isEditing = value
    // }
    // getIsEditing() {
    //     return this.isEditing;
    // }

    listCountryDetails(): Observable<any> {
        return this._httpClient.get<any>(API_URL + "Country/AllCountry")
            .pipe(catchError(this.handleError));
    }


    // listCountryDetails(): Observable<any> {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'Country/AllCountry';
    //     return this._http.get(dataUrl, { headers: headers })
    // }

    saveCountryDetail(element): Observable<any> {
        return this._httpClient.post<any>(API_URL + "Country/Create", element)
            .pipe(catchError(this.handleError));
    }

    // saveCountryDetail(element) {
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     return this._http.post(API_URL + 'Country/Create', element, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    updateCountryDetail(element): Observable<any> {
        return this._httpClient.put<any>(API_URL + "Country/Modify", element)
            .pipe(catchError(this.handleError));
    }

    // updateCountryDetail(element) {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     return this._http.put(API_URL + 'Country/Modify', element, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    deleteCountryDetail(element): Observable<any> {
        return this._httpClient.delete<any>(API_URL + "Country/Delete/" + element.CountryId)
            .pipe(catchError(this.handleError));
    }

    // deleteCountryDetail(id) {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const country = new CountryEntity
    //     country.CountryId = id
    //     const dataUrl = API_URL + 'Country/Delete/' + id.CountryId;
    //     return this._http.delete(dataUrl, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    GetCountryList(): Observable<any> {
        return this._httpClient.get<any>(API_URL + "Country/AllCountry")
            .pipe(catchError(this.handleError));
    }

    // GetCountryList(): Observable<any> {
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'Country/AllCountry';
    //     return this._http.get(dataUrl, { headers: headers });
    // }


    handleError(error: Response) {
        return Observable.throw(error);
    }

    // setCountryVal(element: any = []) {
    //     debugger
    //     this.CountryValue = element
    // }
    // getCountryVal() {
    //     debugger
    //     return this.CountryValue;
    // }

}
