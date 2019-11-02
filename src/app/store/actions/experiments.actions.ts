import { IExperiment } from '../../interfaces';

export enum ExperimentsActions {
    ADD_EXPERIMENT = 'ADD_EXPERIMENT',
    RESET = 'RESET',
}
// tslint:disable: max-classes-per-file

export class AddExperimentToList {
    public readonly type: string = ExperimentsActions.ADD_EXPERIMENT;
    public constructor(public payload: IExperiment) {}
}
export class ResetStore {
    public readonly type: string = ExperimentsActions.RESET;
}

export type ExperimentsActionsTypes =
    | AddExperimentToList
    | ResetStore;