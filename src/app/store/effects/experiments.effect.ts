import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ExperimentsActions, InitExperimentPending, InitExperimentSuccess } from '../actions/experiment.actions';
import { ExperimentsService } from 'app/experiments/experiments.servise';
import { IExperiment, IParamsExperiments } from 'app/interfaces';

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
                .pipe(map((experiments: IExperiment) => new InitExperimentSuccess(experiments)))
        )
    );

    public constructor(private actions$: Actions, private experimentService: ExperimentsService) {}
}
