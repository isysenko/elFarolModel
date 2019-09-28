import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
    ExperimentsActions,
    InitExperimentsError,
    InitExperimentsPending,
    InitExperimentsSuccess
} from '../actions/experiment.actions';
import { ExperimentsService} from 'app/experiments/experiments.servise';
import { IExperiment, IParamsExperiments } from 'app/interfaces';

@Injectable()
export class ExperimentEffects {
    @Effect()
    // tslint:disable-next-line: no-any
    public initExperiments$: any = this.actions$.pipe(
        ofType(ExperimentsActions.INIT_EXPERIMENT_PENDING),
        map((action: InitExperimentsPending) => action.payload),
        switchMap((params: IParamsExperiments) =>
            this.experimentService.generateExperiments(params).pipe(
                map((experiments: IExperiment[]) => new InitExperimentsSuccess(experiments)),
                // tslint:disable-next-line: no-any
                catchError((err: any) => {
                    console.error(err);
                    return of(new InitExperimentsError([]));
                })
            )
        )
    );

    public constructor(private actions$: Actions, private experimentService: ExperimentsService) { }
}