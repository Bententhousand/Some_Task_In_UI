import { Component, OnInit } from '@angular/core';
// import { AttendanceMasterService } from 'src/app/ERP/services/attendance/attendance-master/attendance-master.service';
import { DatePipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { AttendanceMasterService } from '../../../services/operation/attendance-master.service';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-attendance-master',
  templateUrl: './attendance-master.component.html',
  styleUrls: ['./attendance-master.component.css'],
  providers: [DatePipe]
})
export class AttendanceMasterComponent implements OnInit {
  customerData: any[] = [];
  attendance: any = {};
  areaData: any[] = [];
  siteData: any[] = [];
  classificationData: any[] = [];
  manpowerData: any = [];
  StatusList: any[] = [];
  shiftMapData: any[] = [];
  selection = new SelectionModel(true, []);
  selectedAllCheck: any;
  tempMapowerData: any[] = [];

  constructor(
    private _attendanceMasterService: AttendanceMasterService,
    private _datePipe: DatePipe,
    private _confirmationDialogComponent: ConfirmationDialogComponent) {
    this.attendance.Date = new Date();
  }

  ngOnInit() {
    this.getCustomers();
  }

  addManpowerAttendance(): void {
    debugger;
    var objTempManpower = [];
    for (var i in this.manpowerData) {
      if (this.manpowerData[i].isSelected) {
        var temp = {
          ManpowerId: this.manpowerData[i].ManpowerId,
          StatusId: this.manpowerData[i].selectedStatus.StatusId,
          ShiftMappingId: (this.manpowerData[i].selectedShift != undefined) ? this.manpowerData[i].selectedShift.MappingId : null,
          InTime: this._datePipe.transform(this.manpowerData[i].InTime, 'yyyy-MM-dd HH:mm:ss Z'),
          OutTime: this._datePipe.transform(this.manpowerData[i].OutTime, 'yyyy-MM-dd HH:mm:ss Z'),
          Reason: this.manpowerData[i].Reason,
          OverTime: this.manpowerData[i].OverTime
        }
        objTempManpower.push(temp);
      }
    }

    var objAttandance =
    {
      CustomerId: this.attendance.CustomerId,
      BranchId: this.attendance.BranchId,
      SiteId: this.attendance.SiteId,
      Date: this._datePipe.transform(this.attendance.Date, 'yyyy-MM-dd'),
      CreatedBy: sessionStorage.getItem('UserID'),
      Attendance: objTempManpower,
    }

    this._attendanceMasterService.addManpowerAttendance(objAttandance).subscribe(
      (result: any) => {
        debugger;
        this.cancelManpowerAttendance();
      },
      error => {
        if (error.status === 401) {
          this._confirmationDialogComponent.openAlertDialog("Unauthorized", "Manpower Details");
        } else {
          this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again", "Manpower Details");
        }
      }
    );
  }

