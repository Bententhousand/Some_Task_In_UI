import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../../../environments/environment';
import { HeaderStorageService } from '../../../../shared/header-storage.service';
import { City } from '../../../models/administrator/location/city.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


const API_URL = environment.apiUrl;

@Injectable()
export class CityService {
    CityValue: any = []
    isEditing: boolean;
    constructor(private _http: Http, private _httpClient: HttpClient, private _headerStorage: HeaderStorageService) { }

    // setIsEditing(value: boolean) {
    //     this.isEditing = value
    // }
    // getIsEditing() {
    //     return this.isEditing;
    // }

    saveCityDetail(element): Observable<any> {
        return this._httpClient.post<any>(API_URL + "City/Create", element)
            .pipe(catchError(this.handleError));
    }

    // saveCityDetail(element) {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     return this._http.post(API_URL + 'City/Create', element, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    removeCity(element): Observable<any> {
        return this._httpClient.delete<any>(API_URL + "City/Delete/" + element.CityId)
            .pipe(catchError(this.handleError));
    }

    // removeCity(id) {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const city = new City
    //     city.CityId = id
    //     const dataUrl = API_URL + 'City/Delete/' + id.CityId;
    //     return this._http.delete(dataUrl, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    listCityDetails(): Observable<any> {
        return this._httpClient.get<any>(API_URL + "City/AllCity")
            .pipe(catchError(this.handleError));
    }

    // listCityDetails(): Observable<any> {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'City/AllCity';
    //     return this._http.get(dataUrl, { headers: headers })
    // }

    listCityDetailsByStateId(Id): Observable<any> {
        return this._httpClient.get<any>(API_URL + "City/GetCityByStateId/" + Id)
            .pipe(catchError(this.handleError));
    }


    // listCityDetailsByStateId(Id): Observable<any> {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     const dataUrl = API_URL + 'City/GetCityByStateId/' + Id;
    //     return this._http.get(dataUrl, { headers: headers })
    // }

    updateCityDetail(element): Observable<any> {
        return this._httpClient.put<any>(API_URL + "City/Modify", element)
            .pipe(catchError(this.handleError));
    }

    // updateCityDetail(element) {
    //     debugger;
    //     const headers = new Headers();
    //     headers.append('Token', this._headerStorage.getToken());
    //     return this._http.put(API_URL + 'City/Modify', element, { headers: headers }).map(response => {
    //         return response;
    //     }).catch(
    //         this.handleError
    //     );
    // }

    handleError(error: Response) {
        return Observable.throw(error);
    }

    // setCityVal(element: any = []) {
    //     debugger
    //     this.CityValue = element
    // }
    // getCityVal() {
    //     debugger
    //     return this.CityValue;
    // }

}
