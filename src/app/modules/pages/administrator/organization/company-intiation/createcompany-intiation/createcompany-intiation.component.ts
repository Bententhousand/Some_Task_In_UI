import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CountryService } from '../../../../../services/administrator/location/country.service';
import { StateService } from '../../../../../services/administrator/location/state.serivce';
import { CityService } from '../../../../../services/administrator/location/city.service';
import { AreaService } from '../../../../../services/administrator/location/area.service';
import { OrganizationlevelService } from '../../../../../services/administrator/organization/organization-level.service';
import { CompanyInitiationService } from '../../../../../services/administrator/organization/company-intiation.service';
import { environment } from '../../../../../../../environments/environment';
import { CompanyInitiation } from '../../../../../models/administrator/organization/company-intiation.model';


@Component({
  selector: 'app-createcompany-intiation',
  templateUrl: './createcompany-intiation.component.html',
  styleUrls: ['./createcompany-intiation.component.css']
})
export class CreatecompanyIntiationComponent implements OnInit {
  comValue: number;
  isEditing = false;
  compValue: any;
  API_URL: any;
  public CompanyForm: FormGroup;

  //public signUpForm: FormGroup;


  constructor(public form: FormBuilder, private _CountryService: CountryService,
    private _StateService: StateService, private _CityService: CityService,
    private _listareaservice: AreaService, private _organizationlevelservice: OrganizationlevelService,
    private _Companyinitiationservice: CompanyInitiationService, private _router: Router,
    private http: HttpClient) {
    this.API_URL = environment.apiUrl;
    // this.compValue = this._Companyinitiationservice.getcompVal();
  
  }
  // urlValidation(event: any) {
  //   const pattern = /[0-9\+\-\ ]/;
  //   // const pattern ="(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
  //   let inputChar = String.fromCharCode(event.charCode);
  //   if (!pattern.test(inputChar)) {
  //     event.preventDefault();
  //   }

    urlValidation(event) {
      const allowedRegex = /[0-9\/]/g;

       if (!event.key.match(allowedRegex)) {
           event.preventDefault();
       }
   }
  
  
  public ngOnInit() {
    // this.buildForm();
    // this.updateComp();
    this.GetCountryName();
    // this.GetStateName();
    // this.GetCityName();
    // this.GetAreaName();
    this.GetOrganizationLevelName();
    this.GetNatureOfBusiness();
    this.Getorganizationtypes();
    this.viewCompantDetails();

    // this.isEditing = this._Companyinitiationservice.getIsEditing();
    if (this.isEditing == true) {
      this.setUpdateValueForcompany();
    }
  }

  setUpdateValueForcompany() {
    debugger;
    this.model.CompanyName = this.compValue.CompanyName;
    this.model.AddressLine1 = this.compValue.AddressLine1;
    this.model.AddressLine2 = this.compValue.AddressLine2;
    this.model.CountryId = this.compValue.CountryId;
    this.GetStateName(this.model.CountryId);
    this.model.PhoneNo = this.compValue.PhoneNo;
    this.model.Email = this.compValue.Email;
    this.model.PinCode = this.compValue.Pincode;
    this.model.FaxNo = this.compValue.FaxNo;
    this.model.CompanyLogo = this.compValue.CompanyLogo;
    this.model.Website = this.compValue.Website;
    this.model.TypeId = this.compValue.TypeId;
    this.model.BusinessId = this.compValue.BusinessId;
    this.model.StateId = this.compValue.StateId;
    this.GetCityName(this.model.StateId);
    this.model.CompanyCode = this.compValue.CompanyCode;
    this.model.OrganizationLevelId = this.compValue.OrganizationLevelId;
    this.model.ParentCompany = this.compValue.ParentCompany;
    this.model.CityId = this.compValue.CityId;
    this.GetAreaName(this.model.CityId);
    this.model.AreaId = this.compValue.AreaId;
  }
  CountryIdName: any = []
  StateIdName: any = []
  backCompanyListForm() {
    debugger;
    this.isEditing = false;
    this.compValue = {}
    this.model = {}
    this._router.navigate(['ListOfCompany'])
  }

  GetCountryName() {
    debugger;
    this._CountryService.GetCountryList().subscribe((data: any) => {
      data['result']
      if (data) {
        this.CountryIdName = JSON.parse(data._body);
        console.log(this.CountryIdName, 'CountryName')
      }
    }
    )
  }

  GetStateName(value) {
    debugger
    this._StateService.GetStateNameByCountryId(value).subscribe((data: any) => {
      data['result']
      if (data) {
        this.StateIdName = JSON.parse(data._body);
        console.log(this.StateIdName, 'StateName')
      }
    }
    )
  }

  CityIdName: any = []

