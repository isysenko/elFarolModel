import { ActionReducerMap } from '@ngrx/store';
import { experimnetsReducer } from './reducers/expirement.reducer';
import { IExperiment, IPerson } from 'app/interfaces';
import { peopleReducer } from './reducers/people.reducer';

export interface IStore {
    experiments: IExperiment[];
    people: IPerson[];
}

// tslint:disable-next-line: no-any
export const reducers: ActionReducerMap<IStore, any> = {
    experiments: experimnetsReducer,
    people: peopleReducer
};