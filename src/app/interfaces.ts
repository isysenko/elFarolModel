export interface IExperiment {
    _id: number;
    barCapacity: number;
    customers?: number[];
    applicantsNumber: number;
    strategies?: IStrategy[];
    barPrice: string;
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
    startCoeficient: number;
    strategy: number;
    badStrategies: number[];
    strategyChange: StratCountPerson[]; 
}
export interface StratCountPerson{
    id: number;
    count: number[];
}
export interface ResultType{
    experiments: IExperiment[];
    people: IPerson[];
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
    success: number;
    failed: number;
    neytral: number;
    percentToGo: number;
}