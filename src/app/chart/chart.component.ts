import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IStore } from '../store';
import { IExperiment, IStrategy } from '../interfaces';
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
    public chartDataSuccess0: any[] = [{ data: [], label: '0', borderWidth: 2, fill: false }];
    public chartDataSuccess1: any[] = [{ data: [], label: '1', borderWidth: 2, fill: false }];
    public chartDataSuccess2: any[] = [{ data: [], label: '2', borderWidth: 2, fill: false }];
    public chartDataSuccess3: any[] = [{ data: [], label: '3', borderWidth: 2, fill: false }];
    public chartDataSuccess4: any[] = [{ data: [], label: '4', borderWidth: 2, fill: false }];
    public chartDataSuccess5: any[] = [{ data: [], label: '5', borderWidth: 2, fill: false }];
    public chartDataSuccess6: any[] = [{ data: [], label: '6', borderWidth: 2, fill: false }];
    public chartDataSuccess7: any[] = [{ data: [], label: '7', borderWidth: 2, fill: false }];
    public chartDataSuccess8: any[] = [{ data: [], label: '8', borderWidth: 2, fill: false }];
    public chartDataSuccess9: any[] = [{ data: [], label: '9', borderWidth: 2, fill: false }];

    public constructor(private _store: Store<IStore>) {}

    public ngOnInit(): void {
        this._store.pipe(select('experiments')).subscribe((data: IExperiment[]) => {
            if (data) {
                const percentsDecidedToGo: number[][] = [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                ];
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
                        this.chartDataSuccess0[0].data.push(
                            item.strategies[0].success / (item.strategies[0].count - item.strategies[0].neytral)
                        );
                        this.chartDataSuccess1[0].data.push(
                            item.strategies[1].success / (item.strategies[1].count - item.strategies[1].neytral)
                        );
                        this.chartDataSuccess2[0].data.push(
                            item.strategies[2].success / (item.strategies[2].count - item.strategies[2].neytral)
                        );
                        this.chartDataSuccess3[0].data.push(
                            item.strategies[3].success / (item.strategies[3].count - item.strategies[3].neytral)
                        );
                        this.chartDataSuccess4[0].data.push(
                            item.strategies[4].success / (item.strategies[4].count - item.strategies[4].neytral)
                        );
                        this.chartDataSuccess5[0].data.push(
                            item.strategies[5].success / (item.strategies[5].count - item.strategies[5].neytral)
                        );
                        this.chartDataSuccess6[0].data.push(
                            item.strategies[6].success / (item.strategies[6].count - item.strategies[6].neytral)
                        );
                        this.chartDataSuccess7[0].data.push(
                            item.strategies[7].success / (item.strategies[7].count - item.strategies[7].neytral)
                        );
                        this.chartDataSuccess8[0].data.push(
                            item.strategies[8].success / (item.strategies[8].count - item.strategies[8].neytral)
                        );
                        this.chartDataSuccess9[0].data.push(
                            item.strategies[9].success / (item.strategies[9].count - item.strategies[9].neytral)
                        );
                        item.strategies.map((str: IStrategy, index: number) => {
                            percentsDecidedToGo[index][0] += str.percentToGo;
                            percentsDecidedToGo[index][1] += str.count;
                        });
                    }
                });
                const percentsDecidedToGoFinal: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                percentsDecidedToGo.map((item: number[], index: number) => {
                    percentsDecidedToGoFinal[index] = item[0] / item[1];
                });
                console.log(percentsDecidedToGoFinal);
            }
        });
    }
}