  getCustomers(): void {
    let element = {
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._attendanceMasterService.getCustomers(element).subscribe(
      (result: any) => {
        this.customerData = result.result;
        this.getStatus();
      },
      error => {
        if (error.status === 401) {
          this._confirmationDialogComponent.openAlertDialog("Unauthorized", "Manpower Details");
        } else {
          this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again", "Manpower Details");
        }
      }
    );
  }

  getStatus(): void {
    let element = {
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._attendanceMasterService.getStatus(element).subscribe(
      (result: any) => {
        this.StatusList = result.result;
      },
      error => {
        if (error.status === 401) {
          this._confirmationDialogComponent.openAlertDialog("Unauthorized", "Manpower Details");
        } else {
          this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again", "Manpower Details");
        }
      }
    );
  }

  getArea(): void {
    this.clearOnChange('Branch');
    let element = {
      CustomerId: this.attendance.CustomerId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._attendanceMasterService.getArea(element).subscribe(
      (result: any) => {
        this.areaData = result.result;
        // this.getAssignManpowers();
        // this.siteData = [];
        // this.classificationData = [];
        // this.serviceData = [];
        // this.manpowerData = [];
      },
      error => {
        if (error.status === 401) {
          this._confirmationDialogComponent.openAlertDialog("Unauthorized", "Manpower Details");
        } else {
          this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again", "Manpower Details");
        }
      }
    );
  }

  getSite(): void {
    this.clearOnChange('Site');
    let element = {
      CustomerId: this.attendance.CustomerId,
      BranchId: this.attendance.BranchId,
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._attendanceMasterService.getSite(element).subscribe(
      (result: any) => {
        this.siteData = result.result;
        // this.classificationData = [];
        // // this.serviceData = [];
        // // this.manpowerData = [];
      },
      error => {
        if (error.status === 401) {
          this._confirmationDialogComponent.openAlertDialog("Unauthorized", "Manpower Details");
        } else {
          this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again", "Manpower Details");
        }
      }
    );
  }

  getAllManpower(): void {
    debugger;
    let element = {
      CustomerId: this.attendance.CustomerId,
      BranchId: this.attendance.BranchId,
      SiteId: this.attendance.SiteId,
      Date: this._datePipe.transform(this.attendance.Date, 'yyyy-MM-dd'),
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._attendanceMasterService.getManpower(element).subscribe(
      (result: any) => {
        debugger;
        this.manpowerData = result.result;
        this.setManpower();
        console.log(this.manpowerData);
      },
      error => {
        if (error.status === 401) {
          this._confirmationDialogComponent.openAlertDialog("Unauthorized", "Manpower Details");
        } else {
          this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again", "Manpower Details");
        }
      }
    );
  }

  setManpower() {
    debugger;
    for (var i in this.manpowerData) {
      this.manpowerData[i].isAttendance = false;
      for (var j in this.StatusList) {
        if (this.manpowerData[i].AttendanceStatus == null) {
          this.manpowerData[i].selectedStatus = this.StatusList[0];
        } else {
          if (this.manpowerData[i].AttendanceStatus == this.StatusList[j].StatusId) {
            this.manpowerData[i].selectedStatus = this.StatusList[j];
            this.manpowerData[i].isAttendance = true;
          }
        }
      }

      if (this.manpowerData[i].InTime != null) {
        var strInTime = this.manpowerData[i].InTimeTimeSpan.split(':');
        this.manpowerData[i].InTime = new Date().setHours(strInTime[0], strInTime[1], strInTime[2]);
      }

      if (this.manpowerData[i].OutTime != null) {
        var strOutTime = this.manpowerData[i].OutTimeTimeSpan.split(':');
        this.manpowerData[i].OutTime = new Date().setHours(strOutTime[0], strOutTime[1], strOutTime[2]);
      }
      if (this.manpowerData[0].ContractId != null) {
        //  this.getShiftMaster();
      }
    }
    this.tempMapowerData = this.manpowerData;
  }

  getShiftMaster() {
    debugger;
    let element = {
      ContractId: this.manpowerData[0].ContractId
    }
    this._attendanceMasterService.getShiftMaster(element).subscribe(
      (result: any) => {
        debugger;
        this.shiftMapData = result.result;
        for (var i in this.manpowerData) {
          for (var k in this.shiftMapData) {
            if (this.manpowerData[i].ShiftMappingId == this.shiftMapData[k].MappingId) {
              this.manpowerData[i].selectedShift = this.shiftMapData[k];
            }
          }
        }
        this.tempMapowerData = this.manpowerData;
      },
      error => {
        if (error.status === 401) {
          this._confirmationDialogComponent.openAlertDialog("Unauthorized", "Manpower Details");
        } else {
          this._confirmationDialogComponent.openAlertDialog("Something went wrong! Try Again", "Manpower Details");
        }
      }
    );
  }


  cancelManpowerAttendance() {
    this.attendance.Date = new Date();
    this.attendance.CustomerId = 0;
    this.attendance.BranchId = 0,
      this.attendance.SiteId = 0,
      this.siteData = [];
    this.areaData = [];
    this.manpowerData = [];
    this.selectedAllCheck = false;
  }

  clearOnChange(value) {
    this.attendance = {
      CustomerId: this.attendance.CustomerId,
      BranchId: 'Branch' != value ? this.attendance.BranchId : 0,
      SiteId: 'Site' != value ? this.attendance.SiteId : 0,
    }
    this.attendance.Date = new Date();
  }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.manpowerData.length;
  //   return numSelected === numRows;
  // }
  // masterToggle() {
  //   this.isAllSelected()
  //     ? this.selection.clear()
  //     : this.manpowerData.forEach(row => this.selection.select(row));
  //   console.log(this.selection);
  // }

  select() {
    var isSelectedAll = false;
    if (this.selectedAllCheck) {
      isSelectedAll = false;
    } else {
      isSelectedAll = true;
    }
    for (var i in this.manpowerData) {
      this.manpowerData[i].isSelected = isSelectedAll;
    }
  };

  isChecked(check: boolean) {
    if (check) {
      return true;
    }
  }

  searchManpower(searchValue: string) {
    debugger;
    this.manpowerData = this.tempMapowerData;
    searchValue = searchValue.trim();
    searchValue = searchValue.toLocaleLowerCase();
    var filterManpowerData = this.manpowerData.filter(
      data =>
        data.ManpowerId.toString().startsWith(
          searchValue.toLocaleLowerCase()
        ) ||
        data.ManpowerName.toLocaleLowerCase().startsWith(
          searchValue.toLocaleLowerCase()
        )
    );
    this.manpowerData = filterManpowerData;
  }

  onEnterNumberOnly(event: KeyboardEvent, i: number) {
    if (
      (event.charCode >= 48 && event.charCode <= 57) ||
      event.charCode === 46
    ) {
      if (
        event.charCode === 48 &&
        this.manpowerData[i].OverTime.toString().indexOf("0") === 0
      ) {
        return false;
      } else {
        if (
          Number(
            this.manpowerData[i].OverTime.toString().concat(
              event.key !== "." ? event.key : ""
            )
          ) <= 99.99
        ) {
          if (
            String(this.manpowerData[i].OverTime).includes(".") ===
            false ||
            event.charCode !== 46
          ) {
            if (
              String(this.manpowerData[i].OverTime).includes(".") === true
            ) {
              let decimalLength = String(this.manpowerData[i].OverTime)
                .concat(event.key)
                .split(".")[1].length;
              if (decimalLength <= 2) {
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  // getClassification(): void {
  //   let element = {
  //     CustomerId : this.attendance.CustomerId, 
  //     BranchId : this.attendance.BranchId,
  //     SiteId : this.attendance.SiteId,  
  //     ActionBy:sessionStorage.getItem('UserID')
  //   }
  //   this._attendanceMasterService.getClassification(element).subscribe(
  //     (result: any) => {
  //       this.classificationData = result.result;
  //       // this.serviceData = [];
  //       // this.manpowerData = [];
  //     },
  //     error => {
  //       if (error.status === 401) { alert("Unauthorized"); }
  //       else { alert("Something went wrong! Try Again"); }
  //     }
  //   );
  // }
}
