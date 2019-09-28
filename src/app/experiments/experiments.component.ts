import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IStore } from 'app/store';
import { InitExperimentPending } from 'app/store/actions/experiment.actions';
import { Observable } from 'rxjs';
import { IExperiment, IPerson } from 'app/interfaces';
import { InitPeoplePending } from 'app/store/actions/people.actions';
// import { PeopleService } from './people.servise';
// import { tap, map, takeLast, take, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-experiments',
    templateUrl: './experiments.component.html',
    styleUrls: ['./experiments.component.css'],
})
export class ExperimentsComponent implements OnInit {
    public strategies: boolean[] = [true, true, true, true, true, true, true, true, true, true];
    public barCapacity: string = '100';
    public experimentsNumber: string = '100';
    public peopleNumber: string = '100';
    public experiments$?: Observable<IExperiment[]>;
    public people$?: Observable<IPerson[]>;
    public a$?: Observable<any>;

    public constructor(private _store: Store<IStore>) {}

    public ngOnInit(): void {
        this.experiments$ = this._store.pipe(select('experiments'));
        this.people$ = this._store.pipe(select('people'));
        this.a$ = this._store.pipe(
            select('experiments'),
            map(data => data[data.length - 1] && !!data[data.length - 1].customers)
            // map(a => {
            //   if(a) {
            //     this._store.dispatch()
            //   }
            // })
        );
    }

    public runExperiments(): void {
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
}
