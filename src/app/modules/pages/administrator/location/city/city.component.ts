import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CityService } from '../../../../services/administrator/location/city.service';
import { CountryService } from '../../../../services/administrator/location/country.service';
import { StateService } from '../../../../services/administrator/location/state.serivce';
import { City } from '../../../../models/administrator/location/city.model';
import { ConfirmationDialogComponent } from '../../../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  isEditing: boolean = false;
  CityModel: any = {};
  CountryIdName: any = [];
  StateIdName: any = [];
  ListCity: any = [];
  countryarray: any = {};
  dataSource: MatTableDataSource<Element>;

  constructor(private _CityService: CityService, private _CountryService: CountryService,
    private _StateService: StateService,
    private _confirmationDialogComponent: ConfirmationDialogComponent) { }
  displayedColumns = ['SNo', 'CountryName', 'StateName', 'CityName', 'action'];
  ngOnInit() {
    this.GetCountryName();
    this.viewCityDetails();
    // this.GetStateName();

  }
  viewFlag = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  onNewClick() {
    this.isEditing = false;
    this.viewFlag = !this.viewFlag;
    this.CityModel = {};
  }

  SaveCity() {
    debugger
    if (this.isEditing == true) {
      const city = new City();
      city.CityId = this.CityModel.CityId;
      city.CountryId = this.CityModel.CountryId;
      city.StateId = this.CityModel.StateId;
      city.CityName = this.CityModel.CityName;
      city.StateName = this.CityModel.StateName;
      this._CityService.updateCityDetail(city).subscribe((data: any) => {
        if (data) {
          this._confirmationDialogComponent.openAlertDialog("Successfully updated");
          this.ngOnInit();
          this.viewFlag = !this.viewFlag;
        }
      })
    }
    if (this.isEditing == false) {
      debugger;
      const city = new City();
      city.CountryId = this.CityModel.CountryId;
      city.StateId = this.CityModel.StateId;
      city.CityName = this.CityModel.CityName;
      this._CityService.saveCityDetail(city).subscribe((res: any) => {

        if (res) {
          this._confirmationDialogComponent.openAlertDialog("Successfully added");
          this.ngOnInit();
          this.viewFlag = !this.viewFlag;
        }
      });
      console.log(city);
    }
  }


  GetCountryName() {
    debugger;
    this._CountryService.GetCountryList().subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.CountryIdName = data;
        console.log(this.CountryIdName, 'CountryName')
      }
    }
    )
  }
  GetStateName(value) {
    debugger;
    this._StateService.GetStateNameByCountryId(value).subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.StateIdName = data;
        console.log(this.StateIdName, 'StateName')
      }
    }
    )
  }





  viewCityDetails() {
    debugger;
    this._CityService.listCityDetails().subscribe((data: any) => {
      debugger;
      if (data)
        this.ListCity = data;
      this.countryarray = this.ListCity.Country;
      this.dataSource = new MatTableDataSource<Element>(this.ListCity);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.ListCity, "ListCity")
    })
  }



  RemoveCountry(element) {
    debugger;
    const city = new City();
    city.CityId = element.CityId
    this._CityService.removeCity(city).subscribe((data: any) => {
      debugger;
      this.ListCity = data['result'];
      this._confirmationDialogComponent.openAlertDialog("Successfully deleted");
      this.viewCityDetails();

      this.dataSource = new MatTableDataSource(this.ListCity);
      this.dataSource.sort = this.sort;
      console.log(this.ListCity);
    })
  }


  editCity(isEditing, modifyelement) {
    debugger;
    this.CityModel = modifyelement;
    this.StateIdName = [{ StateId: modifyelement.State.StateId, StateName: modifyelement.State.StateName }];
    this.GetStateName(modifyelement.CountryId);
    this.isEditing = isEditing;
    this.viewFlag = !this.viewFlag;
  }



}
