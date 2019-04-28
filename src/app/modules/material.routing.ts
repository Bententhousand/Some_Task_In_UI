import { Routes } from '@angular/router';
import { ManpowerDetailComponent } from './pages/operation/manpower-detail/manpower-detail.component';
import { AssignFieldOfficerComponent } from './pages/operation/assign-field-officer/assign-field-officer.component';
import { AssignManpowerComponent } from './pages/operation/assign-manpower/assign-manpower.component';
import { AttendanceDetailComponent } from './pages/operation/attendance-detail/attendance-detail.component';
import { AttendanceMasterComponent } from './pages/operation/attendance-master/attendance-master.component';
import { ContractDetailComponent } from './pages/customer/contract-detail/contract-detail.component';
import { ContractComponent } from './pages/customer/contract/contract.component';
import { CustomerRegistrationComponent } from './pages/customer/customer-registration/customer-registration.component';
import { CustomerSiteMappingComponent } from './pages/customer/customer-site-mapping/customer-site-mapping.component';
import { SiteAllocationComponent } from './pages/customer/site-allocation/site-allocation.component';
import { MySurveyComponent } from './pages/bdm/my-survey/my-survey.component';
import { TargetSettingComponent } from './pages/bdm/target-setting/target-setting.component';
import { LeadToComponent } from './pages/bdm/lead-to/lead-to.component';
import { SalaryAllocationComponent } from './pages/billing/salary-allocation/salary-allocation.component';
import { DepartmentComponent } from './pages/master/department/department.component';
import { DesignationComponent } from './pages/master/designation/designation.component';
import { EmployeeComponent } from './pages/master/employee/employee.component';
import { ListOfUserAccountComponent } from './pages/administrator/creating-user-account/list-of-user-account/list-of-user-account.component';
import { ListOfCompanyComponent } from './pages/administrator/organization/company-intiation/list-of-company/list-of-company.component';
import { RoleMenuPrivilegeComponent } from './pages/administrator/role-library/role-menu-privilege/role-menu-privilege/role-menu-privilege.component';
import { UserMenuPrivilegeComponent } from './pages/administrator/role-library/user-menu-privilege/user-menu-privilege/user-menu-privilege.component';
import { CreateUserAccountComponent } from './pages/administrator/creating-user-account/create-user-account/create-user-account.component';
import { CreatecompanyIntiationComponent } from './pages/administrator/organization/company-intiation/createcompany-intiation/createcompany-intiation.component';
import { OrganizationComponent } from './pages/administrator/organization/organization/organization.component';
import { SalaryInvoiceComponent } from './pages/billing/salary-invoice/salary-invoice.component';
import { CompanyInitiationComponent } from './pages/administrator/organization/company-initiation/company-initiation.component';
import { CityComponent } from './pages/administrator/location/city/city.component';
import { StateComponent } from './pages/administrator/location/state/state.component';
import { CountryComponent } from './pages/administrator/location/country/country.component';
import { AreaComponent } from './pages/administrator/location/area/area.component';
import { RoleComponent } from './pages/administrator/role-library/role/role.component';

export const MaterialRoutes: Routes = [
  { path: 'ManpowerDetails', component: ManpowerDetailComponent },
  { path: 'AssignFieldOfficer', component: AssignFieldOfficerComponent },
  { path: 'AssignManpower', component: AssignManpowerComponent },
  { path: 'AttendanceDetail', component: AttendanceDetailComponent },
  { path: 'AttendanceMaster', component: AttendanceMasterComponent },

  { path: 'ContractMaster', component: ContractComponent },
  { path: 'ContractDetails', component: ContractDetailComponent },
  { path: 'Customer', component: CustomerRegistrationComponent },
  { path: 'CustomerSiteMapping', component: CustomerSiteMappingComponent },
  { path: 'SiteAllocation', component: SiteAllocationComponent },

  { path: 'LeadTo', component: LeadToComponent },
  { path: 'MySurvey', component: MySurveyComponent },
  { path: 'TargetSetting', component: TargetSettingComponent },

  { path: 'SalaryAllocation', component: SalaryAllocationComponent },
  { path: 'SalaryDetails', component: SalaryInvoiceComponent },

  { path: 'Department', component: DepartmentComponent },
  { path: 'Designation', component: DesignationComponent },
  { path: 'EmployeeDetails', component: EmployeeComponent },

  { path: 'ListOfUserAccount', component: ListOfUserAccountComponent },

  { path: 'ListOfCompany', component: ListOfCompanyComponent },
  { path: 'CreateCompany', component: CreatecompanyIntiationComponent },


  { path: 'Organization', component: OrganizationComponent },

  { path: 'RoleMenuPrivilege', component: RoleMenuPrivilegeComponent },
  { path: 'UserMenuPrivilege', component: UserMenuPrivilegeComponent },


  { path: 'CreateUser', component: CreateUserAccountComponent },

  { path: 'Country', component: CountryComponent },
  { path: 'Area', component: AreaComponent },
  { path: 'City', component: CityComponent },
  { path: 'State', component: StateComponent },

  { path: 'Role', component: RoleComponent },

  { path: 'CompanyInitiation', component: CompanyInitiationComponent },
];
