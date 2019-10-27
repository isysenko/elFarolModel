import { IStrategy } from 'app/interfaces';

// tslint:disable: max-classes-per-file

export enum StrategiesActions {
    INIT_STRATEGIES = 'INIT_STRATEGIES',
}

export class InitStrategies {
    public readonly type: string = StrategiesActions.INIT_STRATEGIES;
    public constructor(public payload: IStrategy[]) {}
}

export type StrategiesActionsTypes = InitStrategies;
