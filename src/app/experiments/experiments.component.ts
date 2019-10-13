import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IStore } from 'app/store';
import { InitExperimentPending, resetStore } from 'app/store/actions/experiment.actions';
import { Observable } from 'rxjs';
import { IExperiment, IPerson, IStrategy } from 'app/interfaces';
import { InitPeoplePending } from 'app/store/actions/people.actions';
import { InitStrategies } from 'app/store/actions/strategies.actions';

@Component({
    selector: 'app-experiments',
    templateUrl: './experiments.component.html',
    styleUrls: ['./experiments.component.css'],
})
export class ExperimentsComponent {
    public strategies: any[] = [
        { name: 'Random', value: true },
        { name: 'str1', value: true },
        { name: 'str2', value: true },
        { name: 'str3', value: true },
        { name: 'str4', value: true },
        { name: 'str5', value: true },
        { name: 'str6', value: true },
        { name: 'str7', value: true },
        { name: 'str8', value: true },
        { name: 'str9', value: true },
    ];
    public barCapacity: string = '60';
    public experimentsNumber: string = '100';
    public peopleNumber: string = '100';
    public people$?: Observable<IPerson[]>;
    public experiments$?: Observable<IExperiment[]>;
    public ifExpRun: boolean = false;
    public showMore: boolean = false;

    public constructor(private _store: Store<IStore>) {}
    public ngOnInit(): void {
        this.experiments$ = this._store.pipe(select('experiments'));
        this.people$ = this._store.pipe(select('people'));
        // this.a$ = this._store.pipe(
        //     select('experiments'),
        //     map(data => data[data.length - 1] && !!data[data.length - 1].customers)
        //     // map(a => {
        //     //   if(a) {
        //     //     this._store.dispatch()
        //     //   }
        //     // })
        // );
    }
    public runExperiments(): void {
        this.ifExpRun = true;
        const str: IStrategy[] = [];
        for (let i: number = 0; i < this.strategies.length; i++) {
            if (this.strategies[i].value === true) {
                str.push({ name: this.strategies[i].name, index: i, count: 0});
            }
        }
        this._store.dispatch(new InitStrategies(str));
        this._store.dispatch(
            new InitPeoplePending({
                nmbrPeople: Number(this.peopleNumber),
                strategies: str,
            })
        );
        for (let i: number = 0; i < Number(this.experimentsNumber); i++) {
            this._store.dispatch(
                new InitExperimentPending({
                    nmbrExperiments: Number(this.experimentsNumber),
                    barCapacity: Number(this.barCapacity),
                    strategies: str,
                })
            );
        }
    }
    public showMoreInfo(): void {
        this.showMore = !this.showMore;
    }
    public reset(): void {
        this._store.dispatch(new resetStore());
    }
}
