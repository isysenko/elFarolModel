import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IStore } from '../store';
import { IExperiment, IStrategy } from '../interfaces';
import { GridColumnStyleBuilder } from '@angular/flex-layout/grid/typings/column/column';
@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {
    public chartLabels: number[] = [];
    // tslint:disable-next-line: no-any
    public chartData: any[] = [
        { data: [], label: 'Number of applicants', borderWidth: 2, fill: false },
        { data: [], label: 'Bar capacity', borderWidth: 2, fill: false },
    ];
    public chartType: string = 'line';
    public experiments?: IExperiment[];
    // tslint:disable-next-line: no-any
    public chartDataSuccess: any[] = [
        { data: [], label: '0', borderWidth: 2, fill: false },
        { data: [], label: '1', borderWidth: 2, fill: false },
        { data: [], label: '2', borderWidth: 2, fill: false },
        { data: [], label: '3', borderWidth: 2, fill: false },
        { data: [], label: '4', borderWidth: 2, fill: false },
        { data: [], label: '5', borderWidth: 2, fill: false },
        { data: [], label: '6', borderWidth: 2, fill: false },
        { data: [], label: '7', borderWidth: 2, fill: false },
        { data: [], label: '8', borderWidth: 2, fill: false },
        { data: [], label: '9', borderWidth: 2, fill: false },
    ];

    public constructor(private _store: Store<IStore>) {}

    public ngOnInit(): void {
        this._store.pipe(select('experiments')).subscribe((data: IExperiment[]) => {
            if (data) {
                this.chartLabels = [];
                this.chartData[0].data = [];
                this.chartData[1].data = [];
                data.forEach((item: IExperiment) => {
                    this.chartLabels.push(item._id);
                    this.chartData[1].data.push(item.barCapacity);
                    if (item.applicantsNumber) {
                        this.chartData[0].data.push(item.applicantsNumber);
                    }
                    // let resuts: number[][] = [
                    //     [0, 0],
                    //     [0, 0],
                    //     [0, 0],
                    //     [0, 0],
                    //     [0, 0],
                    //     [0, 0],
                    //     [0, 0],
                    //     [0, 0],
                    //     [0, 0],
                    //     [0, 0]
                    // ];
                    // if (item.strategies) {
                    //     item.strategies.forEach((strategy: IStrategy) => {
                            
                    //         this.chartDataSuccess[strategy.index].data.push(item.applicantsNumber / strategy.count);
                    //     });
                    // }
                });
            }
        });
    }
}
