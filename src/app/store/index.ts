import { ActionReducerMap} from '@ngrx/store';
import { experimentsReducer } from './reducers/expirement.reducer';
import { IExperiment, IPerson } from 'app/interfaces';
import { peopleReducer } from './reducers/people.reducer';
import { currentExperimentReducer } from './reducers/current.experiment.reducer';
// import { ExperimentsActions, ExperimentsActionsTypes } from './actions/experiment.actions';

export interface IStore {
    experiments: IExperiment[];
    currentExperiment: IExperiment;
    people: IPerson[];
}

// tslint:disable-next-line: no-any
export const reducers: ActionReducerMap<IStore, any> = {
    currentExperiment: currentExperimentReducer,
    experiments: experimentsReducer,
    people: peopleReducer,
};