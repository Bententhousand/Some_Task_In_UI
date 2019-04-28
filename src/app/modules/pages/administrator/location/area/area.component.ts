import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CountryService } from '../../../../services/administrator/location/country.service';
import { StateService } from '../../../../services/administrator/location/state.serivce';
import { CityService } from '../../../../services/administrator/location/city.service';
import { AreaService } from '../../../../services/administrator/location/area.service';
import { Area } from '../../../../models/administrator/location/area.model';
import { ConfirmationDialogComponent } from '../../../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  viewFlag = true;
  isEditing: boolean = false;
  public signUpForm: FormGroup;

  onNewClick() {
    this.isEditing = false;
    this.viewFlag = !this.viewFlag;
    this.AreaModel = {};
  }
  constructor(public form: FormBuilder, private _CountryService: CountryService,
    private _StateService: StateService, private _CityService: CityService,
    private _AreaService: AreaService, private _router: Router,
    private _listareaservice: AreaService,
    private _confirmationDialogComponent: ConfirmationDialogComponent) {
    // this.AreaValue = this._AreaService.getAreaVal();
    this.buildForm();
  }

  displayedColumns = ['SNo', 'AreaName', 'Pincode', 'CityName', 'StateName', 'CountryName', 'action'];
  dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  ngOnInit() {
    debugger;
    this.viewAreaDetails();
    this.GetCountryName();
  }

  AreaValue: any = {}
  setUpdateValueForArea() {
    debugger;
    this.AreaModel.CountryId = this.AreaValue.Country.CountryId;
    this.GetStateName(this.AreaModel.CountryId);
    this.AreaModel.StateId = this.AreaValue.State.StateId;
    this.GetCityName(this.AreaModel.StateId);
    this.AreaModel.CityId = this.AreaValue.City.CityId;
    this.AreaModel.AreaId = this.AreaValue.AreaId;
    this.AreaModel.AreaName = this.AreaValue.AreaName;
    this.AreaModel.Pincode = this.AreaValue.Pincode;
  }


  CountryIdName: any = [];
  GetCountryName() {
    debugger;
    this._CountryService.GetCountryList().subscribe((data: any) => {
      debugger;
      if (data) {
        this.CountryIdName = data;
        console.log(this.CountryIdName, 'CountryName')
      }
    }
    )
  }

  StateIdName: any = [];
  GetStateName(value) {
    debugger;
    this._StateService.GetStateNameByCountryId(value).subscribe((data: any) => {
      debugger;
      if (data) {
        this.StateIdName = data;
        console.log(this.StateIdName, 'StateName')
      }
    }
    )
  }


  CityIdName: any = [];
  GetCityName(value) {
    debugger;
    this._CityService.listCityDetailsByStateId(value).subscribe((data: any) => {
      debugger;
      if (data) {
        this.CityIdName = data;
        console.log(this.CityIdName, 'CityName')
      }
    }
    )
  }

  ListArea: any = []
  viewAreaDetails() {
    debugger;
    this._listareaservice.listAreaDetails().subscribe((data: any) => {
      debugger;
      if (data)
        this.ListArea = data;
      this.dataSource = new MatTableDataSource<Element>(this.ListArea);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.ListArea, "ListArea")

    })
  }

  AreaModel: any = [];
  saveAreaDetails() {
    debugger;
    if (this.isEditing == true) {
      const area = new Area();
      area.AreaId = this.AreaModel.AreaId
      area.CountryId = this.AreaModel.CountryId;
      area.StateId = this.AreaModel.StateId;
      area.CityId = this.AreaModel.CityId;
      area.AreaName = this.AreaModel.AreaName;
      area.Pincode = this.AreaModel.Pincode;
      this._AreaService.updateAreaDetail(area).subscribe((data: any) => {
        if (data) {
          this._confirmationDialogComponent.openAlertDialog("Successfully Updated");
          this.viewFlag = true;
          this.ngOnInit();
        }
      }

      )
    } if (this.isEditing == false) {
      debugger;
      const area = new Area();
      area.CountryId = this.AreaModel.CountryId;
      area.StateId = this.AreaModel.StateId;
      area.CityId = this.AreaModel.CityId;
      area.AreaName = this.AreaModel.AreaName;
      area.Pincode = this.AreaModel.Pincode;
      this._AreaService.saveAreaDetail(area).subscribe((res: any) => {
        if (res) {
          this._confirmationDialogComponent.openAlertDialog("Successfully added");
          this.viewFlag = true;
          this.ngOnInit();
        }
      });
      console.log(area);
    }
  }

  cityVal: any

  editCity(isEditing, modifyelement) {
    debugger;
    this.AreaModel = modifyelement;
    this.StateIdName = [{ StateId: modifyelement.State.StateId, StateName: modifyelement.State.StateName }];
    this.GetStateName(modifyelement.CountryId);
    this.CityIdName = [{ CityId: modifyelement.City.CityId, CityName: modifyelement.City.CityIdName }];
    this.GetCityName(modifyelement.StateId);
    this.isEditing = isEditing;
    this.viewFlag = !this.viewFlag;
  }



  RemoveArea(element) {
    debugger;
    const area = new Area();
    area.AreaId = element.AreaId
    if (confirm('Are you sure?')) {
      this._listareaservice.removeArea(area).subscribe((data: any) => {
        debugger;
        this.ListArea = data['result'];
        this._confirmationDialogComponent.openAlertDialog("Successfully deleted");
        this.viewAreaDetails();
        this.dataSource = new MatTableDataSource(this.ListArea);
        this.dataSource.sort = this.sort;
        console.log(this.ListArea);
      })
    }
  }

  public buildForm() {
    this.signUpForm = this.form.group({
      CountryName: ['', [Validators.required]],
      StateName: ['', [Validators.required]],
      CityName: ['', [Validators.required]],
      AreaName: ['', [Validators.required]],
      AreaCode: ['', [Validators.required]],
      Pincode: ['', [Validators.required]]
    });
    console.log(this.signUpForm)
  }

}
