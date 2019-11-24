import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IStore } from '../store';
import { Observable } from 'rxjs';
import { IExperiment, IPerson, IStrategy, ResultType } from '../interfaces';
import { NewExperimentsService } from './new.experiment.service';
import { AddExperimentToList, ResetStore } from '../store/actions/experiment.actions';

@Component({
    selector: 'app-experiments',
    templateUrl: './experiments.component.html',
    styleUrls: ['./experiments.component.css'],
})
export class ExperimentsComponent {
    // tslint:disable-next-line: no-any
    public strategies: any[] = [
        { name: 'Монетка вирішить (0)', value: true },
        { name: 'Якщо йдуть усі друзі (1)', value: true },
        { name: 'Якщо хоч хтось із друзів іде (2)', value: true },
        { name: 'Якщо минулого разу не пішов або пішов і був задоволеним (3)', value: true },
        { name: 'Через раз (4)', value: true },
        { name: 'Завжди йти (5)', value: true },
        { name: 'Якщо бар дорогий (6)', value: true },
        { name: 'Якщо бар дешевий (7)', value: true },
        { name: 'Якщо бар не дорогий (8)', value: true },
        { name: 'Якщо бар не дорогий і минулого разу залишився задоволеним (9)', value: true },
    ];
    public barCapacity: string = '60';
    public experimentsNumber: string = '100';
    public peopleNumber: string = '100';
    public people$?: Observable<IPerson[]>;
    public experiments$?: Observable<IExperiment[]>;
    public ifExpRun: boolean = false;
    public showMore: boolean = false;
    public showMoreStrategy: boolean = false;
    public newExperiments: IExperiment[] = [];
    public chartLabels: number[] = [];
    // tslint:disable-next-line: no-any
    public chartType: string = 'bar';
    public experiments?: IExperiment[];
    // tslint:disable-next-line: no-any
    public chartStrategiesCount0: any[] = [{ data: [], label: '0', borderWidth: 2, fill: false }];
    public chartStrategiesCount1: any[] = [{ data: [], label: '1', borderWidth: 2, fill: false }];
    public chartStrategiesCount2: any[] = [{ data: [], label: '2', borderWidth: 2, fill: false }];
    public chartStrategiesCount3: any[] = [{ data: [], label: '3', borderWidth: 2, fill: false }];
    public chartStrategiesCount4: any[] = [{ data: [], label: '4', borderWidth: 2, fill: false }];
    public chartStrategiesCount5: any[] = [{ data: [], label: '5', borderWidth: 2, fill: false }];
    public chartStrategiesCount6: any[] = [{ data: [], label: '6', borderWidth: 2, fill: false }];
    public chartStrategiesCount7: any[] = [{ data: [], label: '7', borderWidth: 2, fill: false }];
    public chartStrategiesCount8: any[] = [{ data: [], label: '8', borderWidth: 2, fill: false }];
    public chartStrategiesCount9: any[] = [{ data: [], label: '9', borderWidth: 2, fill: false }];

