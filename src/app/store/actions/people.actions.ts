import { IParamsPeople, IPerson } from 'app/interfaces';


export enum PeopleActions {
    INIT_PEOPLE_PENDING = 'INIT_PEOPLE_PENDING',
    INIT_PEOPLE_SUCCESS = 'INIT_PEOPLE_SUCCESS',
    INIT_PEOPLE_ERROR = 'INIT_PEOPLE_ERROR',
    START_QUIZ_PENDING = 'STASTART_QUIZ_PENDINGRT_QUIZ',
    START_QUIZ_SUCCESS = 'START_QUIZ_SUCCESS',
    START_QUIZ_ERROR = 'START_QUIZ_ERROR'
}

export class InitPeoplePending {
    public readonly type: string = PeopleActions.INIT_PEOPLE_PENDING;
    public constructor(public payload: IParamsPeople) {}
}

// tslint:disable-next-line: max-classes-per-file
export class InitPeopleSuccess {
    public readonly type: string = PeopleActions.INIT_PEOPLE_SUCCESS;
    public constructor(public payload: IPerson[]) { }
}

// tslint:disable-next-line: max-classes-per-file
export class InitPeopleError {
    public readonly type: string = PeopleActions.INIT_PEOPLE_ERROR;
    public constructor(public payload: IPerson[]) { }
}

// tslint:disable-next-line: max-classes-per-file
export class StartQuizPending {
    public readonly type: string = PeopleActions.START_QUIZ_PENDING;
    public constructor(public payload: IPerson[]) {}
}

// tslint:disable-next-line: max-classes-per-file
export class StartQuizError {
    public readonly type: string = PeopleActions.START_QUIZ_ERROR;
    public constructor(public payload: any) {}
}

export type PeopleActionsTypes = InitPeoplePending | InitPeopleSuccess | InitPeopleError;