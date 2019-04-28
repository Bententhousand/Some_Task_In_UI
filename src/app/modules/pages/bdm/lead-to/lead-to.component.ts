import { Component, OnInit } from '@angular/core';
import { LeadToService } from '../../../services/bdm/lead-to.service';

@Component({
  selector: 'app-lead-to',
  templateUrl: './lead-to.component.html',
  styleUrls: ['./lead-to.component.css']
})
export class LeadToComponent implements OnInit {

  constructor(private leadtoService: LeadToService) { }

  serviceList: any = [];
  oldLeadList: any = [];
  newLeadList: any = [];
  clientList: any = [];
  model: any = {};

  ngOnInit() {
    this.getService();
  }


  getService(): void {
    debugger;
    let element = {
      ActionBy: sessionStorage.getItem('UserID')
    };
    this.leadtoService.getService(element).subscribe(
      (result: any) => {
        debugger;
        console.log(result);
        this.serviceList = result.result;
        console.log(this.serviceList,'service');
      },
      error => {
        if (error.status === 401) {
          alert("Unauthorized");
        } else {
          alert("Something went wrong! Try Again");
        }
      }
    );
  }


  
  getOldLeadList(): void {
    debugger;
    let element = {
      Id: this.model.selectedService.Id,
      ActionBy: sessionStorage.getItem('UserID')
    };
    this.leadtoService.getOldLeadList(element).subscribe(
      (result: any) => {
        debugger;
        console.log(result);
        this.oldLeadList = result.result;
        console.log(this.oldLeadList);
      },
      error => {
        if (error.status === 401) {
          alert("Unauthorized");
        } else {
          alert("Something went wrong! Try Again");
        }
      }
    );
  }


  
  getNewLeadList(): void {
    debugger;
    let element = {
      State: this.model.selectedOldEmployee.StateId,
      OldLead: this.model.selectedOldEmployee.EmployeeId,
      ActionBy: sessionStorage.getItem('UserID')
    };
    this.leadtoService.getNewLeadList(element).subscribe(
      (result: any) => {
        debugger;
        console.log(result);
        this.newLeadList = result.result;
        console.log(this.newLeadList);
        this.getClientByEmpID();
      },
      error => {
        if (error.status === 401) {
          alert("Unauthorized");
        } else {
          alert("Something went wrong! Try Again");
        }
      }
    );
  }

  getClientByEmpID(): void {
    debugger;
    let element = {
      EmployeeId: this.model.selectedOldEmployee.EmployeeId
    };
    this.leadtoService.getClientByEmpId(element).subscribe(
      (result: any) => {
        debugger;
        console.log(result);
        this.clientList = result.result;
        console.log(this.clientList);
      },
      error => {
        if (error.status === 401) {
          alert("Unauthorized");
        } else {
          alert("Something went wrong! Try Again");
        }
      }
    );
  }

  saveClientLeadDetail() {
    var objChangeClientLead: any = {
      EmployeeId: this.model.selectedNewEmployee.EmployeeId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    var ClientId = [];
    for (var i in this.clientList) {
      if (this.clientList.ClientList[i].hasPermission) {
        ClientId.push(this.clientList[i].ClientId);
      }
    }
    objChangeClientLead.ClientId = ClientId;
    this.leadtoService.saveChangeLead(objChangeClientLead).subscribe((res: any) => {
      debugger;
      alert("Added successfully");
      this.model = {};
      this.oldLeadList = [];
      this.newLeadList = [];
      this.getNewLeadList();
    });
  }
}
