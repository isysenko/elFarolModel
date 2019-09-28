import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom, filter, take, takeLast } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, range } from 'rxjs';
import { IParamsPeople, IPerson } from 'app/interfaces';
import {
    InitPeopleError,
    InitPeoplePending,
    InitPeopleSuccess,
    PeopleActions,
    StartQuizError,
    StartQuizPending
} from '../actions/people.actions';
import { PeopleService } from 'app/experiments/people.servise';
import { StartQuizSuccess } from '../actions/experiment.actions';
import { IStore } from '..';
import { Store, select } from '@ngrx/store';

@Injectable()
export class PeopleEffects {
    @Effect()
    // tslint:disable-next-line: no-any
    public loadMovies$: any = this.actions$.pipe(
        ofType(PeopleActions.INIT_PEOPLE_PENDING),
        map((action: InitPeoplePending) => action.payload),
        switchMap((params: IParamsPeople) =>
            this.peopleService.generateExperiments(params).pipe(
                map((people: IPerson[]) => new InitPeopleSuccess(people)),
                // tslint:disable-next-line: no-any
                catchError((err: any) => {
                    console.error(err);
                    return of(new InitPeopleError([]));
                })
            )
        )
    );

    @Effect()
    // tslint:disable-next-line: no-any
    public a$: any = this.actions$.pipe(
        ofType(PeopleActions.INIT_PEOPLE_SUCCESS),
        withLatestFrom(this.store$.select(state => state.experiments.length)),
        map(([count, k]) => k),
        switchMap((maxCount: number) => range(1, maxCount - 1).pipe(
            withLatestFrom(this.store$.select(state => state.people)),
            map(([count, people]) => people),
            map((people) => new StartQuizPending(people))
        )),
    );

    @Effect()
    // tslint:disable-next-line: no-any
    public startExperinent$: any = this.actions$.pipe(
        ofType(PeopleActions.START_QUIZ_PENDING),
        map((action: StartQuizPending) => action.payload),
        switchMap((people: IPerson[]) =>
            this.peopleService.startQuiz(people).pipe(
                map((listPeople: number[]) => new StartQuizSuccess(listPeople)),
                //достать последний экшн в пустым списком посетителей обрезать и записать, потом записать людят ктьо попал а кто нет
                // tslint:disable-next-line: no-any
                catchError((err: any) => {
                    console.error(err);
                    return of(new StartQuizError([]));
                })
            ),
        ),
  
    );

    public constructor(
        private actions$: Actions, 
        private peopleService: PeopleService,
        private store$: Store<IStore>
    ) { }
}