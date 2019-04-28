import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CountryService } from '../../../../services/administrator/location/country.service';
import { CountryEntity } from '../../../../models/administrator/location/country.model';
import { ConfirmationDialogComponent } from '../../../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  constructor(public _countryService: CountryService,
    private _confirmationDialogComponent: ConfirmationDialogComponent) { }

  isEditing: boolean = false;
  dataSource: MatTableDataSource<Element>;
  ngOnInit() {
    this.getCountry();
  }

  viewFlag = true;
  displayedColumns = ['SNo', 'CountryName', 'CountryCode', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onNewClick() {
    this.isEditing = false;
    this.countryList = {};
    this.viewFlag = !this.viewFlag;
  }

  allCountry:any = [];

  // allCountry: CountryEntity = [];
  countryList: any = {};


  saveCountry() {
    debugger;
    let element = new CountryEntity();
    {
      element.CountryId = this.countryList.CountryId;
      element.CountryName = this.countryList.CountryName,
        element.CountryCode = this.countryList.CountryCode
    }
    {
      if (this.isEditing == false) {
        this._countryService.saveCountryDetail(element).subscribe(response => {
          if (response) {
            this._confirmationDialogComponent.openAlertDialog("Successfully added");
            debugger;
            this.ngOnInit();
            this.viewFlag = !this.viewFlag;
            this.countryList = {};
          }
        });
      }
      else {
        debugger;
        this._countryService.updateCountryDetail(element).subscribe(response => {
          if (response) {
            this._confirmationDialogComponent.openAlertDialog("Successfully updated");
            this.viewFlag = !this.viewFlag;
            this.countryList = {};
          }
        });
      }
    }
  }

  getCountry() {
    debugger;
    this._countryService.GetCountryList().subscribe(response => {
      debugger;
      response;
      if (response)
        this.allCountry = response;
        this.dataSource = new MatTableDataSource<Element>(this.allCountry);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       console.log(this.allCountry);
    });
  }

  update(isEditing, element): void {
    debugger;
    this.countryList = element;
    this.viewFlag = !this.viewFlag;
    this.isEditing = isEditing;
  }

  removeCountry(element): void {
    debugger;
    const country = new CountryEntity();
    country.CountryId = element.CountryId;
    if (confirm('Are you sure?')) {
      this._countryService.deleteCountryDetail(country).subscribe((data: any) => {
        this.countryList = data['result'];
        this._confirmationDialogComponent.openAlertDialog("Successfully deleted");
        this.ngOnInit();

      });
    }
  }
}
