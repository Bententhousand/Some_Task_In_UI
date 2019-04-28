import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CompanyInitiationService } from '../../../../services/administrator/organization/company-intiation.service';
import { CountryService } from '../../../../services/administrator/location/country.service';
import { StateService } from '../../../../services/administrator/location/state.serivce';
import { CityService } from '../../../../services/administrator/location/city.service';
import { AreaService } from '../../../../services/administrator/location/area.service';
import { OrganizationlevelService } from '../../../../services/administrator/organization/organization-level.service';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogComponent } from '../../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-company-initiation',
  templateUrl: './company-initiation.component.html',
  styleUrls: ['./company-initiation.component.css'],
  providers: [DatePipe]
})
export class CompanyInitiationComponent implements OnInit {
  model: any = {};
  displayedColumns =
    [
      'SNo',
      'CompanyCode',
      'CompanyName',
      'LevelName',
      'ReportingTo',
      'CityName',
      'Action'
    ];
  viewFlag = true;
  countryData: any = [];
  stateData: any = [];
  cityData: any = [];
  areaData: any = [];
  organizationLevelData: any;
  companyData: any;
  organizationTypesData: any;
  natureOfBusinessData: any;
  isEditing: any;
  companyInitiationData: any = [];
  dataSource = new MatTableDataSource<Element>(this.companyInitiationData);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  photoFlag: any;
  CompanyLogo: any = {};
  API_URL: string;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();         // Remove whitespace
    filterValue = filterValue.toLowerCase();  // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(
    private _companyInitiationService: CompanyInitiationService,
    private _countryService: CountryService,
    private _stateService: StateService, private _cityService: CityService,
    private _areaService: AreaService, private _organizationLevelservice: OrganizationlevelService,
    private _datePipe: DatePipe,
    private _confirmationDialogComponent: ConfirmationDialogComponent
  ) {
    this.API_URL = environment.apiUrl;
  }

  onNewClick() {
    this.viewFlag = !this.viewFlag;
    this.isEditing = false;
    this.model = {};
  }

  editCompany(value) {
    debugger;
    this.model = value;
    // this.model.PinCode = value.Pincode;
    this.isEditing = true;
    this.countryData = [{ CountryId: value.Country.CountryId, CountryName: value.Country.CountryName }]
    this.getState(this.model.CountryId);
    this.getCity(this.model.StateId);
    this.getArea(this.model.CityId);
    this.viewFlag = !this.viewFlag;
  }

  urlValidation(event) {
    const allowedRegex = /[0-9\/]/g;
    if (!event.key.match(allowedRegex)) {
      event.preventDefault();
    }
  }

  ngOnInit() {
    this.photoFlag = false;
    this.getCompanyInitiationDetails();
    this.getCountry();
    this.getOrganizationLevel();
    this.getNatureOfBusiness();
    this.getOrganizationTypes();
    this.getCompany();
  }

  saveCompanyInitiation(): void {
    debugger;
    const formData = new FormData();
    if (!this.isEditing) {
      if (this.CompanyLogo != undefined && this.CompanyLogo != '' && this.photoFlag == true) {
        formData.append("data", JSON.stringify(this.model));
        // formData.append("CompanyId", this.model.CompanyId.toString());
        // formData.append("CompanyName", this.model.CompanyName);
        // formData.append("CompanyCode", this.model.CompanyCode);
        // formData.append("AddressLine1", this.model.AddressLine1);
        // formData.append("AddressLine2", this.model.AddressLine2);
        // formData.append("CountryId", this.model.CountryId);
        // formData.append("StateId", this.model.StateId);
        // formData.append("CityId", this.model.CityId);
        // formData.append("AreaId", this.model.AreaId);
        // formData.append("Pincode", this.model.Pincode);
        // formData.append("Email", this.model.Email);
        // formData.append("PhoneNo", this.model.PhoneNo);
        // formData.append("Website", this.model.Website);
        // formData.append("FaxNo", this.model.FaxNo);
        // formData.append("OrganizationLevelId", this.model.OrganizationLevelId);
        // formData.append("BusinessId", this.model.BusinessId);
        // formData.append("TypeId", this.model.TypeId);
        // formData.append("ParentCompany", this.model.ParentCompany);
        // formData.append("ParentCompanyName", this.model.ParentCompanyName);
        // formData.append("CreatedBy", this.model.CreatedBy);
        this.photoFlag ?
          (formData.append("CompanyLogo", (this.CompanyLogo == "") ? "" : this.CompanyLogo)) :
          (formData.append("CompanyLogo", (this.CompanyLogo == "") ? "" : this.CompanyLogo));
        this._companyInitiationService.addCompanyInitiationWithFile(formData).subscribe(
          (result: any) => {
            if (result == true) {
              this._confirmationDialogComponent.openAlertDialog("Successfully added");
            }
          },
          error => {
            if (error.status === 401) {
              this._confirmationDialogComponent.openAlertDialog("Unauthorized");
            } else {
              this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again");
            }
          }
        );
      } else {
        this._companyInitiationService.addCompanyInitiation(this.model).subscribe(
          (result: any) => {
            if (result == true) {
              this._confirmationDialogComponent.openAlertDialog("Successfully added");
            }
          },
          error => {
            if (error.status === 401) {
              this._confirmationDialogComponent.openAlertDialog("Unauthorized");
            } else {
              this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again");
            }
          }
        );
      }
    } else {
      if (this.CompanyLogo != undefined && this.CompanyLogo != '' && this.photoFlag == true) {
        formData.append("data", JSON.stringify(this.model));
        // formData.append("CompanyId", this.model.CompanyId.toString());
        // formData.append("CompanyName", this.model.CompanyName);
        // formData.append("CompanyCode", this.model.CompanyCode);
        // formData.append("AddressLine1", this.model.AddressLine1);
        // formData.append("AddressLine2", this.model.AddressLine2);
        // formData.append("CountryId", this.model.CountryId);
        // formData.append("StateId", this.model.StateId);
        // formData.append("CityId", this.model.CityId);
        // formData.append("AreaId", this.model.AreaId);
        // formData.append("Pincode", this.model.Pincode);
        // formData.append("Email", this.model.Email);
        // formData.append("PhoneNo", this.model.PhoneNo);
        // formData.append("Website", this.model.Website);
        // formData.append("FaxNo", this.model.FaxNo);
        // formData.append("OrganizationLevelId", this.model.OrganizationLevelId);
        // formData.append("BusinessId", this.model.BusinessId);
        // formData.append("TypeId", this.model.TypeId);
        // formData.append("ParentCompany", this.model.ParentCompany);
        // formData.append("ParentCompanyName", this.model.ParentCompanyName);
        // formData.append("CreatedBy", this.model.CreatedBy);
        this.photoFlag ?
          (formData.append("CompanyLogo", (this.CompanyLogo == "") ? "" : this.CompanyLogo)) :
          (formData.append("CompanyLogo", (this.CompanyLogo == "") ? "" : this.CompanyLogo));
        this._companyInitiationService.modifyCompanyInitiationWithFile(formData).subscribe(
          (result: any) => {
            if (result == true) {
              this._confirmationDialogComponent.openAlertDialog("Successfully modified");
            }
          },
          error => {
            if (error.status === 401) {
              this._confirmationDialogComponent.openAlertDialog("Unauthorized");
            } else {
              this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again");
            }
          }
        );
      } else {
        this._companyInitiationService.modifyCompanyInitiation(this.model).subscribe(
          (result: any) => {
            if (result == true) {
              this._confirmationDialogComponent.openAlertDialog("Successfully modified");
            }
          },
          error => {
            if (error.status === 401) {
              this._confirmationDialogComponent.openAlertDialog("Unauthorized");
            } else {
              this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again");
            }
          }
        );
      }
    }
  }

  uploadImage(event) {
    const fileList = event.target.files;
    if (fileList && event.target.files[0]) {
      const file = event.target.files[0];
      this.CompanyLogo = fileList[0];
      this.photoFlag = true;
      const reader = new FileReader();
      reader.onload = e => this.model.CompanyLogo = reader.result;
      reader.readAsDataURL(file);
    }
  }

  // saveCompanyInitiation() {
  //   
  //   if (this.isEditing == false) {
  //     this._companyInitiationService.saveCompanyInitiation(this.model).subscribe((response: any) => {
  //       if (response) {
  //         
  //         var data = response;
  //         alert("Successfully added");
  //       }
  //     });
  //   } else {
  //     this._companyInitiationService.updateCompanyInitiation(this.model).subscribe((response: any) => {
  //       if (response) {
  //         
  //         var data = response;
  //         alert("Successfully modified");
  //       }
  //     });
  //   }
  // }

  getCompanyInitiationDetails() {

    this._companyInitiationService.listCompanyInitiation().subscribe((response: any) => {
      if (response) {

        this.companyInitiationData = response;
        this.setMatTable(this.companyInitiationData);
      }
    });
  }

  setMatTable(value) {
    this.dataSource = new MatTableDataSource<Element>(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCountry() {

    this._countryService.GetCountryList().subscribe((response: any) => {
      if (response) {
        this.countryData = response;
      }
    });
  }

  getState(value) {

    this._stateService.GetStateNameByCountryId(value).subscribe((response: any) => {
      if (response) {
        this.stateData = response;
      }
    });
  }

  getCity(value) {

    this._cityService.listCityDetailsByStateId(value).subscribe((response: any) => {
      if (response) {
        this.cityData = response;
      }
    });
  }

  getArea(value) {

    this._areaService.listAreaDetailsByCityId(value).subscribe((response: any) => {
      if (response) {
        this.areaData = response;
      }
    });
  }

  getOrganizationLevel() {

    this._organizationLevelservice.listOrganizationLevel().subscribe((response: any) => {

      if (response) {
        this.organizationLevelData = response;
      }
    });
  }

  getNatureOfBusiness() {

    this._companyInitiationService.listNatureOfBusiness().subscribe((response: any) => {

      if (response) {
        this.natureOfBusinessData = response;
      }
    });
  }

  getOrganizationTypes() {

    this._companyInitiationService.OrganizationTypes().subscribe((response: any) => {
      if (response) {
        this.organizationTypesData = response;
      }
    });
  }

  getCompany() {

    this._companyInitiationService.listCompanyInitiation().subscribe((response: any) => {
      debugger;
      if (response) {
        this.companyData = response;
      }
    });
  }
}
