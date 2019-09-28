import { IExperiment, IParamsExperiments } from 'app/interfaces';


export enum ExperimentsActions {
    INIT_EXPERIMENT_PENDING = 'INIT_EXPERIMENT_PENDING',
    INIT_EXPERIMENT_SUCCESS = 'INIT_EXPERIMENT_SUCCESS',
    INIT_EXPERIMENT_ERROR = 'INIT_EXPERIMENT_ERROR',
    START_QUIZ_SUCCESS = 'START_QUIZ_SUCCESS'

}

export class InitExperimentsPending {
    public readonly type: string = ExperimentsActions.INIT_EXPERIMENT_PENDING;
    public constructor(public payload: IParamsExperiments) {}
}

// tslint:disable-next-line: max-classes-per-file
export class InitExperimentsSuccess {
    public readonly type: string = ExperimentsActions.INIT_EXPERIMENT_SUCCESS;
    public constructor(public payload: IExperiment[]) { }
}

// tslint:disable-next-line: max-classes-per-file
export class InitExperimentsError {
    public readonly type: string = ExperimentsActions.INIT_EXPERIMENT_ERROR;
    public constructor(public payload: IExperiment[]) { }
}
// tslint:disable-next-line: max-classes-per-file
export class StartQuizSuccess {
    public readonly type: string = ExperimentsActions.START_QUIZ_SUCCESS;
    public constructor(public payload: number[]) {}
}


export type ExperimentsActionsTypes = InitExperimentsPending | InitExperimentsSuccess | InitExperimentsError;