  GetCityName(value) {
    debugger;
    this._CityService.listCityDetailsByStateId(value).subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.CityIdName = JSON.parse(data._body);
        console.log(this.CityIdName, 'CityName')
      }
    }
    )
  }
  AreaIdName: any = []
  GetAreaName(value) {

    this._listareaservice.listAreaDetailsByCityId(value).subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.AreaIdName = JSON.parse(data._body);
        console.log(this.AreaIdName, 'AreaName')
      }
    }
    )
  }
  OrganizationlevelIdName: any = []
  GetOrganizationLevelName() {
    this._organizationlevelservice.listOrganizationLevel().subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.OrganizationlevelIdName = JSON.parse(data._body);
        console.log(this.OrganizationlevelIdName, 'OrganizationlevelIdName')
      }
    }
    )
  }

  NatureOfBusinessIdName: any = []
  GetNatureOfBusiness() {
    this._Companyinitiationservice.listNatureOfBusiness().subscribe((data: any) => {
      debugger;
      data['result']
      if (data) {
        this.NatureOfBusinessIdName = JSON.parse(data._body);
        console.log(this.NatureOfBusinessIdName, 'NatureOfBusinessIdName')
      }
    }
    )
  }
  Organizationtypes: any = []
  Getorganizationtypes() {
    this._Companyinitiationservice.OrganizationTypes().subscribe((data: any) => {
      data['result']
      if (data) {
        this.Organizationtypes = JSON.parse(data._body);
        console.log(this.Organizationtypes, 'Organizationtypes')
      }
    })
  }
  ListCompanyArray: any = []

  viewCompantDetails() {
    this._Companyinitiationservice.listCompanyInitiation().subscribe((data: any) => {
      if (data)
        this.ListCompanyArray = JSON.parse(data._body);
      console.log(this.ListCompanyArray, "ListCompanyArray")
    })
  }
  model: any = []
  CompanyInitiationModel: any = []

  // public buildForm() {
  //   this.CompanyForm = this.form.group({
  //     CompanyName: ['', [Validators.required]],
  //     AddressLine1: ['', [Validators.required]],
  //     AddressLine2: ['', [Validators.required]],
  //     CountryId: ['', [Validators.required]],
  //     PhoneNo: ['', [Validators.required]],
  //     Email: ['', [Validators.required]],
  //     PinCode: ['', [Validators.required]],
  //     FaxNo: ['', [Validators.required]],
  //     CompanyLogo: ['', [Validators.required]],
  //     Website: ['', [Validators.required]],
  //     TypeId: ['', [Validators.required]],
  //     AreaId: ['', [Validators.required]],
  //     BusinessId: ['', [Validators.required]],
  //     StateId: ['', [Validators.required]],
  //     CompanyCode: ['', [Validators.required]],
  //     OrganizationLevelId: ['', [Validators.required]],
  //     ParentCompany: ['', [Validators.required]],
  //     CityId: ['', [Validators.required]]
  //   });
  //   console.log(this.CompanyForm)
  // }

  saveCompanyDetails() {
    debugger;
    if (this.isEditing == true) {
      const companyInitiation = new CompanyInitiation();
      companyInitiation.CompanyId = this.compValue.CompanyId;
      companyInitiation.CompanyName = this.model.CompanyName;
      companyInitiation.CompanyCode = this.model.CompanyCode;
      companyInitiation.AddressLine2 = this.model.AddressLine2;
      companyInitiation.AddressLine1 = this.model.AddressLine1;
      companyInitiation.CountryId = this.model.CountryId;
      companyInitiation.StateId = this.model.StateId;
      companyInitiation.CityId = this.model.CityId;
      companyInitiation.AreaId = this.model.AreaId;
      companyInitiation.Pincode = this.model.PinCode;
      companyInitiation.Email = this.model.Email;
      companyInitiation.PhoneNo = this.model.PhoneNo;
      companyInitiation.Website = this.model.Website;
      companyInitiation.CompanyLogo = this.model.CompanyLogo;
      companyInitiation.FaxNo = this.model.FaxNo;
      companyInitiation.OrganizationLevelId = this.model.OrganizationLevelId;
      companyInitiation.BusinessId = this.model.BusinessId;
      companyInitiation.TypeId = this.model.TypeId;
      companyInitiation.ParentCompany = this.model.ParentCompany;
      companyInitiation.ParentCompanyName = this.model.ParentCompanyName;
      this._Companyinitiationservice.modifyCompanyInitiation(companyInitiation).subscribe
        ((res: any) => {
          debugger;
          if (res) {
            alert("updated");
            this.model = []
          }
        });

    }
    else {
      const companyInitiation = new CompanyInitiation();
      companyInitiation.CompanyName = this.model.CompanyName;
      companyInitiation.CompanyCode = this.model.CompanyCode;
      companyInitiation.AddressLine2 = this.model.AddressLine2;
      companyInitiation.AddressLine1 = this.model.AddressLine1;
      companyInitiation.CountryId = this.model.CountryId;
      companyInitiation.StateId = this.model.StateId;
      companyInitiation.CityId = this.model.CityId;
      companyInitiation.AreaId = this.model.AreaId;
      companyInitiation.Pincode = this.model.PinCode;
      companyInitiation.Email = this.model.Email;
      companyInitiation.PhoneNo = this.model.PhoneNo;
      companyInitiation.Website = this.model.Website;
      companyInitiation.CompanyLogo = this.model.CompanyLogo;
      companyInitiation.FaxNo = this.model.FaxNo;
      companyInitiation.OrganizationLevelId = this.model.OrganizationLevelId;
      companyInitiation.BusinessId = this.model.BusinessId;
      companyInitiation.TypeId = this.model.TypeId;
      companyInitiation.ParentCompany = this.model.ParentCompany
      this._Companyinitiationservice.addCompanyInitiation(companyInitiation).subscribe
        ((res: any) => {
          debugger;
          if (res) {
            alert("success");
            this.model = []
          }
        });
      console.log(this.CompanyInitiationModel);
    }
  }



  url = '';
  fileUpload(event) {
    debugger;
    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();
    //   reader.readAsDataURL(event.target.files[0]);
    //   reader.onload = (event: any) => {
    //     this.url = event.target.result;
    //   }
    // }
    let filelist: FileList = event.target.files;
    if (filelist.length > 0) {
      let file: File = filelist[0];
      let formData: FormData = new FormData();
      formData.append('fileAttach', file, file.name);
      this.http.post(this.API_URL + 'Company/FileUpload', formData).subscribe(data => {
        debugger;
        data['result']
        if (data) {
          this.model.CompanyLogo = data['result'];
          console.log(data)
        }
      });
    }
  }







}
