// import { ActionReducerMap } from '@ngrx/store';
// import { experimentsReducer } from './reducers/expirement.reducer';
// import { IExperiment, IPerson, IStrategy } from 'app/interfaces';
// import { peopleReducer } from './reducers/people.reducer';
// import { currentExperimentReducer } from './reducers/current.experiment.reducer';
// import { strategiesReducer } from './reducers/strategies.reducer';

// export interface IStore {
//     experiments: IExperiment[];
//     currentExperiment: IExperiment;
//     people: IPerson[];
//     strategies: IStrategy[];
// }

// // tslint:disable-next-line: no-any
// export const reducers: ActionReducerMap<IStore, any> = {
//     currentExperiment: currentExperimentReducer,
//     experiments: experimentsReducer,
//     people: peopleReducer,
//     strategies: strategiesReducer
// };

import { ActionReducerMap } from '@ngrx/store';
import { experimentsReducer } from './reducers/expirement.reducer';
import { IExperiment } from '../interfaces';

export interface IStore {
    experiments: IExperiment[];
    strategySuccess: number[][];
}

// tslint:disable-next-line: no-any
export const reducers: ActionReducerMap<IStore, any> = {
    experiments: experimentsReducer,
    strategySuccess : strategySuccessReducer
};