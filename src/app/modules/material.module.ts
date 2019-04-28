import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { OnlyNumber } from '../shared/directives/only-numbers';
import { CreateUserAccountComponent } from './pages/administrator/creating-user-account/create-user-account/create-user-account.component';
import { UserMenuPrivilegeComponent } from './pages/administrator/role-library/user-menu-privilege/user-menu-privilege/user-menu-privilege.component';
import { RoleMenuPrivilegeComponent } from './pages/administrator/role-library/role-menu-privilege/role-menu-privilege/role-menu-privilege.component';
import { ListOfCompanyComponent } from './pages/administrator/organization/company-intiation/list-of-company/list-of-company.component';
import { ListOfUserAccountComponent } from './pages/administrator/creating-user-account/list-of-user-account/list-of-user-account.component';
import { EmployeeComponent } from './pages/master/employee/employee.component';
import { DesignationComponent } from './pages/master/designation/designation.component';
import { DepartmentComponent } from './pages/master/department/department.component';
import { SalaryAllocationComponent } from './pages/billing/salary-allocation/salary-allocation.component';
import { TargetSettingComponent } from './pages/bdm/target-setting/target-setting.component';
import { MySurveyComponent } from './pages/bdm/my-survey/my-survey.component';
import { LeadToComponent } from './pages/bdm/lead-to/lead-to.component';
import { SiteAllocationComponent } from './pages/customer/site-allocation/site-allocation.component';
import { CustomerSiteMappingComponent } from './pages/customer/customer-site-mapping/customer-site-mapping.component';
import { CustomerRegistrationComponent } from './pages/customer/customer-registration/customer-registration.component';
import { ContractDetailComponent } from './pages/customer/contract-detail/contract-detail.component';
import { ContractComponent } from './pages/customer/contract/contract.component';
import { AssignManpowerComponent } from './pages/operation/assign-manpower/assign-manpower.component';
import { AssignFieldOfficerComponent } from './pages/operation/assign-field-officer/assign-field-officer.component';
import { AttendanceMasterComponent } from './pages/operation/attendance-master/attendance-master.component';
import { AttendanceDetailComponent } from './pages/operation/attendance-detail/attendance-detail.component';
import { ManpowerDetailComponent } from './pages/operation/manpower-detail/manpower-detail.component';
import { EmployeeMasterService } from './services/master/employee.master.service';
import { HeaderStorageService } from '../shared/header-storage.service';
import { RoleService } from './services/administrator/role-library/role.service';
import { OrganizationlevelService } from './services/administrator/organization/organization-level.service';
import { CompanyInitiationService } from './services/administrator/organization/company-intiation.service';
import { AreaService } from './services/administrator/location/area.service';
import { CityService } from './services/administrator/location/city.service';
import { StateService } from './services/administrator/location/state.serivce';
import { CountryService } from './services/administrator/location/country.service';
import { UserAccountService } from './services/administrator/user-acccount/user-account.service';
import { TargetSettingService } from './services/bdm/target-setting.service';
import { LeadToService } from './services/bdm/lead-to.service';
import { DepartmentService } from './services/master/department.service';
import { DesignationService } from './services/master/designation.service';
import { LocalStorage } from '../shared/local-storage';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatExpansionModule } from '@angular/material';
import { APP_DATE_FORMATS, AppDateAdapter } from '../shared/directives/date-picker';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { HttpModule } from '@angular/http';
import { AttendanceDetailPopupComponent } from './pages/operation/attendance-detail-popup/attendance-detail-popup.component';
import { CreatecompanyIntiationComponent } from './pages/administrator/organization/company-intiation/createcompany-intiation/createcompany-intiation.component';
import { OrganizationComponent } from './pages/administrator/organization/organization/organization.component';
import { SalaryInvoiceComponent } from './pages/billing/salary-invoice/salary-invoice.component';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { CompanyInitiationComponent } from './pages/administrator/organization/company-initiation/company-initiation.component';
import { CityComponent } from './pages/administrator/location/city/city.component';
import { StateComponent } from './pages/administrator/location/state/state.component';
import { RoleComponent } from './pages/administrator/role-library/role/role.component';
import { CountryComponent } from './pages/administrator/location/country/country.component';
import { AreaComponent } from './pages/administrator/location/area/area.component';
import { RoleMenuChildComponent } from './pages/administrator/role-library/role-menu-privilege/role-menu-child/role-menu-child.component';
import { UserMenuChildComponent } from './pages/administrator/role-library/user-menu-privilege/user-menu-child/user-menu-child.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    SatPopoverModule,
    MatExpansionModule,
    HttpModule
  ],
  providers: [
    LocalStorage,
    DesignationService,
    DepartmentService,
    LeadToService,
    TargetSettingService,
    UserAccountService,
    CountryService,
    StateService,
    CityService,
    AreaService,
    CompanyInitiationService,
    OrganizationlevelService,
    RoleService,
    HeaderStorageService,
    EmployeeMasterService,
    ConfirmationDialogComponent,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: MAT_DATE_LOCALE, useValue: "en-gb" },
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ],
  entryComponents: [AttendanceDetailPopupComponent, ConfirmationDialogComponent],
  declarations: [
    ManpowerDetailComponent,
    AttendanceDetailComponent,
    AttendanceMasterComponent,
    AssignFieldOfficerComponent,
    AssignManpowerComponent,

    ContractComponent,
    ContractDetailComponent,
    CustomerRegistrationComponent,
    CustomerSiteMappingComponent,
    SiteAllocationComponent,

    LeadToComponent,
    MySurveyComponent,
    TargetSettingComponent,

    SalaryAllocationComponent,

    DepartmentComponent,
    DesignationComponent,
    EmployeeComponent,

    ListOfUserAccountComponent,
    ListOfCompanyComponent,
    RoleMenuPrivilegeComponent,
    UserMenuPrivilegeComponent,

    CreateUserAccountComponent,
    OnlyNumber,
    AttendanceDetailPopupComponent,
    CreatecompanyIntiationComponent,

    OrganizationComponent,
    SalaryInvoiceComponent,
    ConfirmationDialogComponent,
    CompanyInitiationComponent,
    CityComponent,
    StateComponent,
    RoleComponent,
    CountryComponent,
    AreaComponent, 

    RoleMenuChildComponent,
    UserMenuChildComponent
  ]
})
export class MaterialComponentsModule { }
