import { AssignmentAction } from './../actions/people.actions';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { IParamsPeople, IPerson, IStrategy } from 'app/interfaces';
import {
    InitPeopleError,
    InitPeoplePending,
    InitPeopleSuccess,
    PeopleActions,
    StartQuizError,
    StartQuizPending,
} from '../actions/people.actions';
import { PeopleService } from 'app/experiments/people.servise';
import { StartQuizSuccess, AddStrategiesToExperiment } from '../actions/experiment.actions';
import { Store } from '@ngrx/store';
import { IStore } from '..';
import { UpdateStrategies } from '../actions/strategies.actions';

@Injectable()
export class PeopleEffects {
    @Effect()
    // tslint:disable-next-line: no-any
    public loadMovies$: any = this.actions$.pipe(
        ofType(PeopleActions.INIT_PEOPLE_PENDING),
        map((action: InitPeoplePending) => action.payload),
        switchMap((params: IParamsPeople) =>
            this.peopleService.generatePeoples(params).pipe(
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
    public startExperiment$: any = this.actions$.pipe(
        ofType(PeopleActions.START_QUIZ_PENDING),
        map((action: StartQuizPending) => action.payload),
        switchMap((people: IPerson[]) =>
            this.peopleService.startQuiz(people).pipe(
                mergeMap((listPeople: number[]) => [
                    new StartQuizSuccess(listPeople),
                    new AssignmentAction(listPeople),
                ]),
                // tslint:disable-next-line: no-any
                catchError((err: any) => {
                    console.error(err);
                    return of(new StartQuizError([]));
                })
            )
        )
    );
    @Effect()
    // tslint:disable-next-line: no-any
    public countStrategies$: any = this.actions$.pipe(
        ofType(PeopleActions.START_QUIZ_SUCCESS),
        withLatestFrom(this.store$.select((state: IStore) => state.strategies)),
        withLatestFrom(this.store$.select((state: IStore) => state.people)),
        switchMap(([[_action, strategies], people]) =>
            this.peopleService.increaseStrategiesCounters(people, strategies).pipe(
                mergeMap((array: IStrategy[]) => [
                    new UpdateStrategies(array),
                    new AddStrategiesToExperiment(array)
                ])
            )
        )
    );

    public constructor(
        private actions$: Actions,
        private peopleService: PeopleService,
        private store$: Store<IStore>
    ) {}
}
