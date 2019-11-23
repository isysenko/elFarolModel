import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IStore } from '../store';
import { Observable } from 'rxjs';
import { IExperiment, IPerson, IStrategy } from '../interfaces';
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
        const experimentsToList: IExperiment[] = exp.startExperiments(
            strategy,
            Number(this.barCapacity),
            Number(this.experimentsNumber),
            Number(this.peopleNumber)
        );
        this._store.dispatch(new AddExperimentToList(experimentsToList));
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
