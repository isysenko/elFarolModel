import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IStore } from 'app/store';
import { InitExperimentsPending } from 'app/store/actions/experiment.actions';
import { Observable } from 'rxjs';
import { IExperiment, IPerson } from 'app/interfaces';
import { InitPeoplePending, StartQuizPending } from 'app/store/actions/people.actions';
import { PeopleService } from './people.servise';
import { tap, map, takeLast, take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent implements OnInit {
  public strategy1: boolean = true;
  public strategy2: boolean = true;
  public strategy3: boolean = true;
  public strategy4: boolean = true;
  public strategy5: boolean = true;
  public strategy6: boolean = true;
  public strategy7: boolean = true;
  public strategy8: boolean = true;
  public strategy9: boolean = true;
  public strategy10: boolean = true;
  public barCapacity: string = '100';
  public experimentsNumber: string = '100';
  public peopleNumber: string = '100';
  public experiments$?: Observable<IExperiment[]>;
  public people$?: Observable<IPerson[]>;
  public a$?: Observable<any>;

  public constructor(private _store: Store<IStore>) {
  }

  public ngOnInit(): void {
    this.experiments$ = this._store.pipe(select('experiments'));
    this.people$ = this._store.pipe(select('people'));
    this.a$ = this._store.pipe(
      select('experiments'),
      map(data => data[data.length - 1] && !!data[data.length - 1].customers),
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
        nmbrPeople: Number(this.peopleNumber)
      })
    );
    this._store.dispatch(
      new InitExperimentsPending({
        nmbrExperiments: Number(this.experimentsNumber),
        barCapacity: Number(this.barCapacity)
      })
    );
  }

}
