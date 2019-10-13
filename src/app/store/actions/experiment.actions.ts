import { IStrategy } from './../../interfaces';
import { IExperiment, IParamsExperiments } from 'app/interfaces';

export enum ExperimentsActions {
    INIT_EXPERIMENT_PENDING = 'INIT_EXPERIMENT_PENDING',
    INIT_EXPERIMENT_SUCCESS = 'INIT_EXPERIMENT_SUCCESS',
    INIT_EXPERIMENT_ERROR = 'INIT_EXPERIMENT_ERROR',
    START_QUIZ_SUCCESS = 'START_QUIZ_SUCCESS',
    ADD_EXPERIMENT = 'ADD_EXPERIMENT',
    RESET = 'RESET',
    ADD_STRATEGIES_TO_EXPERIMENT = 'ADD_STRATEGIES_TO_EXPERIMENT',
}
// tslint:disable: max-classes-per-file

export class InitExperimentPending {
    public readonly type: string = ExperimentsActions.INIT_EXPERIMENT_PENDING;
    public constructor(public payload: IParamsExperiments) {}
}

export class InitExperimentSuccess {
    public readonly type: string = ExperimentsActions.INIT_EXPERIMENT_SUCCESS;
    public constructor(public payload: IExperiment) {}
}

export class InitExperimentError {
    public readonly type: string = ExperimentsActions.INIT_EXPERIMENT_ERROR;
    public constructor(public payload: IExperiment) {}
}
export class StartQuizSuccess {
    public readonly type: string = ExperimentsActions.START_QUIZ_SUCCESS;
    public constructor(public payload: number[]) {}
}
export class AddExperimentToList {
    public readonly type: string = ExperimentsActions.ADD_EXPERIMENT;
    public constructor(public payload: IExperiment) {}
}
export class AddStrategiesToExperiment {
    public readonly type: string = ExperimentsActions.ADD_STRATEGIES_TO_EXPERIMENT;
    public constructor(public payload: IStrategy[]) {}
}
export class ResetStore {
    public readonly type: string = ExperimentsActions.RESET;
}

export type ExperimentsActionsTypes =
    | InitExperimentPending
    | InitExperimentSuccess
    | InitExperimentError
    | AddExperimentToList
    | ResetStore
    | AddStrategiesToExperiment;
