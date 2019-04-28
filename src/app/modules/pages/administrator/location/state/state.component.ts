import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CountryService } from '../../../../services/administrator/location/country.service';
import { StateService } from '../../../../services/administrator/location/state.serivce';
import { State } from '../../../../models/administrator/location/state.model';
import { ConfirmationDialogComponent } from '../../../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  CountryIdName: any = [];
  isEditing: boolean = false;
  StateModel: any = {};
  liststate: any = [];
  dataSource: MatTableDataSource<Element>;
  StateValue: any = {};

  constructor(private _CountryService: CountryService, private _StateService: StateService,
    private _confirmationDialogComponent: ConfirmationDialogComponent) {
   // this.StateValue = this._StateService.getStateVal();
  }

  ngOnInit() {
    this.GetCountryName();
    this.viewStateDetails();
  }
  viewFlag = true;
  displayedColumns = ['SNo', 'StateName', 'CountryName', 'action'];

  onNewClick() {
    this.isEditing = false;
    this.viewFlag = !this.viewFlag;
    this.StateModel = {};
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  SaveState() {
    debugger;
    if (this.isEditing == true) {
      debugger;
      const state = new State();
      state.CountryId = this.StateModel.CountryId;
      state.StateName = this.StateModel.StateName;
      state.StateId = this.StateModel.StateId;
      state.IsActive = this.StateModel.IsActive;
      this._StateService.updateStateDetail(state).subscribe((res: any) => {
        if (res) {
          debugger;
          this._confirmationDialogComponent.openAlertDialog("Successfully updated");
          this.ngOnInit();
          this.viewFlag = !this.viewFlag;
        }
      });
    }
    if (this.isEditing == false) {
      debugger;
      const state = new State();
      state.CountryId = this.StateModel.CountryId;
      state.StateName = this.StateModel.StateName;
      state.IsActive = true;
      this._StateService.saveStateDetail(state).subscribe((res: any) => {
        if (res) {
          this._confirmationDialogComponent.openAlertDialog("Successfully added");
          this.ngOnInit();
          this.viewFlag = !this.viewFlag;
        }
      });
      console.log(state);
    }
  }


  GetCountryName() {
    this._CountryService.GetCountryList().subscribe((data: any) => {
      if (data) {
        this.CountryIdName = data;
        console.log(this.CountryIdName, 'CountryName')
      }
    }
    )
  }

  viewStateDetails() {
    debugger;
    this._StateService.listStateDetails().subscribe((data: any) => {
      debugger;
      if (data)
        this.liststate = data;
      this.dataSource = new MatTableDataSource<Element>(this.liststate);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.liststate, "liststate")
    })
  }

  editState(isEditing, modifyelement) {
    debugger;
    this.StateModel = modifyelement;
    this.isEditing = isEditing;
    this.viewFlag = !this.viewFlag;
  }

  RemoveState(element) {
    debugger;
    const state = new State();
    state.StateId = element.StateId;
    this._StateService.removeState(state).subscribe(response => {
      debugger;
      this.liststate = response['result'];
      this._confirmationDialogComponent.openAlertDialog("Successfully element");
      this.viewStateDetails();
      this.dataSource = new MatTableDataSource(this.liststate);
      this.dataSource.sort = this.sort;
      console.log(this.liststate);
    });
  }

}


