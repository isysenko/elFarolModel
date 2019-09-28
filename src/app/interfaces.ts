export interface IExperiment {
    _id: number;
    barCapacity: number;
    customers?: number[];
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
}

export interface IParamsPeople {
    nmbrPeople: number;
}