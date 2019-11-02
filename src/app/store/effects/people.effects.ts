// import {
//     InitPeopleError,
//     InitPeoplePending,
//     InitPeopleSuccess,
//     PeopleActions,
//     StartQuizError,
//     StartQuizPending,
//     AssignmentAction,
// } from '../actions/people.actions';
// import { catchError, map, mergeMap, switchMap, withLatestFrom, tap } from 'rxjs/operators';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { IParamsPeople, IPerson, IStrategy } from 'app/interfaces';
// import { Injectable } from '@angular/core';
// import { PeopleService } from 'app/experiments/people.servise';
// import { AddStrategiesToExperiment, StartQuizSuccess } from '../actions/experiment.actions';
// import { Store } from '@ngrx/store';
// import { IStore } from '..';

// @Injectable()
// export class PeopleEffects {
//     @Effect()
//     // tslint:disable-next-line: no-any
//     public loadMovies$: any = this.actions$.pipe(
//         ofType(PeopleActions.INIT_PEOPLE_PENDING),
//         map((action: InitPeoplePending) => action.payload),
//         switchMap((params: IParamsPeople) =>
//             this.peopleService.generatePeoples(params).pipe(
//                 switchMap((people: IPerson[]) => of(new InitPeopleSuccess(people))),
//                 // tslint:disable-next-line: no-any
//                 catchError((err: any) => {
//                     console.error(err);
//                     return of(new InitPeopleError([]));
//                 })
//             )
//         )
//     );

//     @Effect()
//     // tslint:disable-next-line: no-any
//     public startExperiment$: any = this.actions$.pipe(
//         ofType(PeopleActions.START_QUIZ_PENDING),
//         map((action: StartQuizPending) => action.payload),
//         switchMap((people: IPerson[]) =>
//             this.peopleService.startQuiz(people).pipe(
//                 mergeMap((listPeople: number[]) => [new StartQuizSuccess(listPeople)]),
//                 // tslint:disable-next-line: no-any
//                 catchError((err: any) => {
//                     console.error(err);
//                     return of(new StartQuizError([]));
//                 })
//             )
//         )
//     );
//     @Effect()
//     // tslint:disable-next-line: no-any
//     public countStrategies$: any = this.actions$.pipe(
//         ofType(PeopleActions.START_QUIZ_SUCCESS),
//         withLatestFrom(this.store$.select((state: IStore) => state.strategies)),
//         withLatestFrom(this.store$.select((state: IStore) => state.people)),
//         // tslint:disable-next-line: typedef
//         switchMap(([[_action, strategies], people]) =>
//             this.peopleService.increaseStrategiesCounters(people, strategies).pipe(
//                 tap(array => [console.log(array), console.table(array)]),
//                 mergeMap((array: IStrategy[]) => [new AddStrategiesToExperiment(array), new AssignmentAction()])
//             )
//         )
//     );

//     public constructor(
//         private actions$: Actions,
//         private peopleService: PeopleService,
//         private store$: Store<IStore>
//     ) {}
// }
