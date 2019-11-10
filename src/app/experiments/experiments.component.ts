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
        { name: 'Random (0)', value: true },
        { name: 'Если все друзья идут (1)', value: true },
        { name: 'Если хоть кто-то из друзей идет (2)', value: true },
        { name: 'Если в прошлый раз он не пошел или пошел и бар не был переполнен (3)', value: true },
        { name: 'Через раз (4)', value: true },
        { name: 'Всегда да (5)', value: true },
        { name: 'Если бар дорогой (6)', value: true },
        { name: 'Если бар дешевый (7)', value: true },
        { name: 'Если бар не дорогой (8)', value: true },
        { name: 'str9', value: true },
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
                strategy.push({ name: this.strategies[i].name, index: i, count: 0, checked: true });
            } else {
                strategy.push({ name: this.strategies[i].name, index: i, count: 0, checked: false });
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
