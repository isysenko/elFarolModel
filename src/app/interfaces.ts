export interface IExperiment {
    _id: number;
    barCapacity: number;
    customers?: number[];
    applicantsNumber: number;
    strategies?: IStrategy[];
}

export interface IParamsExperiments {
    nmbrExperiments: number;
    barCapacity: number;
}

export interface IPerson {
    _id: number;
    friendsIds: number[];
    lastDecisions: boolean[];
    lastResults: boolean[];
    coefficient: number;
    strategy: number;
    badStrategies: number[];
}

export interface IParamsPeople {
    nmbrPeople: number;
    strategies: IStrategy[];
}
export interface IStrategy {
    index: number;
    name: string;
    count: number;
    checked: boolean;
}