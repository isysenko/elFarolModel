import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IStore } from 'app/store';
import { IExperiment, IStrategy } from 'app/interfaces';
@Component({
    selector: 'app-chart-strategies',
    templateUrl: './chart-strategies.component.html',
})
export class ChartStrategiesComponent implements OnInit {
    public chartLabels: number[] = [];
    // tslint:disable-next-line: no-any
    public chartData: any[] = [];
    public chartType: string = 'line';
    public experiments?: IExperiment[];

    public constructor(private _store: Store<IStore>) {}

    public ngOnInit(): void {
        this._store.pipe(select('experiments')).subscribe((data: IExperiment[]) => {
            if (data) {
                this.chartLabels = [];
                this.chartData = [];
                for (let i: number = 0; i < 10; i++) {
                    this.chartData.push({ data: [], label: i, borderWidth: 2, fill: false });
                }
                data.forEach((item: IExperiment) => {
                    this.chartLabels.push(item._id);
                    if (item.strategies) {
                        item.strategies.forEach((str: IStrategy) => {
                            this.chartData[str.index].data.push(str.count);
                        });
                    }
                });
            }
        });
    }
}
