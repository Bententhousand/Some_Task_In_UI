import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
/*import {NotificationsService} from 'angular2-notifications';*/

declare const AmCharts: any;
declare var $: any;

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/usaLow.js';

import '../../../../assets/charts/float/jquery.flot.js';
import '../../../../assets/charts/float/jquery.flot.categories.js';
import '../../../../assets/charts/float/curvedLines.js';
import '../../../../assets/charts/float/jquery.flot.tooltip.min.js';
import { DatePipe } from '@angular/common';
import { TargetSettingService } from '../../../services/bdm/target-setting.service.js';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class DefaultComponent implements OnInit {
  options: any = {
    position: ['bottom', 'right'],
  };

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
    private _datePipe: DatePipe
    // private servicePNotify: NotificationsService
  ) {
  }


  ngOnInit() {

    this.graph.ToDate = new Date();
    this.graph.FromDate = new Date();
    this.graph.FromDate.setMonth(this.graph.FromDate.getMonth() - 3);
    this.loadList();
    this.getTargetForGrid();
    var objGetEmpDTO = {
      ActionBy: 1001
    }
    this.targetsettingService.getAllTargets(objGetEmpDTO).subscribe(res => {
      // this.PositionList = res.result;
    })
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
      objgetList.FromDate = this._datePipe.transform(this.graph.FromDate, "yyyy-MM-dd")
      objgetList.ToDate = this._datePipe.transform(this.graph.ToDate, "yyyy-MM-dd")
    }
    else {
      objgetList.FromDate = this._datePipe.transform(DateFrom, "yyyy-MM-dd")
      objgetList.ToDate = this._datePipe.transform(DateTo, "yyyy-MM-dd")
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

  getTargetForGrid() {
    var objGetTargetforGrid = {
      EmployeeId: 1001
    }
    this.targetsettingService.getTargetForGrid(objGetTargetforGrid).subscribe(res => {
      // this.EmployeeTargetForGrid = res.result;
    });
  }


  ShowGraph(graph) {
    if (this.Position == 1) {
      if (this.graph.selectedEmployee != undefined && this.graph.selectedEmployee != "") {
        graph.EmployeeId = this.graph.selectedEmployee.Id
      }
      else {
        graph.EmployeeId = 1001
      }
    }
    else {
      graph.EmployeeId = 1001
    }
    if (graph.FromDate != undefined && graph.FromDate != "") {
      graph.FromDate = this._datePipe.transform(graph.FromDate, "yyyy-MM-dd")
    }
    if (graph.ToDate != undefined && graph.ToDate != "") {
      graph.ToDate = this._datePipe.transform(graph.ToDate, "yyyy-MM-dd")
    }
    this.targetsettingService.getByEmployeeTarget(graph).subscribe(res => {
      // this.EmployeeTarget = res.result;
      for (var i in this.EmployeeTarget) {
        for (var j in this.MonthList) {
          if (this.EmployeeTarget[i].Month == this.MonthList[j].Id) {
            this.EmployeeTarget[i].MonthName = this.MonthList[j].Month
          }
        }
      }
      this.GetGraph(this.EmployeeTarget)
    });
  }

  // chart
  GetGraph(target) {
    this.barChartLabels = [];
    for (var i in target) {
      this.barChartLabels.push(target[i].MonthName)
    }

    this.barChartData = [
      {
        data: [65000], label: 'Target Amount'
      },
      { data: [0], label: 'Actual Amount' }
    ];

  }
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [], label: 'Target Amount' },
    { data: [], label: 'Actual Am' }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
