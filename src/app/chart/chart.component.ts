import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IStore } from '../store';
import { IExperiment } from '../interfaces';
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
    public chartDataSuccess: any[] = [{ data: [], label: '0', borderWidth: 2, fill: false }];

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
                    if (item.strategies) {
                        // console.log(item.strategies);
                        const ind: number = 2;
                        this.chartDataSuccess[0].data.push(
                            item.strategies[ind].success / item.strategies[ind].count
                        );
                    }
                    // item.strategies.forEach((strategy: IStrategy) => {
                    //     if (strategy.count) {
                    //         this.chartDataSuccess[strategy.index].data.push(
                    //             strategy.success ? strategy.success : 0 / strategy.count ? strategy.count : 0
                    //         );
                    //         console.table(this.chartDataSuccess);
                    //         // console.log(
                    //         //     strategy.success ? strategy.success : 0 , strategy.count ? strategy.count : 0
                    //         // );
                    //     }
                    // });
                    //  }
                });
            }
        });
    }
}
