import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GetStatus } from '../../../models/attendance-detail-popup/attendance-detail-popup.model';
import { AttendanceDetailsService } from '../../../services/operation/attendance-details.service';
import { LocalStorage } from '../../../../shared/local-storage';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-attendance-detail-popup',
  templateUrl: './attendance-detail-popup.component.html',
  styleUrls: ['./attendance-detail-popup.component.css']
})
export class AttendanceDetailPopupComponent implements OnInit {

  employee: string;
  statusData: GetStatus[] = [];
  setAttendance: string;
  setStatus: number;
  setDate: Date = new Date();


  constructor(public dialogRef: MatDialogRef<AttendanceDetailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _attendanceService: AttendanceDetailsService,
    private _localStorage: LocalStorage,
    private _confirmationDialogComponent: ConfirmationDialogComponent
  ) {
    dialogRef.disableClose = true;
    this.employee = sessionStorage.getItem('UserID');
  }

  ngOnInit() {
    debugger;
    this._data;
    this.setAttendance = this._data.element[Number(this._data.date)];
    this.setDate = new Date(
      this.setDate.setFullYear(this._localStorage.getYear(), this._localStorage.getMonth(), (Number(this._data.date)))
    );
    this.getStatusMaster();
  }

  getStatusMaster() {
    debugger;
    var obj = {
      // ActionBy: parseInt(this.employee)
      ActionBy: sessionStorage.getItem('UserID')
    }
    this._attendanceService.getStatusMaster(obj).subscribe((respose: any) => {
      debugger;
      this.statusData = respose.result;
      this.setStatus = this.statusData[this.statusData.findIndex(element => element.StatusName == this.setAttendance)].StatusId
    });
  }

  modifyAttendance() {
    debugger;
    var obj = {
      Date: new Date(this.setDate),
      ModifiedBy: sessionStorage.getItem('UserID'),
      UpdateAtt: [{
        ManpowerId: this._data.element.ManpowerId,
        StatusId: this.setStatus,
      }]
    }
    this._attendanceService.modifyAttendance(obj).subscribe((respose: any) => {
      debugger;
      if (respose.result == true) {
        this._confirmationDialogComponent.openAlertDialog("Successfully modified");
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

