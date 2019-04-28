import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.css"]
})
export class ConfirmationDialogComponent implements OnInit {

  confirmationDialog: number;
  public confirmMessage: string;
  public alertMessage: string;
  public componentName: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  openAlertDialog(value: string, componentName?: string) {
    this.confirmationDialog = 0;
    this.dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: this.confirmationDialog }
    });
    this.dialogRef.componentInstance.alertMessage = value;
    this.dialogRef.componentInstance.componentName = componentName;

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // do confirmation actions
      }
      this.dialogRef = null;
    });
  }

  openConfirmationDialog(value: string) {
    this.confirmationDialog = 1;
    this.dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: this.confirmationDialog }
    });
    this.dialogRef.componentInstance.confirmMessage = value;

    return this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
      this.dialogRef = null;
    });
  }

  dialogRefClose(value) {
    this.dialogRef.close(value);
  }
}
