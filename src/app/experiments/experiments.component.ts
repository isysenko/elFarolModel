import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IStore } from 'app/store';
import { InitExperimentPending, resetStore } from 'app/store/actions/experiment.actions';
import { Observable } from 'rxjs';
import { IExperiment, IPerson } from 'app/interfaces';
import { InitPeoplePending } from 'app/store/actions/people.actions';

@Component({
    selector: 'app-experiments',
    templateUrl: './experiments.component.html',
    styleUrls: ['./experiments.component.css'],
})
export class ExperimentsComponent {
    public strategies: boolean[] = [true, true, true, true, true, true, true, true, true, true];
    public barCapacity: string = '30';
    public experimentsNumber: string = '50';
    public peopleNumber: string = '50';
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
        this._store.dispatch(
            new InitPeoplePending({
                nmbrPeople: Number(this.peopleNumber),
            })
        );
        for (let i: number = 0; i < Number(this.experimentsNumber); i++) {
            this._store.dispatch(
                new InitExperimentPending({
                    nmbrExperiments: Number(this.experimentsNumber),
                    barCapacity: Number(this.barCapacity),
                })
            );
        }
    }
    public showMoreInfo(): void  {
        this.showMore = !this.showMore;
    }
    public reset(): void  {
        this._store.dispatch(
            new resetStore()
        );
    }
}