    public constructor(private _store: Store<IStore>) {}
    public ngOnInit(): void {
        this.experiments$ = this._store.pipe(select('experiments'));
        this.people$ = this._store.pipe(select('people'));
    }
    public runExperiments(): void {
        const exp: NewExperimentsService = new NewExperimentsService();
        const strategy: IStrategy[] = [];
        for (let i: number = 0; i < this.strategies.length; i++) {
            if (this.strategies[i].value) {
                strategy.push({
                    name: this.strategies[i].name,
                    index: i,
                    count: 0,
                    checked: true,
                    success: 0,
                    failed: 0,
                    neytral: 0,
                    percentToGo: 0,
                });
            } else {
                strategy.push({
                    name: this.strategies[i].name,
                    index: i,
                    count: 0,
                    checked: false,
                    success: 0,
                    failed: 0,
                    neytral: 0,
                    percentToGo: 0,
                });
            }
        }
        const res: ResultType = exp.startExperiments(
            strategy,
            Number(this.barCapacity),
            Number(this.experimentsNumber),
            Number(this.peopleNumber)
        );
        this._store.dispatch(new AddExperimentToList(res.experiments));
        console.log(res.people);

        res.people.forEach((person: IPerson) => {
            this.chartLabels.push(person._id);
            this.chartStrategiesCount0[0].data.push(
                person.strategyChange[0].count.reduce((item: number, currvalue: number) => item + currvalue) /
                    person.strategyChange[0].count.length
            );
            this.chartStrategiesCount1[0].data.push(
                person.strategyChange[1].count.reduce((item: number, currvalue: number) => item + currvalue) /
                    person.strategyChange[1].count.length
            );
            this.chartStrategiesCount2[0].data.push(
                person.strategyChange[2].count.reduce((item: number, currvalue: number) => item + currvalue) /
                    person.strategyChange[2].count.length
            );
            this.chartStrategiesCount3[0].data.push(
                person.strategyChange[3].count.reduce((item: number, currvalue: number) => item + currvalue) /
                    person.strategyChange[3].count.length
            );
            this.chartStrategiesCount4[0].data.push(
                person.strategyChange[4].count.reduce((item: number, currvalue: number) => item + currvalue) /
                    person.strategyChange[4].count.length
            );
            this.chartStrategiesCount5[0].data.push(
                person.strategyChange[5].count.reduce((item: number, currvalue: number) => item + currvalue) /
                    person.strategyChange[5].count.length
            );
            this.chartStrategiesCount6[0].data.push(
                person.strategyChange[6].count.reduce((item: number, currvalue: number) => item + currvalue) /
                    person.strategyChange[6].count.length
            );
            this.chartStrategiesCount7[0].data.push(
                person.strategyChange[7].count.reduce((item: number, currvalue: number) => item + currvalue) /
                    person.strategyChange[7].count.length
            );
            this.chartStrategiesCount8[0].data.push(
                person.strategyChange[8].count.reduce((item: number, currvalue: number) => item + currvalue) /
                    person.strategyChange[8].count.length
            );
            this.chartStrategiesCount9[0].data.push(
                person.strategyChange[9].count.reduce((item: number, currvalue: number) => item + currvalue) /
                    person.strategyChange[9].count.length
            );
        });
        console.log(
            '0======>',
            this.chartStrategiesCount0[0].data.reduce((item: number, currvalue: number) => item + currvalue) /
                this.chartStrategiesCount0[0].data.length
        );
        console.log(
            '1======>',
            this.chartStrategiesCount1[0].data.reduce((item: number, currvalue: number) => item + currvalue) /
                this.chartStrategiesCount1[0].data.length
        );
        console.log(
            '2======>',
            this.chartStrategiesCount2[0].data.reduce((item: number, currvalue: number) => item + currvalue) /
                this.chartStrategiesCount2[0].data.length
        );
        console.log(
            '3======>',
            this.chartStrategiesCount3[0].data.reduce((item: number, currvalue: number) => item + currvalue) /
                this.chartStrategiesCount3[0].data.length
        );
        console.log(
            '4======>',
            this.chartStrategiesCount4[0].data.reduce((item: number, currvalue: number) => item + currvalue) /
                this.chartStrategiesCount4[0].data.length
        );
        console.log(
            '5======>',
            this.chartStrategiesCount5[0].data.reduce((item: number, currvalue: number) => item + currvalue) /
                this.chartStrategiesCount5[0].data.length
        );
        console.log(
            '6======>',
            this.chartStrategiesCount6[0].data.reduce((item: number, currvalue: number) => item + currvalue) /
                this.chartStrategiesCount6[0].data.length
        );
        console.log(
            '7======>',
            this.chartStrategiesCount7[0].data.reduce((item: number, currvalue: number) => item + currvalue) /
                this.chartStrategiesCount7[0].data.length
        );
        console.log(
            '8======>',
            this.chartStrategiesCount8[0].data.reduce((item: number, currvalue: number) => item + currvalue) /
                this.chartStrategiesCount8[0].data.length
        );
        console.log(
            '9======>',
            this.chartStrategiesCount9[0].data.reduce((item: number, currvalue: number) => item + currvalue) /
                this.chartStrategiesCount9[0].data.length
        );
        this.ifExpRun = true;
    }
    public showMoreInfo(): void {
        this.showMore = !this.showMore;
    }

    public showMoreInfoStrategy(): void {
        this.showMoreStrategy = !this.showMoreStrategy;
    }
    public reset(): void {
        this.ifExpRun = !this.ifExpRun;
        this._store.dispatch(new ResetStore());
    }
}
