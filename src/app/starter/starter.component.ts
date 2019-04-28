import { Component, AfterViewInit } from '@angular/core';
import { TargetSettingService } from '../modules/services/bdm/target-setting.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  // providers: [DatePipe]
})
export class StarterComponent implements AfterViewInit {



  FollowUp: number = 0;
  Cold: number = 0;
  Hot: number = 0;
  QuoteSent: number = 0;
  Customer: number = 0;
  NewClient: number = 0;
  TotalAmount: number = 0;
  PositionList: any = [];
  EmployeeTargetList: any = [];
  EmployeeTargetForGrid: any = [];
  EmployeeTarget: any = [];
  Position: number = 3;
  assign: number = 0;
  graph: any = {};

  MonthList: any = [{ "Id": 1, "Month": 'Jan' },
  { "Id": 2, "Month": 'Feb' },
  { "Id": 3, "Month": 'Mar' },
  { "Id": 4, "Month": 'Apr' },
  { "Id": 5, "Month": 'May' },
  { "Id": 6, "Month": 'Jun' },
  { "Id": 7, "Month": 'Jul' },
  { "Id": 8, "Month": 'Aug' },
  { "Id": 9, "Month": 'Sep' },
  { "Id": 10, "Month": 'Oct' },
  { "Id": 11, "Month": 'Nov' },
  { "Id": 12, "Month": 'Dec' }];

  constructor(
    private targetsettingService: TargetSettingService,
    // private _datePipe: DatePipe
    // private servicePNotify: NotificationsService
  ) {
  }

  loadList() {
    var objgetList: any = {
      Position: this.Position,
    }
    if (this.Position != 1) {
      objgetList.ActionBy = 1001;
    }
    else {
      objgetList.EmployeeId = ((this.graph.selectedEmployee != undefined && this.graph.selectedEmployee != "") ? this.graph.selectedEmployee.Id : null);
      objgetList.ActionBy = 1001;
    }
    var dFromDate = new Date();
    dFromDate.setMonth(dFromDate.getMonth() - 1);
    var DateFrom = dFromDate;
    var DateTo = new Date();
    if (this.assign == 1) {
      // objgetList.FromDate = this._datePipe.transform(this.graph.FromDate, "yyyy-MM-dd")
      // objgetList.ToDate = this._datePipe.transform(this.graph.ToDate, "yyyy-MM-dd")
    }
    else {
      // objgetList.FromDate = this._datePipe.transform(DateFrom, "yyyy-MM-dd")
      // objgetList.ToDate = this._datePipe.transform(DateTo, "yyyy-MM-dd")
    }
    this.targetsettingService.getMyTargetList(objgetList).subscribe(res => {
      // this.EmployeeTargetList = res.result;
      this.FollowUp = this.EmployeeTargetList[0].Followup
      this.Cold = this.EmployeeTargetList[0].Cold;
      this.Customer = this.EmployeeTargetList[0].Customer;
      this.NewClient = this.EmployeeTargetList[0].NewClient;
      this.Hot = this.EmployeeTargetList[0].Hot;
      this.TotalAmount = this.EmployeeTargetList[0].TotalAmount;
      this.QuoteSent = this.EmployeeTargetList[0].QuoteSent;
    });
  }
  ngOnInit() {

    this.graph.ToDate = new Date();
    this.graph.FromDate = new Date();
    this.graph.FromDate.setMonth(this.graph.FromDate.getMonth() - 3);
    this.loadList();

    var objGetEmpDTO = {
      ActionBy: 1001
    }
    this.targetsettingService.getAllTargets(objGetEmpDTO).subscribe(res => {
      // this.PositionList = res.result;
    })
  }




  ngAfterViewInit() { }
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(30,136,229,0.2)',
      borderColor: 'rgba(30,136,229,1)',
      pointBackgroundColor: 'rgba(30,136,229,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(30,136,229,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(30,136,229,0.2)',
      borderColor: 'rgba(30,136,229,1)',
      pointBackgroundColor: 'rgba(30,136,229,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(30,136,229,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
