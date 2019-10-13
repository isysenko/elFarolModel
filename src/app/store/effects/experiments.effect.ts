import { Injectable } from '@angular/core';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    AddExperimentToList,
    ExperimentsActions,
    InitExperimentPending,
    InitExperimentSuccess,
} from '../actions/experiment.actions';
import { ExperimentsService } from 'app/experiments/experiments.servise';
import { IExperiment, IParamsExperiments } from 'app/interfaces';
import { IStore } from '..';
import { Store } from '@ngrx/store';
import { PeopleActions, StartQuizPending } from '../actions/people.actions';
import { of } from 'rxjs';

@Injectable()
export class ExperimentEffects {
    @Effect()
    // tslint:disable-next-line: no-any
    public initExperiment$: any = this.actions$.pipe(
        ofType(ExperimentsActions.INIT_EXPERIMENT_PENDING),
        map((action: InitExperimentPending) => action.payload),
        switchMap((params: IParamsExperiments) =>
            this.experimentService
                .generateExperiment(params)
                .pipe(switchMap((experiments: IExperiment) => of(new InitExperimentSuccess(experiments))))
        )
    );
    @Effect()
    // tslint:disable-next-line: no-any
    public a$: any = this.actions$.pipe(
        ofType(ExperimentsActions.INIT_EXPERIMENT_SUCCESS),
        withLatestFrom(this.store$.select((state: IStore) => state.people)),
        withLatestFrom(this.store$.select((state: IStore) => state.strategies)),
        // tslint:disable-next-line: typedef
        switchMap(([[_count, people], strategies]) => of(new StartQuizPending(people, strategies)))
    );
    @Effect()
    // tslint:disable-next-line: no-any
    public addExperiment$: any = this.actions$.pipe(
        ofType(PeopleActions.ASSIGNMENT),
        withLatestFrom(this.store$.select((state: IStore) => state.currentExperiment)),
        // tslint:disable-next-line: typedef
        map(([_count, experiment]) => experiment),
        switchMap((experiment: IExperiment) => of(new AddExperimentToList(experiment)))
    );
    public constructor(
        private actions$: Actions,
        private experimentService: ExperimentsService,
        private store$: Store<IStore>
    ) {}
}
